# Atlas bíblico digital

**Navegação** · [Como executar](#como-executar) · [Exemplo de uso](#exemplo-de-uso) · [Limitações](#limitações) · [Código e estudo](docs/ENGENHARIA_REVERSA.md)

Mapa navegável, lugares, filtros por período e personagem, eventos e três itinerários aproximados.

## Como executar

Requisitos: Node.js 24 e npm. Para a concordância, Python 3.12 também é necessário.

```bash
npm ci
npm run dev
```

Abra o endereço local informado pelo Vite. Para conferir o projeto:

```bash
npm test
npm run build
```

## Exemplo de uso

Pesquise Jerusalém ou selecione a rota Cesareia a Roma e explore as paradas.

## Limitações

As linhas ligam paradas citadas no texto e não reconstituem caminhos exatos. Algumas identificações são incertas ou tradicionais.

## Arquitetura e fontes

A interface usa React e TypeScript, com Vite para desenvolvimento e build. A lógica do domínio fica em módulos de `src/`, separados da interface, e os testes em `tests/`. Os dados pessoais dos recursos que exigem persistência usam armazenamento local do navegador. A concordância possui API FastAPI e índice local em `backend/`.

As fontes e licenças estão em [docs/FONTES.md](docs/FONTES.md). A licença do código está em [LICENSE](LICENSE). O fluxo em `.github/workflows/ci.yml` executa testes e build em pushes e pull requests.

## Código e roteiro de estudo

Como testar a projeção usando pontos de referência conhecidos e separar precisão cartográfica de visualização didática? O [guia de engenharia reversa](docs/ENGENHARIA_REVERSA.md) reúne o mapa dos módulos e uma pergunta técnica baseada no projeto.

Mantido por [João Junior](https://github.com/juniordev830).
