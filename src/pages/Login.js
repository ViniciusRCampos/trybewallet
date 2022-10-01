import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisabled: true,
  };

  emailValidation = (email) => (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i));

  btnStatus = () => {
    const { email, password } = this.state;

    if (this.emailValidation(email) && password.length >= Number('6')) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.btnStatus);
  };

  handleClick = (target) => {
    target.preventDefault();
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(login(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, btnDisabled } = this.state;
    console.log(this.state);
    return (
      <section>
        <div>Login - TRYBEWALLET</div>
        <form htmlFor="email">
          Login:
          <input
            type="email"
            data-testid="email-input"
            name="email"
            id="email"
            placeholder="email@email.com"
            value={ email }
            onChange={ this.handleChange }
          />
        </form>
        <form htmlFor="password">
          Password:
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={ password }
            onChange={ this.handleChange }
          />
        </form>
        <button
          type="submit"
          onClick={ this.handleClick }
          disabled={ btnDisabled }
        >
          Entrar
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
  dispatch: PropTypes.shape({}),
}.isRequired;

export default connect()(Login);
