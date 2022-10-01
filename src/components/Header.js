import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <section>
        <h2 data-testid="email-field">
          { email }
        </h2>
        <h2>
          Despesas:
          <span data-testid="total-field">
            0
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </h2>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
