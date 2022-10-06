import './Header.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaUserCircle, FaCoins } from 'react-icons/fa';

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
      <section className="header">
        <div className="user">
          <h2 data-testid="email-field" className="email">
            <FaUserCircle size="25px" className="email_icon" />
            {' '}
            {`${email}`}
          </h2>
        </div>
        <div className="expenses">
          <h2>
            <FaCoins className="expenses_icon" size="25px" />
            {/* {'Despesas: '} */}
            <span data-testid="total-field">
              R$
              {' '}
              { parseFloat(sumExpenses).toFixed(2) }
            </span>
            <span data-testid="header-currency-field" className="hidden">
              {' BRL'}
            </span>
          </h2>
        </div>

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
