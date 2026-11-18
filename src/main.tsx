import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <a className="skip" href="#conteudo">Ir para o conteúdo</a>
    <header className="masthead">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">◉</span>
        <span>Atlas bíblico</span>
      </div>
      <span className="collection">Coleção de estudo bíblico</span>
    </header>
    <main id="conteudo">
      <div className="intro">
        <h1>Atlas bíblico</h1>
        <nav className="atalhos" aria-label="Seções desta página">
          <a href="#mapa">Mapa</a>
          <a href="#locais">Locais encontrados</a>
        </nav>
      </div>
      <App />
    </main>
  </StrictMode>,
);
