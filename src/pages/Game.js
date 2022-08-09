import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { getApiLogin } from '../redux/action/action';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
      correctAnswer: '',
      incorrectAnswers: [],
      question: '',

    };
  }

  componentDidMount() {
    const { stateApi, history } = this.props;
    // console.log(stateApi.results);
    if (stateApi.results.length > 0) {
      this.setState({
        category: stateApi.results[0].category,
        correctAnswer: stateApi.results[0].correct_answer,
        incorrectAnswers: stateApi.results[0].incorrect_answers,
        question: stateApi.results[0].question,
      });
    } else {
      history.push('/');
    }
  }

  componentDidUpdate() {
    const { correctAnswer, incorrectAnswers } = this.state;
    const LENGTH_INCORRECT = incorrectAnswers.length;
    const numRandom = (Math.random() * LENGTH_INCORRECT).toFixed(0);
    // console.log(LENGTH_INCORRECT);
    incorrectAnswers.splice(numRandom, 0, correctAnswer);
    this.randomQuest(incorrectAnswers);
  }

  /*  randomQuest = (incorrectAnswers) => {
    const { correctAnswer } = this.state;
  } */
  // const allAnswers = incorrectAnswers.push([]);
  // console.log(incorrectAnswers, 'antes do SPLICE');
  /* this.setState({
      incorrectAnswers,
    }); */

  render() {
    // const { stateApi } = this.props;
    const { category, question, incorrectAnswers, correctAnswer } = this.state;
    // console.log(category, correctAanswer, incorrectAnswers, question, api);

    return (
      <header>
        <div>
          <h1 data-testid="header-player-name">Nome da pessoa</h1>
          <p data-testid="header-score">Placar: 0</p>
          <img
            data-testid="header-profile-picture"
            src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
            alt="gravatar"
          />

          <div>
            <p data-testid="question-category">{category}</p>
            <p data-testid="question-text">{question}</p>
            <div />
            {incorrectAnswers.map((questions, index) => (
              <div key={ questions } data-testid="answer-options">
                <button type="button" data-testid={ `wrong-answer-${index}` }>
                  {questions}
                </button>
                <button type="button" data-testid="correct-answer">
                  {correctAnswer}
                </button>
              </div>
            ))}
          </div>

        </div>
        {/* {this.randomQuest()} */}

      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(getApiLogin()),
});

const mapStateToProps = (state) => ({
  stateApi: state.loginReducer.tokenReturn,
});

Game.propTypes = {
  getApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
