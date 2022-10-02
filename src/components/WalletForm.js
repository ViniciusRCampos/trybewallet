import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, fetchCurrencyAPI } from '../redux/actions';
import currencyAPI from '../helpers/currencyAPI';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyAPI());
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  dispatchAction = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch(addExpense(this.state));
    this.setState({ id: id + 1, value: '', description: '' });
  };

  handleClick = async () => {
    const quotation = await currencyAPI();
    this.setState({ exchangeRates: quotation }, () => this.dispatchAction());
  };

  render() {
    const { currencies } = this.props;
    const { value, description, method, tag, currency } = this.state;

    return (
      <section>
        <label htmlFor="value-input">
          Despesa:
          <input
            type="text"
            id="value"
            data-testid="value-input"
            name="value"
            value={ value }
            placeholder="Despesa"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description"
            name="description"
            value={ description }
            placeholder="Descrição"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((element) => (
                <option
                  key={ element }
                  value={ element }
                >
                  {element}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          Metodo de Pagamento:
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Despesa:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          id="add_expense"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
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
