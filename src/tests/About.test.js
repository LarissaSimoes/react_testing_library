import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testes do componente About', () => {
  it('Testando se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstInfo = screen.getByText(/This application simulates a Pokédex/i);
    const secondInfo = screen.getByText(/One can filter Pokémon by type/i);
    expect(firstInfo).toBeInTheDocument();
    expect(secondInfo).toBeInTheDocument();
  });

  it('Testando se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(h2).toBeInTheDocument();
  });

  it('Testando se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', URL);
  });
});
