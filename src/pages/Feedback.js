import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  linkToRanking=() => {
    const { name, score, history } = this.props;
    history.push('/ranking');

    const picture = 'https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc';
    const objPlayers = { name, score, picture };

    const objLocalStorage = JSON.parse(localStorage.getItem('ranking')) || [];
    if (typeof objLocalStorage === 'string') {
      [objLocalStorage].push(objPlayers);
      localStorage.setItem('ranking', JSON.stringify(objLocalStorage));
    }
    objLocalStorage.push(objPlayers);
    localStorage.setItem('ranking', JSON.stringify(objLocalStorage));
  }

  render() {
    const { name, score, assertions } = this.props;
    const tres = 3;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          alt="gravatar"
        />

        <h1 data-testid="header-player-name">
          {name}
        </h1>

        <h2 data-testid="header-score">{score}</h2>

        <h3 data-testid="feedback-text">
          {assertions < tres ? 'Could be better...' : 'Well Done!' }
        </h3>

        <p>
          Placar final:
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </p>

        <p>
          Você acertou:
          {' '}
          <span data-testid="feedback-total-question">
            {assertions}
          </span>
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.linkToRanking }
        >
          Ranking
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
