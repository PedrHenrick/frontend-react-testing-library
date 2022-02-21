import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

let buttonNextEl;
let pokeTypePrimary;
let types;
let buttonAll;
beforeEach(() => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  buttonNextEl = screen.getByRole('button', { name: /Próximo pokémon/i });
  pokeTypePrimary = screen.getByTestId('pokemon-type');
  types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  buttonAll = screen.getByRole('button', { name: 'All' });
});
// Teste 1
test('Teste se página contém um `h2` com o texto `Encountered pokémons', () => {
  const notFoundEl = screen.getByRole('heading', {
    name: /Encountered pokémons/i, level: 2 });
  expect(notFoundEl).toBeInTheDocument();
});
// Conjunto 1
describe('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  test('O botão deve conter o texto `Próximo pokémon`', () => {
    expect(buttonNextEl).toBeInTheDocument();
  });

  test('Os próximos Pokémons devem ser mostrados, um a um, ao clicar no botão', () => {
    const pokemonName = pokemons.map((pokemon) => pokemon.name);
    const NUMBER_FOR_CLICKS = 7;

    for (let index = 0; index < NUMBER_FOR_CLICKS; index += 1) {
      const pokemonClick = screen.getByText(pokemonName[index]);
      expect(pokemonClick).toBeInTheDocument();

      userEvent.click(buttonNextEl);
    }
  });

  test('O primeiro da lista deve ser mostrado ao clicar, se estiver no último', () => {
    const NUMBER_FOR_CLICKS_2 = 8;

    for (let index = 0; index < NUMBER_FOR_CLICKS_2; index += 1) {
      userEvent.click(buttonNextEl);
    }

    const pokemonFinal = screen.getByText(/dragonair/i);
    expect(pokemonFinal).toBeInTheDocument();

    userEvent.click(buttonNextEl);

    const pokemonPrimary = screen.getByText(/pikachu/i);
    expect(pokemonPrimary).toBeInTheDocument();
  });
});
// Teste 2
test('Teste se é mostrado apenas um Pokémon por vez', () => {
  userEvent.click(buttonNextEl);

  const imgPokemon = screen.getAllByRole('img');
  expect(imgPokemon).toHaveLength(1);
});
/// Conjunto 2
describe('Teste se a Pokédex tem os botões de filtro', () => {
  test('Deve existir um filtro para cada tipo de Pokémon, sem repetição', () => {
    const filtros = screen.getAllByTestId('pokemon-type-button');
    expect(types.length === filtros.length).toBe(true);

    types.forEach((type) => {
      const buttonType = screen.getAllByRole('button', { name: type });
      expect(buttonType.length).toBe(1);
    });
  });

  test('Feita a seleção de um tipo, deve circular somente os pokémons do tipo', () => {
    const buttonType = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(buttonType);

    expect(pokeTypePrimary).toHaveTextContent('Fire');

    userEvent.click(buttonNextEl);

    const pokeTypeSecundary = screen.getByTestId('pokemon-type');
    expect(pokeTypeSecundary).toHaveTextContent('Fire');

    // Referência: https://github.com/testing-library/jest-dom#tohavetextcontent
  });

  test('O texto do botão deve corresponder ao `nome do tipo`, ex. `Psychic`', () => {
    const buttonType = screen.getByRole('button', { name: 'Psychic' });
    userEvent.click(buttonType);

    expect(pokeTypePrimary && buttonType).toHaveTextContent('Psychic');
  });

  test('O botão `All` precisa estar **sempre** visível', () => {
    types.forEach((type) => {
      const buttonType = screen.getAllByRole('button', { name: type });
      expect(buttonType.length).toBe(1);

      userEvent.click(buttonType[0]);
      expect(buttonAll).toBeVisible();
    });

    // Referência: https://github.com/testing-library/jest-dom#tobevisible
  });
});
/// Conjunto 3
describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser `All`', () => {
    expect(buttonAll).toHaveTextContent('All');
  });

  test('Deverá mostrar todos os Pokémons quando o botão `All` for clicado', () => {
    userEvent.click(buttonAll);

    const pokemonName = pokemons.map((pokemon) => pokemon.name);
    const NUMBER_FOR_CLICKS = 7;

    for (let index = 0; index < NUMBER_FOR_CLICKS; index += 1) {
      const pokemonClick = screen.getByText(pokemonName[index]);
      expect(pokemonClick).toBeInTheDocument();

      userEvent.click(buttonNextEl);
    }
  });

  test('Ao carregar a página, o filtro selecionado deverá ser `All`', () => {
    const pikachuEl = screen.getByText(/pikachu/i);
    expect(pikachuEl).toBeInTheDocument();

    userEvent.click(buttonNextEl);

    const charmanderEl = screen.getByText(/charmander/i);
    expect(charmanderEl).toBeInTheDocument();
  });
});
