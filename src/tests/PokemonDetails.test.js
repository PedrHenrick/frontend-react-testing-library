import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import pokemons from '../data';

let moreDetailsEl;
let pokemonLocation;
beforeEach(() => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );
  moreDetailsEl = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsEl);
  pokemonLocation = screen.getAllByAltText('Pikachu location');
});

describe('Teste se as informações do Pokémon selecionado são mostradas na tela', () => {
  test('A página deve conter um texto `<name> Details`', () => {
    const pokemonTitleDetail = screen
      .getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(pokemonTitleDetail).toBeInTheDocument();
  });

  test('**Não** deve existir o link para os detalhes do Pokémon selecionado', () => {
    expect(moreDetailsEl).not.toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading `h2` com o texto `Summary`', () => {
    const pokemonTitleSumary = screen
      .getByRole('heading', { name: 'Summary', level: 2 });
    expect(pokemonTitleSumary).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um resumo do Pokémon visualizado', () => {
    const pokemonDetail = screen
      .getByText(/This intelligent Pokémon roasts hard berries with electricity/i);
    expect(pokemonDetail).toBeInTheDocument();
  });
});

describe('Teste se existe na página os mapas contendo as localizações do pokémon', () => {
  test('Em detalhes deve existir um `h2` com `Game Locations of <name>`', () => {
    const pokemonTitleDetail = screen
      .getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(pokemonTitleDetail).toBeInTheDocument();
  });

  test('Todas as localizações do Pokémon devem ser mostradas em detalhes', () => {
    const pokemonViridianForest = screen
      .getByText('Kanto Viridian Forest');
    const pokemonPowerPlant = screen
      .getByText('Kanto Power Plant');
    expect(pokemonViridianForest && pokemonPowerPlant).toBeInTheDocument();
  });

  test('Deve ser exibido, o nome da localização e uma imagem do mapa', () => {
    const pokemonViridianForest = screen
      .getByText('Kanto Viridian Forest');
    const pokemonPowerPlant = screen
      .getByText('Kanto Power Plant');

    expect(pokemonViridianForest && pokemonPowerPlant).toBeInTheDocument();
    expect(pokemonLocation).toHaveLength(2);
  });

  test('A imagem da localização deve ter um `src` com a URL da localização', () => {
    const urlForest = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const urlPlant = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(pokemonLocation[0].src).toContain(urlForest);
    expect(pokemonLocation[1].src).toContain(urlPlant);
  });

  test('A imagem deve ter um atributo `alt` com o texto `<name> location`', () => {
    expect(pokemonLocation[0].alt && pokemonLocation[1].alt)
      .toContain('Pikachu location');
  });
});

describe('Teste se o usuário pode favoritar um pokémon na página de detalhes', () => {
  test('A página deve exibir um `checkbox` que permite favoritar o Pokémon', () => {
    const checkboxEl = screen.getByRole('checkbox');
    expect(checkboxEl).toBeInTheDocument();
  });

  test('Cliques no `checkbox` devem adicionar e remover da lista de favoritos', () => {
    const checkboxEl = screen.getByRole('checkbox');
    userEvent.click(checkboxEl);
    const favIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favIcon).toBeInTheDocument();
    userEvent.click(checkboxEl);
    expect(favIcon).not.toBeInTheDocument();
  });

  test('O `label` do `checkbox` deve conter o texto `Pokémon favoritado?`', () => {
    const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(labelCheckbox).toBeInTheDocument();
  });
});
