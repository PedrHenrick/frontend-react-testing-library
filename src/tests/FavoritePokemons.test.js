import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('3. Teste o componente', () => {
  test('Teste se é exibido na tela a mensagem `No favorite pokemon found`', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/favorites');

    const favNullEl = screen.getByText('No favorite pokemon found');
    expect(favNullEl).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto `About`', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const pokemon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemon);

    const favCheckbox = screen.getByRole('checkbox');
    userEvent.click(favCheckbox);

    const favLinkEl = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favLinkEl);

    const pokemonFavEl = screen.getByText(/pikachu/i);
    expect(pokemonFavEl).toBeDefined();
  });
});
