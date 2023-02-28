import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Testes do componente FavoritePokemon', () => {
  it('Testando se se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const message = screen.getByText('No favorite Pokémon found');
    expect(message).toBeInTheDocument();
  });

  it('Testando se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);
    const checkBoxFavorite = screen.getByRole('checkbox');
    userEvent.click(checkBoxFavorite);
    const favoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favoritePokemon);
    const message = screen.getByText('Pikachu');
    expect(message).toBeInTheDocument();
  });
});
