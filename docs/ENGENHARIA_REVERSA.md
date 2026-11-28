# Engenharia reversa e estudo — Atlas bíblico digital

## Objetivo e fluxo

Mapa didático de lugares, personagens, períodos e itinerários. places.ts separa projeção, filtros e enquadramento. Map.tsx apresenta o mapa navegável e App.tsx controla o lugar selecionado.

**Tecnologias identificadas** · TypeScript, React, Vite, Node.js.

**Revisão de referência** · `e052d287ccdc`.

## Mapa do código

| Caminho | Papel de leitura | Símbolos selecionados |
| --- | --- | --- |
| [src/App.tsx](../src/App.tsx) | Implementação | `App`, `focus` |
| [src/Map.tsx](../src/Map.tsx) | Implementação | `Map`, `shift` |
| [src/main.tsx](../src/main.tsx) | Ponto de leitura para entrada ou composição | — |
| [src/places.ts](../src/places.ts) | Implementação | `event`, `filterPlaces`, `project`, `zoomTo`, `normalize` |
| [vite.config.ts](../vite.config.ts) | Implementação | — |
| [index.html](../index.html) | Marcação ou estilos da interface | — |
| [src/style.css](../src/style.css) | Marcação ou estilos da interface | — |

## Configuração e referências

Ambiente e dependências: [package.json](../package.json).

## Roteiro de estudo e desenvolvimento

1. Comece pelo fluxo descrito acima e localize seus pontos de entrada no mapa. Acompanhe uma entrada válida até a transformação ou a resposta.
2. Abra um teste relacionado ao fluxo e descreva qual regra ele protege. Compare o tratamento esperado para entradas válidas, inválidas e nos limites.
3. Ao adicionar uma regra, determine qual módulo controla o dado e cubra o caso nesse nível. Em seguida, confira o efeito no comando, na API ou na interface de entrada.

**Pergunta de entrevista**

Como testar a projeção usando pontos de referência conhecidos e separar precisão cartográfica de visualização didática?

## Testes versionados

Arquivos para começar a leitura dos cenários de teste: [tests/atlas.test.ts](../tests/atlas.test.ts).

Os comandos e versões de runtime usados no CI ficam em [.github/workflows/ci.yml](../.github/workflows/ci.yml).

[Voltar ao README](../README.md).
