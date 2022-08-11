import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { addScore, assertionsQuestions, getApiLogin } from '../redux/action/action';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      buttonQuest: false,
      showElement: false,
      showElementHome: false,
      next: 1,
      resete: '',
      renderizaAnswer: [],
      respostas: false,
      scoreTimer: 30,
    };
  }

  componentDidMount() {
    this.startTimer();
    const { getApi } = this.props;
    const tokenLocalStorage = localStorage.getItem('token');
    getApi(tokenLocalStorage);
  }

  selectAnswer= () => {
    const elementCorreta = document.getElementById('correta');
    const elementsIncorreta = document.querySelectorAll('.incorreta');

    elementCorreta.style.border = '3px solid rgb(6, 240, 15)';
    elementsIncorreta.forEach((element) => {
      element.style.border = '3px solid red';
    });
    // elementsIncorreta.style.border = '3px solid red';
    this.setState({
      showElement: true,
    });
  }

  stopTime = () => {
    const { resete } = this.state;
    this.selectAnswer();
    clearInterval(resete);
  }

  scoreFunction = () => {
    const POINT = 10;
    const POINT_HARD = 3;
    const { scoreTimer, index } = this.state;
    const { stateApi, setScore } = this.props;
    const difficultys = stateApi.results[index].difficulty;
    if (difficultys === 'easy') setScore(Number(POINT + (scoreTimer * 1)));
    if (difficultys === 'medium') setScore(Number(POINT + (scoreTimer * 2)));
    if (difficultys === 'hard') setScore(Number(POINT + (scoreTimer * POINT_HARD)));
  }

  correctAnswerScore = () => {
    const { setAssertions } = this.props;
    setAssertions(1);
    this.stopTime();
    this.scoreFunction();
  }

  renderAnswer = () => {
    const { stateApi } = this.props;
    const arrTotal = [];
    stateApi.results.forEach((question) => {
      const LENGTH_INCORRECT = question.incorrect_answers.length;
      const numRandom = (Math.random() * LENGTH_INCORRECT).toFixed(0);
      const answer = [...question.incorrect_answers];
      answer.splice(numRandom, 0, question.correct_answer);
      arrTotal.push(answer);
    });
    this.setState({ renderizaAnswer: arrTotal, respostas: true });
  }

   startTimer = () => {
     const display = document.querySelector('#timer');
     const convertMin = 60;
     const Seconds = 0.50;
     const duration = convertMin * Seconds;
     let timer = duration; let seconds;
     const min = 60;
     const sec = 10;
     const total = 1000;
     const reset = setInterval(() => {
       seconds = parseInt(timer % min, 10);
       seconds = seconds < sec ? `0${seconds}` : seconds;
       display.textContent = `${seconds}`;
       timer -= 1;
       this.setState({ scoreTimer: timer + 1 });
       if (timer === 0) {
         this.setState({ buttonQuest: true });
         clearInterval(reset);
       }
     }, total);
     this.setState({ resete: reset });
   }

   nextAnswerIndex = () => {
     const { stateApi } = this.props;
     const { next } = this.state;
     const six = 6;
     const five = 5;
     this.setState((stateAtual) => ({
       index: (stateAtual.index + 1) % stateApi.results.length,
       next: (stateAtual.next + 1) % six,
     }));
     if (next === five) {
       this.setState({
         showElementHome: true,
       });
     }
     this.startTimer();
   }

   render() {
     const { index, showElement, showElementHome, respostas,
       renderizaAnswer, buttonQuest } = this.state;

     const { stateApi, getScore } = this.props;

     const ERROR_API = 3;
     if (stateApi.response_code === ERROR_API) return <Redirect to="/" />;
     return (
       <header>
         {stateApi
        && (
          <div>
            <h1 data-testid="header-player-name">Nome da pessoa</h1>
            <p data-testid="header-score">{`Placar: ${getScore}`}</p>
            <img
              data-testid="header-profile-picture"
              src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
              alt="gravatar"
            />
            <div>
              { stateApi.results !== undefined
                ? (
                  <>
                    <p
                      data-testid="question-category"
                    >
                      {stateApi.results[index].category}
                    </p>
                    <p data-testid="question-text">{stateApi.results[index].question}</p>
                  </>
                )
                : <p>Carregando</p>}

              <div />

              {!respostas && stateApi.results && this.renderAnswer()}
              <div data-testid="answer-options">
                {renderizaAnswer.length > 0
                  && renderizaAnswer[index].map((answer, i) => (
                    answer === stateApi.results[index].correct_answer
                      ? (
                        <button
                          key={ answer }
                          type="button"
                          id="correta"
                          disabled={ buttonQuest }
                          data-testid="correct-answer"
                          onClick={ this.correctAnswerScore }
                        >
                          {answer}
                        </button>)
                      : (
                        <button
                          key={ answer }
                          type="button"
                          className="incorreta"
                          disabled={ buttonQuest }
                          data-testid={ `wrong-answer-${i}` }
                          onClick={ this.stopTime }
                        >
                          {answer}
                        </button>)
                  ))}
              </div>

              <div id="timer" />
            </div>

            {showElement ? (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.nextAnswerIndex }
              >
                Next

              </button>
            ) : null }

            {showElementHome ? (
              <Redirect to="/feedback" />

            ) : null }
          </div>
        )}
       </header>
     );
   }
}

const mapDispatchToProps = (dispatch) => ({
  getApi: (payload) => dispatch(getApiLogin(payload)),
  setScore: (score) => dispatch(addScore(score)),
  setAssertions: (assertions) => dispatch(assertionsQuestions(assertions)),
});

const mapStateToProps = (state) => ({
  stateApi: state.player.tokenReturn,
  getScore: state.player.score,
});

Game.propTypes = {
  getApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
