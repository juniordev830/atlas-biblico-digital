import { useMemo, useState } from 'react';
import Map from './Map.tsx';
import { filterPlaces, initialView, people, periods, places, routes, sources } from './places.ts';

export default function App() {
  const [text, setText] = useState('');
  const [period, setPeriod] = useState('');
  const [person, setPerson] = useState('');
  const [route, setRoute] = useState('');
  const [selected, setSelected] = useState('jerusalem');
  const [view, setView] = useState(initialView);
  const found = useMemo(() => filterPlaces(text, period, person), [text, period, person]);
  const activeRoute = routes.find(item => item.id === route);
  const routePlaces = useMemo(() => activeRoute?.stops.map(id => places.find(place => place.id === id)!) ?? [], [activeRoute]);
  const visible = activeRoute ? found.filter(place => routePlaces.some(stop => stop.id === place.id)) : found;
  const current = visible.find(place => place.id === selected) ?? visible[0];
  function focus(id: string) {
    const place = places.find(place => place.id === id)!;
    setSelected(id);
    setView({ lon: place.at[0], lat: place.at[1], zoom: Math.max(2.5, view.zoom) });
  }

  return <div className="stack">
    <section className="panel form">
      <div className="two collapse">
        <label>Buscar cidade ou região<input type="search" value={text} onChange={event => setText(event.target.value)} placeholder="Ex.: Galileia" /></label>
        <label>Período<select value={period} onChange={event => setPeriod(event.target.value)}><option value="">Todos os períodos</option>
          {periods.map(item => <option key={item}>{item}</option>)}</select></label>
        <label>Personagem<select value={person} onChange={event => setPerson(event.target.value)}><option value="">Todos os personagens</option>
          {people.map(item => <option key={item}>{item}</option>)}</select></label>
        <label>Rota histórica<select value={route} onChange={event => { setRoute(event.target.value); setView(initialView); }}><option value="">Sem itinerário</option>
          {routes.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
      </div>
    </section>
    <div className="split">
      <section className="panel stack" id="mapa" tabIndex={-1}>
        <div className="row between"><h2>Mapa de lugares bíblicos</h2><small role="status">{visible.length} de {places.length} lugares</small></div>
        <Map visible={visible} route={routePlaces} selected={current?.id ?? ''} choose={setSelected} view={view} setView={setView} />
        {activeRoute && <div className="subtle"><strong>{activeRoute.title} · {activeRoute.reference}</strong>
          <p>{routePlaces.map(place => place.name).join(' → ')}</p></div>}
        <div className="row">
          <small>Cartografia <a href="https://www.naturalearthdata.com/about/terms-of-use/">Natural Earth</a> · Pontos <a href="https://openbible.info/geo/">OpenBible.info</a></small>
        </div>
      </section>
      <aside className="stack">
        <section className="panel stack" id="locais" tabIndex={-1}>
          <h2>Locais encontrados</h2>
          {!visible.length && <p className="muted">Nenhum local corresponde a esses filtros.</p>}
          <ul className="list atlas-locations">{visible.map(place => <li key={place.id}>
            <button className="selection" aria-pressed={current?.id === place.id} onClick={() => focus(place.id)}>{place.name} · {place.region}</button>
          </li>)}</ul>
        </section>
        {current && <section className="panel stack" aria-label="Ficha do local">
          <div><h2>{current.name}</h2><div className="tags"><span className="tag">{current.status}</span><span className="tag">{current.region}</span></div></div>
          <small>{current.at[1].toFixed(3)}° N · {current.at[0].toFixed(3)}° E</small>
          <ul className="list">{current.events.filter(item => (!period || item.period === period) && (!person || item.characters.includes(person))).map(item => <li className="subtle" key={item.reference}>
            <strong>{item.reference}</strong><p>{item.description}</p><small>{item.period} · {item.characters.join(', ')}</small>
          </li>)}</ul>
          <a href={current.source}>{current.source === sources.geocoding ? 'Consultar conjunto de coordenadas' : 'Consultar identificação geográfica'}</a>
        </section>}
      </aside>
    </div>
  </div>;
}
