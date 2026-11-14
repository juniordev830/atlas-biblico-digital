export const sources = {
  geocoding: 'https://openbible.info/geo/data/merged.txt',
  jerusalem: 'https://www.openbible.info/geo/ancient/a15257a/jerusalem',
  emmaus: 'https://www.openbible.info/geo/ancient/ae7274b',
  sinai: 'https://www.openbible.info/geo/ancient/abfba2a',
  malta: 'https://www.openbible.info/geo/ancient/a57835d/malta',
};
export const periods = ['Patriarcas e êxodo', 'Israel e Judá', 'Exílio e retorno', 'Ministério de Jesus', 'Primeiras comunidades'] as const;
type Period = typeof periods[number];
export type Point = [number, number];
export type Event = { period: Period; characters: string[]; reference: string; description: string };
export type Place = { id: string; name: string; region: string; at: Point; status: 'Confirmada' | 'Tradicional' | 'Incerta'; source: string; events: Event[] };
type Row = [string, string, string, number, number, Place['status'], keyof typeof sources, Event[]];
function event(period: number, characters: string[], reference: string, description: string): Event {
  return { period: periods[period], characters, reference, description };
}
const rows: Row[] = [
  ['siquem','Siquém','Canaã central',35.2818,32.2137,'Confirmada','geocoding',[
    event(0,['Abraão'],'Gênesis 12:6–7','A narrativa situa uma parada de Abrão perto do carvalho de Moré.'),
    event(1,['Josué'],'Josué 24:1–28','O relato reúne tribos para renovar compromissos em Siquém.'),
  ]],
  ['berseba','Berseba','Neguebe',34.8409,31.245,'Confirmada','geocoding',[event(0,['Abraão'],'Gênesis 21:22–34','O relato vincula Berseba a um acordo envolvendo um poço.')]],
  ['sinai','Monte Sinai','Península do Sinai',33.9733,28.5397,'Tradicional','sinai',[event(0,['Moisés'],'Êxodo 19:1–20','O relato situa a chegada ao monte e a preparação do povo para a aliança. O marcador identifica a localização tradicional de Jebel Musa.')]],
  ['jerico','Jericó','Vale do Jordão',35.4439,31.8706,'Confirmada','geocoding',[
    event(1,['Raabe','Josué'],'Josué 2:1–14','Raabe acolhe os enviados de Josué. Há diferentes questões arqueológicas sobre a ocupação e a cronologia.'),
    event(3,['Jesus','Zaqueu'],'Lucas 19:1–10','Lucas descreve o encontro de Jesus com Zaqueu em Jericó.'),
  ]],
  ['jerusalem','Jerusalém','Judá e Judeia',35.2349,31.7774,'Confirmada','jerusalem',[
    event(1,['Davi'],'2 Samuel 5:6–10','A narrativa descreve a conquista da fortaleza de Sião por Davi.'),
    event(2,['Neemias'],'Neemias 2:11–18','Neemias inspeciona os muros da cidade antes de convocar a reconstrução.'),
    event(3,['Jesus'],'Marcos 11:1–11','Jesus entra na cidade, que concentra a última parte da narrativa de Marcos.'),
    event(4,['Pedro'],'Atos 2:1–21','Atos situa em Jerusalém o relato do Pentecostes e o discurso de Pedro.'),
  ]],
  ['belem','Belém','Judá e Judeia',35.2103,31.7054,'Confirmada','geocoding',[
    event(1,['Rute','Noemi'],'Rute 1:19–22','Rute e Noemi chegam a Belém no início da colheita da cevada.'),
    event(3,['Jesus','Maria','José'],'Lucas 2:1–7','O evangelista situa em Belém o nascimento de Jesus.'),
  ]],
  ['samaria','Samaria','Reino do Norte',35.1979,32.2802,'Confirmada','geocoding',[event(1,['Onri'],'1 Reis 16:23–24','O relato atribui a Onri a aquisição da colina para construir a capital do reino do Norte.')]],
  ['babilonia','Babilônia','Mesopotâmia',44.4209,32.5365,'Confirmada','geocoding',[event(2,['Nabucodonosor'],'2 Reis 24:8–17','O rei babilônico deporta Joaquim e parte da população de Jerusalém.')]],
  ['nazare','Nazaré','Galileia',35.3015,32.7067,'Confirmada','geocoding',[event(3,['Jesus'],'Lucas 4:16–30','O relato de Lucas apresenta a leitura de Isaías por Jesus na sinagoga de Nazaré.')]],
  ['cafarnaum','Cafarnaum','Galileia',35.5752,32.8806,'Confirmada','geocoding',[event(3,['Jesus'],'Marcos 1:21–28','Marcos situa um episódio de ensino de Jesus na sinagoga da cidade.')]],
  ['betania','Betânia','Judeia',35.2621,31.7717,'Confirmada','geocoding',[event(3,['Jesus','Marta','Maria','Lázaro'],'João 11:1–18','João associa a aldeia próxima de Jerusalém à família de Lázaro.')]],
  ['emaus','Emaús','Judeia',34.9895,31.8395,'Incerta','emmaus',[event(3,['Jesus','Cleopas'],'Lucas 24:13–35','Lucas associa a aldeia à caminhada de dois discípulos. O ponto assinala a hipótese de Emaús Nicópolis entre várias propostas.')]],
  ['damasco','Damasco','Síria',36.3134,33.5193,'Confirmada','geocoding',[event(4,['Paulo','Ananias'],'Atos 9:1–19','A cidade é o destino de Saulo e o local do encontro com Ananias.')]],
  ['jope','Jope','Costa da Judeia',34.7504,32.0535,'Confirmada','geocoding',[event(4,['Pedro','Tabita'],'Atos 9:36–43','O relato situa em Jope o episódio de Tabita.')]],
  ['cesareia','Cesareia Marítima','Costa da Judeia',34.8922,32.4995,'Confirmada','geocoding',[
    event(4,['Pedro','Cornélio'],'Atos 10:1–33','Cornélio reside em Cesareia e recebe Pedro em sua casa.'),
    event(4,['Paulo'],'Atos 27:1–3','A viagem de Paulo sob custódia tem a primeira escala em Sidom.'),
  ]],
  ['antioquia','Antioquia da Síria','Síria romana',36.1624,36.2023,'Confirmada','geocoding',[event(4,['Paulo','Barnabé'],'Atos 13:1–3','A comunidade envia Barnabé e Saulo para a missão descrita em Atos 13–14.')]],
  ['seleucia','Selêucia','Síria romana',35.9268,36.111,'Confirmada','geocoding',[event(4,['Paulo','Barnabé'],'Atos 13:4','O grupo parte por mar de Selêucia em direção a Chipre.')]],
  ['salamina','Salamina','Chipre',33.9076,35.1772,'Confirmada','geocoding',[event(4,['Paulo','Barnabé'],'Atos 13:5','A narrativa registra anúncio nas sinagogas da cidade.')]],
  ['pafos','Pafos','Chipre',32.4002,34.7541,'Confirmada','geocoding',[event(4,['Paulo','Barnabé'],'Atos 13:6–12','O itinerário chega à outra extremidade da ilha. Atos relata o encontro com o procônsul.')]],
  ['perge','Perge','Panfília',30.9049,37.0052,'Confirmada','geocoding',[event(4,['Paulo','Barnabé','João Marcos'],'Atos 13:13','O grupo segue para Perge e João se separa da viagem.')]],
  ['filipos','Filipos','Macedônia',24.2862,41.012,'Confirmada','geocoding',[event(4,['Paulo','Lídia'],'Atos 16:11–15','A narrativa situa em Filipos o encontro de Paulo com Lídia.')]],
  ['tessalonica','Tessalônica','Macedônia',22.9321,40.6322,'Confirmada','geocoding',[event(4,['Paulo','Silas'],'Atos 17:1–9','Paulo argumenta na sinagoga, e Atos descreve controvérsia na cidade.')]],
  ['bereia','Bereia','Macedônia',22.2,40.5167,'Confirmada','geocoding',[event(4,['Paulo','Silas'],'Atos 17:10–12','Os ouvintes conferem nas Escrituras o anúncio recebido.')]],
  ['atenas','Atenas','Acaia',23.7333,37.9833,'Confirmada','geocoding',[event(4,['Paulo'],'Atos 17:15–34','O relato apresenta a fala de Paulo no Areópago.')]],
  ['corinto','Corinto','Acaia',22.8779,37.906,'Confirmada','geocoding',[event(4,['Paulo','Priscila','Áquila'],'Atos 18:1–11','Paulo encontra Priscila e Áquila e permanece na cidade por um período prolongado.')]],
  ['efeso','Éfeso','Ásia romana',27.3678,37.9533,'Confirmada','geocoding',[event(4,['Paulo'],'Atos 19:1–20','O relato apresenta um período de ensino e expansão da mensagem em Éfeso.')]],
  ['sidom','Sidom','Fenícia',35.3663,33.5632,'Confirmada','geocoding',[event(4,['Paulo'],'Atos 27:3','O navio faz escala em Sidom, onde Paulo recebe permissão para visitar conhecidos.')]],
  ['mira','Mira','Lícia',30.0115,36.2308,'Confirmada','geocoding',[event(4,['Paulo'],'Atos 27:5–6','A comitiva troca de embarcação na região de Mira.')]],
  ['bons-portos','Bons Portos','Creta',24.7311,34.9214,'Confirmada','geocoding',[event(4,['Paulo'],'Atos 27:7–12','O relato descreve uma discussão sobre a conveniência de continuar a viagem.')]],
  ['malta','Malta','Mediterrâneo central',14.5324,35.8528,'Confirmada','malta',[event(4,['Paulo'],'Atos 28:1–10','Depois do naufrágio o grupo chega à ilha. O marcador situa a ilha, sem indicar um ponto preciso do desembarque.')]],
  ['siracusa','Siracusa','Sicília',15.2948,37.0682,'Confirmada','geocoding',[event(4,['Paulo'],'Atos 28:12','A nova embarcação permanece três dias em Siracusa.')]],
  ['regio','Régio','Sul da Itália',15.6433,38.1116,'Confirmada','geocoding',[event(4,['Paulo'],'Atos 28:13','O itinerário registra uma parada antes da viagem a Putéoli.')]],
  ['puteoli','Putéoli','Campânia',14.2677,40.8356,'Confirmada','geocoding',[event(4,['Paulo'],'Atos 28:13–14','O texto registra a chegada a Putéoli antes de seguir para Roma.')]],
  ['roma','Roma','Itália romana',12.4833,41.9,'Confirmada','geocoding',[event(4,['Paulo'],'Atos 28:14–16','O relato acompanha a chegada de Paulo a Roma ainda sob custódia.')]],
];

