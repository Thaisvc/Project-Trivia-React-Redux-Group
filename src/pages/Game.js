import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { addScore, getApiLogin, requestApi } from '../redux/action/action';

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
      /*  scoreStop: '',
      tempe: 0, */
    };
  }

  componentDidMount() {
    this.startTimer();
    const { getApi } = this.props;
    const tokenLocalStorage = localStorage.getItem('token');
    getApi(tokenLocalStorage);
    this.punctuation();
  }

  componentWillUnmount() {
    const { delApi } = this.props;
    delApi({ response_code: 0 });
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

  renderAnswer = () => {
    const { stateApi } = this.props;
    const { index, buttonQuest } = this.state;

    const LENGTH_INCORRECT = stateApi.results[index].incorrect_answers.length;
    const numRandom = (Math.random() * LENGTH_INCORRECT).toFixed(0);
    console.log(stateApi.results[index].correct_answer, '<= RESPOSTA CORRETA');

    const answer = [...stateApi.results[index].incorrect_answers];
    answer.splice(numRandom, 0, stateApi.results[index].correct_answer);

    return answer.map((questions, i) => (
      <div key={ questions } data-testid="answer-options">
        {questions === stateApi.results[index].correct_answer
          ? (

            <button
              type="button"
              id="correta"
              disabled={ buttonQuest }
              data-testid="correct-answer"
              onClick={ this.stopTime }
            >
              {stateApi.results[0].correct_answer}
            </button>)
          : (
            <button
              type="button"
              className="incorreta"
              disabled={ buttonQuest }
              data-testid={ `wrong-answer-${i}` }
              onClick={ this.stopTime }
            >
              {questions}
            </button>)}
      </div>
    ));
  }

  // https://www.horadecodar.com.br/2020/12/14/contador-regressivo-com-javascript-puro/
   startTimer = () => {
   //  const { setScore } = this.props;
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
       // setScore(timer);

       if (timer === 0) {
         this.setState({ buttonQuest: true });
       }
     }, total);
     this.setState({ resete: reset });
   }

   nextAnswerIndex = () => {
     const { stateApi } = this.props;
     const { index, next } = this.state;
     console.log('next', next, index);
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

   punctuation = () => {
     const { getScore } = this.props;
     console.log('getScore', getScore);
     // onst calc = 10 +
   }

   render() {
     const { index, showElement, showElementHome } = this.state;
     const { stateApi } = this.props;

     const ERROR_API = 3;
     if (stateApi.response_code === ERROR_API) return <Redirect to="/" />;
     return (
       <header>
         {stateApi
        && (
          <div>
            <h1 data-testid="header-player-name">Nome da pessoa</h1>
            <p data-testid="header-score">Placar: 0</p>
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
              {stateApi.results && this.renderAnswer()}
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
              <Link to="/">
                <button
                  type="button"
                  data-testid="btn-next"
                >
                  home

                </button>
              </Link>
            ) : null }
          </div>
        )}
       </header>
     );
   }
}

const mapDispatchToProps = (dispatch) => ({
  getApi: (payload) => dispatch(getApiLogin(payload)),
  delApi: (obj) => dispatch(requestApi(obj)),
  setScore: (score) => dispatch(addScore(score)),
});

const mapStateToProps = (state) => ({
  stateApi: state.loginReducer.tokenReturn,
  getScore: state.loginReducer.score,
});

Game.propTypes = {
  getApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
