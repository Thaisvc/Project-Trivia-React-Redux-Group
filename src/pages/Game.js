import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getApiLogin, requestApi } from '../redux/action/action';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const { getApi } = this.props;
    const tokenLocalStorage = localStorage.getItem('token');
    getApi(tokenLocalStorage);
  }

  componentWillUnmount() {
    const { delApi } = this.props;
    delApi({ response_code: 0 });
  }

  selectAnswer= ({ target }) => {
    const elementCorreta = document.getElementById('correta');
    const elementIncorreta = document.getElementById('incorreta');
    if (target.id === 'correta') {
      elementCorreta.style.border = '3px solid rgb(6, 240, 15)';
      elementIncorreta.style.border = '3px solid red';
    } else {
      elementIncorreta.style.border = '3px solid red';
      elementCorreta.style.border = '3px solid rgb(6, 240, 15)';
    }
  }

  renderAnswer = () => {
    const { stateApi } = this.props;
    const { index } = this.state;

    const LENGTH_INCORRECT = stateApi.results[index].incorrect_answers.length;
    const numRandom = (Math.random() * LENGTH_INCORRECT).toFixed(0);
    console.log(stateApi.results[index].correct_answer, '<= RESPOSTA CORRETA');

    const answer = [...stateApi.results[index].incorrect_answers];
    answer.splice(numRandom, 0, stateApi.results[index].correct_answer);

    return answer.map((questions, i) => (
      <div key={ questions } data-testid="answer-options">
        {questions === stateApi.results[0].correct_answer
          ? (
            <button
              type="button"
              id="correta"
              data-testid="correct-answer"
              onClick={ (e) => this.selectAnswer(e) }
            >
              {stateApi.results[0].correct_answer}
            </button>)
          : (
            <button
              type="button"
              id="incorreta"
              index={ i }
              data-testid={ `wrong-answer-${i}` }
              onClick={ (e) => this.selectAnswer(e) }
            >
              {questions}
            </button>)}
      </div>
    ));
  }

  render() {
    const { index } = this.state;
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

            </div>
          </div>
        )}
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getApi: (payload) => dispatch(getApiLogin(payload)),
  delApi: (obj) => dispatch(requestApi(obj)),
});

const mapStateToProps = (state) => ({
  stateApi: state.loginReducer.tokenReturn,
});

Game.propTypes = {
  getApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
