import React from 'react'
import { screen } from '@testing-library/react'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Login from '../pages/Login'
import userEvent from '@testing-library/user-event'
import App from '../App'
// const service = require("./helpers")


describe('Testa funcionamento do componente Login', () => {
 
    
    it('Teste se input de name está na tela', () => {
        renderWithRouterAndRedux(<Login />)
  const inputName = screen.getByTestId('input-player-name')
  expect(inputName).toBeInTheDocument()

    })
    it('Teste se input de email está na tela', () => {
        renderWithRouterAndRedux(<Login/>)
  const inputEmail = screen.getByTestId('input-gravatar-email')
  expect(inputEmail).toBeInTheDocument()

    })
    it('Teste se input de botão de play está na tela', () => {
        renderWithRouterAndRedux(<Login/>)
  const buttonPlay = screen.getByTestId('btn-play')
  expect(buttonPlay).toBeInTheDocument()

    })
    it('Teste se input de botão de play está desabilitado', () => {
        renderWithRouterAndRedux(<Login/>)
  const buttonPlay = screen.getByTestId('btn-play')
  expect(buttonPlay).toBeDisabled()

    })

    it('Teste se começa na rota `/`', () => {
        const { history } = renderWithRouterAndRedux(<Login />)
  expect(history.location.pathname).toBe('/')

    })


    it('A rota deve ser mudada para Game após o clique no botão.', () => {
        const { history } = renderWithRouterAndRedux(<App />, '/');
        const email = screen.getByTestId('input-gravatar-email');
        const name = screen.getByTestId('input-player-name');
        const button = screen.getByText(/Play/i);
        userEvent.type(email, 'enzo@enzo');
        userEvent.type(name, 'enzo');
        userEvent.click(button);
        expect(history.location.pathname).toBe('/game');
     
    });

    it('A rota deve ser mudada para Setings após o clique no botão.', () => {
        const { history } = renderWithRouterAndRedux(<App />, '/');
        const button = screen.getByText(/Settings/i);
        userEvent.click(button);
        expect(history.location.pathname).toBe('/settings');
     
    });

})
  