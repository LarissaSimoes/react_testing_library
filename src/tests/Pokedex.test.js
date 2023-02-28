import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testes do componente Pokedex', () => {
  const nextPokemon = 'Próximo Pokémon';
  const pokemonName = 'pokemon-name';

  it('Testando se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });

    expect(h2).toBeInTheDocument();
  });

  it('Testando se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const proximoPokemonBtn = screen.getByRole('button', { name: nextPokemon });
    expect(proximoPokemonBtn).toBeInTheDocument();

    pokemonList.forEach((pokemon) => {
      expect(screen.getByTestId(pokemonName)).toHaveTextContent(pokemon.name);
      userEvent.click(proximoPokemonBtn);
    });
  });

  it('Testando se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const proximoPokemonBtn = screen.getByRole('button', { name: nextPokemon });
    expect(proximoPokemonBtn).toBeInTheDocument();

    const pokemon = screen.queryAllByTestId(pokemonName);
    expect(pokemon).toHaveLength(1);
  });

  it('Testando se a Pokédex tem os botões de filtro e um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const allButtons = screen.getByRole('button', { name: 'All' });
    const proximoPokemonBtn = screen.getByRole('button', { name: nextPokemon });
    const pokemonType = screen.getByTestId('pokemon-type');

    expect(allButtons).toBeInTheDocument();
    expect(proximoPokemonBtn).toBeInTheDocument();
    expect(typeButtons).toHaveLength(7);

    typeButtons.forEach((typeButton) => {
      expect(allButtons).toBeInTheDocument();
      userEvent.click(typeButton);
      expect(pokemonType).toHaveTextContent(typeButton.innerHTML);
      userEvent.click(proximoPokemonBtn);
      expect(pokemonType).toHaveTextContent(typeButton.innerHTML);
      userEvent.click(allButtons);
      expect(pokemonType).toHaveTextContent('Electric');
    });
  });
});
