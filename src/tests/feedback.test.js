import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import Feedback from '../pages/Feedback'

const player = {
  tokenReturn: {},
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

describe('Testa funções no componente Feedback',  () => {

    it('Verifica se ao clicar no botão de jogar novamente a página é redirecionada', () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);
        const rankingButton = screen.getByTestId('btn-play-again');
        userEvent.click(rankingButton);
    
        expect(history.location.pathname).toBe('/');
      });

      it('Verificar a rota para a tela de Ranking', () => {
        const { history } = renderWithRouterAndRedux(<App />, {player}, '/feedback');
        history.push('/feedback');
    
        const goToRanking = screen.getByTestId('btn-ranking');
        userEvent.click(goToRanking);
        expect(history.location.pathname).toBe('/ranking')
      })

      it('Testa localStorage', () => {
        renderWithRouterAndRedux(<App />, {player}, '/feedback');
        expect(localStorage.getItem('ranking')).toBe("[{\"name\":\"\",\"score\":0,\"picture\":\"https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc\"}]")
      })
      
    it('Testa se botão play again está renderizado', () => {
        renderWithRouterAndRedux(<Feedback />)
    const btnPlayAgain = screen.getByTestId('btn-play-again')
    expect(btnPlayAgain).toBeInTheDocument()

    })

    it('Testa frase na tela de FeedBack.', async () => {
        const { history } = renderWithRouterAndRedux(<App />,{player}, '/');
        const email = screen.getByTestId('input-gravatar-email');
        const name = screen.getByTestId('input-player-name');
        const button = screen.getByText(/Play/i);
        userEvent.type(email, 'enzo@enzo');
        userEvent.type(name, 'enzo');
        userEvent.click(button);
        await new Promise((r) => setTimeout(r , 5000));
        expect(history.location.pathname).toBe('/game');
       const answer = screen.getByTestId('correct-answer');
       userEvent.click(answer);
       const btnNext = screen.getByTestId('btn-next')
       userEvent.click(btnNext);
       const answer1 = screen.getByTestId('correct-answer');
       userEvent.click(answer1);
       const btnNext1 = screen.getByTestId('btn-next')
       userEvent.click(btnNext1);
       const answer2 = screen.getByTestId('correct-answer');
       userEvent.click(answer2);
       const btnNext2 = screen.getByTestId('btn-next')
       userEvent.click(btnNext2);
       const answer3 = screen.getByTestId('correct-answer');
       userEvent.click(answer3);
       const btnNext3 = screen.getByTestId('btn-next')
       userEvent.click(btnNext3);
       const answer4 = screen.getByTestId('correct-answer');
       userEvent.click(answer4);
       const btnNext4 = screen.getByTestId('btn-next')
       userEvent.click(btnNext4);
       const textFeedback = screen.getByText(/Well Done!/i)
       expect(textFeedback).toBeInTheDocument()
    });

})