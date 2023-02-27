import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente App', () => {
  it('Verificando se o topo da aplicação contém links Home, About e Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Testando se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeTest = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeTest);
    expect(history.location.pathname).toBe('/');
  });

  it('Testando se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutTest = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutTest);
    expect(history.location.pathname).toBe('/about');
  });

  it('Testando se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    const invalidURL = '/whatever';
    act(() => {
      history.push(invalidURL);
    });
    const notFound = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(notFound).toBeVisible();
  });
});
