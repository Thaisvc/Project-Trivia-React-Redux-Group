import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
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

        <p data-testid="header-player-name">
          {name}
        </p>

        <p data-testid="header-score">{score}</p>

        <p data-testid="feedback-text">
          {assertions < tres ? 'Could be better...' : 'Well Done!' }
        </p>

        <p>
          Placar final:
          <span data-testid="feedback-total-score">{ score }</span>
        </p>

        <p>
          Você acertou:
          <span data-testid="feedback-total-question">
            {assertions}
          </span>
        </p>
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
