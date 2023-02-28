import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testes do componente Not Found', () => {
  it('Testando se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', URL);
  });
});
