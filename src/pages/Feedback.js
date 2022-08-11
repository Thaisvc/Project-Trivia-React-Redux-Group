import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { name, score } = this.props;
    return (
      <div data-testid="feedback-text">
        <img
          data-testid="header-profile-picture"
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          alt="gravatar"
        />

        <p data-testid="header-player-name">
          {name}
        </p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Feedback.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
