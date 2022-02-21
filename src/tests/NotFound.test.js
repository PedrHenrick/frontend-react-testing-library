import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Teste se a url está errada é renderizada a página not found', () => {
  test('Teste se página contém um `h2` com o texto `Page requested not found 😭`', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/notFound');

    const notFoundEl = screen.getByRole('heading', {
      name: /Page requested not found/i, level: 2 });
    const emoji = screen.getByText('😭');

    expect(notFoundEl && emoji).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/notFound');

    const imgEl = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imgEl.src).toContain(url);
  });
});
