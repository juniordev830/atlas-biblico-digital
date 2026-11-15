import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterPlaces, initialView, places, project, routes, zoomTo } from '../src/places.ts';

test('lugares têm coordenadas plausíveis para a região, eventos, referência e fonte', () => {
  assert.equal(new Set(places.map(place => place.id)).size, places.length);
  for (const place of places) {
    const [lon, lat] = place.at;
    assert.ok(lon > 10 && lon < 46 && lat > 27 && lat < 43);
    assert.ok(place.source.startsWith('https://'));
    assert.ok(place.events.length && place.events.every(item => item.reference));
  }
});
test('expõe graus de identificação e busca por cidade ou região sem acentos', () => {
  assert.equal(filterPlaces('emaus', '', '')[0].status, 'Incerta');
  assert.equal(filterPlaces('Sinai', '', '')[0].status, 'Tradicional');
  assert.ok(filterPlaces('galileia', '', '').some(item => item.name === 'Nazaré'));
});
test('período e personagem devem coincidir no mesmo evento', () => {
  assert.equal(filterPlaces('Jerusalém', 'Israel e Judá', 'Davi').length, 1);
  assert.equal(filterPlaces('Jerusalém', 'Primeiras comunidades', 'Davi').length, 0);
});
test('todas as rotas apontam para paradas válidas e têm uma referência', () => {
  const ids = new Set(places.map(place => place.id));
  for (const route of routes) assert.ok(route.stops.length >= 3 && route.stops.every(id => ids.has(id)) && route.reference);
});
test('projeção centraliza corretamente e zoom respeita limites', () => {
  assert.deepEqual(project([27.5, 35], initialView, 800, 400), [400, 200]);
  assert.ok(project([29, 36], initialView, 800, 400)[1] < 200);
  assert.equal(zoomTo(initialView, .1).zoom, 1);
  assert.equal(zoomTo(initialView, 99).zoom, 18);
});

test('busca referências nas passagens do mesmo evento filtrado', () => {
  assert.deepEqual(filterPlaces('atos 27:3', '', 'Paulo').map(item => item.name), ['Sidom']);
  assert.deepEqual(filterPlaces('atos 27:3', 'Israel e Judá', ''), []);
  assert.deepEqual(filterPlaces('atos 27:3', '', 'Davi'), []);
});