export const places: Place[] = rows.map(([id, name, region, lon, lat, status, source, events]) =>
  ({ id, name, region, at: [lon, lat], status, source: sources[source], events }));
export const routes = [
  { id: 'paulo-chipre', title: 'Antioquia a Perge', reference: 'Atos 13:1–13',
    stops: ['antioquia', 'seleucia', 'salamina', 'pafos', 'perge'] },
  { id: 'paulo-macedonia', title: 'Filipos a Corinto', reference: 'Atos 16:11–18:1',
    stops: ['filipos', 'tessalonica', 'bereia', 'atenas', 'corinto'] },
  { id: 'paulo-roma', title: 'Cesareia a Roma', reference: 'Atos 27–28',
    stops: ['cesareia', 'sidom', 'mira', 'bons-portos', 'malta', 'siracusa', 'regio', 'puteoli', 'roma'] },
] as const;
export const people = [...new Set(places.flatMap(place => place.events.flatMap(item => item.characters)))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
const normalize = (text: string) => text.normalize('NFD').replace(/\p{M}+/gu, '').toLocaleLowerCase('pt-BR');

export function filterPlaces(text: string, period: string, person: string) {
  const query = normalize(text.trim());
  return places.filter(place => normalize(place.name + ' ' + place.region).includes(query) &&
    place.events.some(item => (!period || item.period === period) && (!person || item.characters.includes(person))));
}

export type View = { lon: number; lat: number; zoom: number };
export const initialView: View = { lon: 27.5, lat: 35, zoom: 1 };

export function project([lon, lat]: Point, view: View, width: number, height: number): Point {
  const scale = Math.min(width / 38, height / 21) * view.zoom;
  return [(lon - view.lon) * scale * .82 + width / 2, (view.lat - lat) * scale + height / 2];
}

export function zoomTo(view: View, change: number): View {
  return { ...view, zoom: Math.min(18, Math.max(1, view.zoom * change)) };
}
