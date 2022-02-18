import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
  test('O primeiro link deve possuir o texto `Home`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLinkEl = screen.getByRole('link', { name: /home/i });
    expect(homeLinkEl).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto `About`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLinkEl = screen.getByRole('link', { name: /about/i });
    expect(aboutLinkEl).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto `Favorite Pokémons`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favLinkEl = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favLinkEl).toBeInTheDocument();
  });

  test('Teste ao clicar no link `Home` você vai para `/`', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const { location: { pathname } } = customHistory;

    const homeLinkEl = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeLinkEl);
    expect(pathname).toBe('/');
  });

  test('Teste ao clicar no link `About` você vai para /about', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const aboutLinkEl = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLinkEl);

    const { location: { pathname } } = customHistory;
    expect(pathname).toBe('/about');
  });

  test('Teste ao clicar no link `Favorite Pokémons` você vai para /favorites', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const favLinkEl = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favLinkEl);

    const { location: { pathname } } = customHistory;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se ao entrar em uma URL desconhecida é encontrado `not found`', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/notFound');

    const notFoundEl = screen.getByRole('heading', { name: /not found/i, level: 2 });

    expect(notFoundEl).toBeInTheDocument();
  });
});

/*
  - .
*/
