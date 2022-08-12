import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('ranking'));
    const rankPlayers = storage.sort((a, b) => b.score - a.score);
    console.log(rankPlayers, 'resposta RANK');
    this.setState(({ ranking: rankPlayers }));
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <header>

          <h1 data-testid="ranking-title"> Ranking</h1>
          <Link to="/">
            <button type="button" data-testid="btn-go-home">Home</button>
          </Link>
        </header>

        <section>
          {ranking.map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt="gravatar" />
              <h2 data-testid={ `player-name-${index}` }>
                {player.name}
              </h2>
              <h2 data-testid={ `player-score-${index}` }>
                {player.score}
              </h2>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Ranking.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Ranking);
