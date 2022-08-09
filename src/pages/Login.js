import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApiLogin, loginPeople } from '../redux/action/action';

class Login extends Component {
    state={
      name: '',
      email: '',
    }

    handleChange=({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    }

    verificaInput = () => {
      const { name, email } = this.state;

      if (name && email) {
        return false;
      } return true;
    }

    handleGame = async () => {
      const { getApi, history } = this.props;
      await getApi();
      const { login } = this.props;
      await login(this.state);
      history.push('/game');
    }

    btnSetting = () => {
      const { history } = this.props;
      history.push('/settings');
    }

    render() {
      const { name, email } = this.state;

      return (
        <div>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              value={ name }
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ this.verificaInput() }
            onClick={ this.handleGame }
            data-testid="btn-play"
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.btnSetting }
          >
            Settings
          </button>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(getApiLogin()),
  login: (name) => dispatch(loginPeople(name)),
});

Login.propTypes = {
  getApi: PropTypes.func,
  login: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
