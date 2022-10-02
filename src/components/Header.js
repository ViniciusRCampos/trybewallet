import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const sumExpenses = expenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      const sum = value * exchangeRates[currency].ask;
      const total = parseFloat((acc + sum).toFixed(2));
      return total;
    }, 0);
    return (
      <section>
        <h2 data-testid="email-field">
          { email }
        </h2>
        <h2>
          {'Despesas: '}
          <span data-testid="total-field">
            { sumExpenses }
          </span>
          <span data-testid="header-currency-field">
            {' BRL'}
          </span>
        </h2>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
