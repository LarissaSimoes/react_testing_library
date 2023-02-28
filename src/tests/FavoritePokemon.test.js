import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import pokemonList from '../data';

describe('Testes do componente FavoritePokemon', () => {
  it('Testando se se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const message = screen.getByText('No favorite Pokémon found');
    expect(message).toBeInTheDocument();
  });

  it('Testando se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);
    pokemonList.forEach((pokemon) => {
      const name = screen.getByText(pokemon.name);
      expect(name).toBeInTheDocument();
    });
  });
});
