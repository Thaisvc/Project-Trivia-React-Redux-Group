import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getApiLogin } from '../redux/action/action';

class Game extends Component {
  componentDidMount() {
    const { getApi } = this.props;
    getApi();
  }

  /* verificaUrlApi = () => {
  const { stateApi } = this.props;
  if (stateApi.response_code !== 0) {
    return <Redirect to="/" />;
  }
}
 */
  render() {
    const { stateApi } = this.props;

    return (
      <header>
        {stateApi.response_code === 0 ? ('Carregando...')
          : console.log(stateApi.response_code) }
        {stateApi.results.length > 0 ? (
          <div>

            <h1 data-testid="header-player-name">Nome da pessoa</h1>
            <p data-testid="header-score">Placar: 0</p>
            <img
              data-testid="header-profile-picture"
              src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
              alt="gravatar"
            />

            <div>
              <p data-testid="question-category">{stateApi.results[0].category}</p>
              <p data-testid="question-text">{stateApi.results[0].question}</p>
              <div>
                <button type="button" data-testid="correct-answer">
                  {stateApi.results[0].correct_answer}
                </button>
              </div>
              {stateApi.results[0].incorrect_answers.map((question, index) => (
                <div key={ question } data-testid="answer-options">

                  <button type="button" data-testid={ `wrong-answer-${index}` }>
                    {question}
                  </button>
                </div>
              ))}

            </div>

          </div>
        ) : <Redirect to="/" />}
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
