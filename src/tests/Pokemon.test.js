import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testes do componente Pokemon', () => {
  it('Testando se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const { name, type, averageWeight, image } = pokemonList[0];
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  it('Testando se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    const { id } = pokemonList[0];

    expect(buttonDetails).toBeInTheDocument();
    expect(buttonDetails).toHaveAttribute('href', `/pokemon/${id}`);
    userEvent.click(buttonDetails);
    expect(history.location.pathname).toBe(`/pokemon/${id}`);
  });

  it('Testando se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const { name } = pokemonList[0];

    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    expect(buttonDetails).toBeInTheDocument();
    userEvent.click(buttonDetails);

    const details = screen.getByRole('heading', { name: `${name} Details` });
    expect(details).toBeInTheDocument();

    const favorite = screen.getByRole('checkbox');
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const star = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
