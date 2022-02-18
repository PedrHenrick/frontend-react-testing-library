import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from '../App';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  test('Teste se a página contém um heading `h2` com o texto `About Pokédex`', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/about');

    const notFoundEl = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(notFoundEl).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/about');

    const paragraphEl1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraphEl2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphEl1 && paragraphEl2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/about');

    const imgEl = screen.getByAltText(/pokédex/i);

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imgEl.src).toContain(url);

    // Para fazer essa questão, fiz um code review do Mário Júnior: https://github.com/tryber/sd-018-b-project-react-testing-library/pull/47/
    // https://jestjs.io/pt-BR/docs/expect#tocontainitem
  });
});
