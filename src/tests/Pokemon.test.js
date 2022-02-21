import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

let pokemonName;
let pokemonType;
let pokemonWeight;
let pokemonId;
let history;
beforeEach(() => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  pokemonName = pokemons.map((pokemon) => pokemon.name);
  pokemonType = pokemons.map((pokemon) => pokemon.type);
  pokemonWeight = pokemons.map((pokemon) => pokemon.averageWeight);
  pokemonId = pokemons.map((pokemon) => pokemon.id);
  history = customHistory;
});

describe('Teste se é renderizado um card com as informações pokémon', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const pikachuNameEl = screen.getByText(pokemonName[0]);
    expect(pikachuNameEl).toBeInTheDocument();
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const pikachuTypeEl = screen.getByTestId('pokemon-type');
    expect(pikachuTypeEl).toHaveTextContent(pokemonType[0]);
  });

  test('O peso médio do pokémon deve ser exibido no formato certo', () => {
    const pikachuWeightEl = screen.getByTestId('pokemon-weight');
    expect(pikachuWeightEl)
      .toHaveTextContent(`${pokemonWeight[0].value} ${pokemonWeight[0].measurementUnit}`);
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    const imgEl = screen.getByAltText(`${pokemonName[0]} sprite`);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(imgEl.src).toContain(url);
  });
});

test('Teste se o card na Pokédex contém um link para exibir detalhes', () => {
  const moreDetailsEl = screen.getByRole('link', { name: 'More details' });
  expect(moreDetailsEl.href).toContain(`pokemons/${pokemonId[0]}`);
});

test('Teste se ao clicar no link, será redirecionado à página de detalhes', () => {
  const moreDetailsEl = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsEl);

  const pagePikachuDatail = screen
    .getByRole('heading', { name: `${pokemonName[0]} Details`, level: 2 });
  expect(pagePikachuDatail).toBeInTheDocument();
});

test('Teste se a URL exibida no navegador muda para `/pokemon/<id>`', () => {
  const moreDetailsEl = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsEl);

  const { location: { pathname } } = history;
  expect(pathname).toBe(`/pokemons/${pokemonId[0]}`);
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  test('O ícone deve conter um `src` com o caminho `/star-icon.svg`', () => {
    const moreDetailsEl = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsEl);

    const favCheckbox = screen.getByRole('checkbox');
    userEvent.click(favCheckbox);

    const homeLinkEl = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLinkEl);

    const imgEl = screen.getByAltText(`${pokemonName[0]} is marked as favorite`);
    const url = '/star-icon.svg';
    expect(imgEl.src).toContain(url);
  });

  test('A imagem contem um `alt` igual a `<pokemon> is marked as favorite`', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/');

    const moreDetailsEl = screen.getAllByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsEl[0]);

    const favCheckbox = screen.getAllByRole('checkbox');
    userEvent.click(favCheckbox[0]);

    const homeLinkEl = screen.getAllByRole('link', { name: /home/i });
    userEvent.click(homeLinkEl[0]);

    const imgEl = screen.getAllByAltText(`${pokemonName[0]} is marked as favorite`);
    expect(imgEl[0].alt).toContain(`${pokemonName[0]} is marked as favorite`);
  });
});
