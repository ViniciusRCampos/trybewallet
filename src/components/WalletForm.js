import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { BsCurrencyExchange, BsFillTagsFill } from 'react-icons/bs';
import { MdDescription, MdPayments } from 'react-icons/md';
import { addExpense, fetchCurrencyAPI, saveExpense } from '../redux/actions';
import currencyAPI from '../helpers/currencyAPI';
import './WalletForm.css';

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
    const { dispatch, edit } = this.props;
    const { id, value, description, method, currency, tag, exchangeRates } = this.state;
    if (!edit) {
      dispatch(addExpense(this.state));
      this.setState({ id: id + 1, value: '', description: '' });
    }
    if (edit) {
      const expenseToEdit = {
        value,
        description,
        method,
        currency,
        tag,
        exchangeRates,
      };
      dispatch(saveExpense(expenseToEdit));
      this.setState({ id, value: '', description: '' });
    }
  };

  handleClick = async () => {
    const quotation = await currencyAPI();
    this.setState({ exchangeRates: quotation }, () => this.dispatchAction());
  };

  render() {
    const { currencies, edit } = this.props;
    const { value, description, method, tag, currency } = this.state;

    return (
      <section className="wallet_form">
        <div className="teste">
          <div>
            <label htmlFor="value-input" className="wallet_label">
              <FaMoneyBillAlt size="25px" />
              <input
                className="wallet_input"
                type="number"
                id="value"
                data-testid="value-input"
                name="value"
                value={ value }
                placeholder="Valor da Despesa"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <label htmlFor="description" className="wallet_label">
            <MdDescription size="25px" />
            <input
              className="wallet_input"
              type="text"
              data-testid="description-input"
              id="description"
              name="description"
              value={ description }
              placeholder="Descrição"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input" className="wallet_label">
            <BsCurrencyExchange size="25px" />
            <select
              className="wallet_input"
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
          <label htmlFor="method-input" className="wallet_label">
            <MdPayments size="25px" />
            <select
              className="wallet_input"
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
          <label htmlFor="tag-input" className="wallet_label">
            <BsFillTagsFill size="25px" />
            <select
              className="wallet_input"
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
        </div>
        <button
          type="button"
          id="add_expense"
          className="add_btn"
          onClick={ this.handleClick }
        >
          { edit ? 'Editar despesa' : 'Adicionar despesa'}
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
