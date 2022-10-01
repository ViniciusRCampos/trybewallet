import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyAPI());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies, 'teste');

    return (
      <section>
        <label htmlFor="value-input">
          Despesa:
          <input
            type="text"
            id="value-input"
            data-testid="value-input"
            name="despesa"
            placeholder="Despesa"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description"
            name="description"
            placeholder="Descrição"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
          >
            {
              currencies.map((currency) => (
                <option
                  key={ currency }
                  value={ currency }
                >
                  {currency}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          Metodo de Pagamento:
          <select
            data-testid="method-input"
            id="method-input"
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito ">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Despesa:
          <select
            data-testid="tag-input"
            id="tag-input"
          >
            <option value="alimentação">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saúde">Saúde</option>
          </select>
        </label>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
