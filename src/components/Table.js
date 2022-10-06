import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import PropTypes from 'prop-types';
import { editExpense, removeExpense } from '../redux/actions';
import './Table.css';

class Table extends Component {
  deleteBtn = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const { name } = target;
    const deleteExpense = expenses.filter((e) => e.id !== Number(name));
    dispatch(removeExpense(deleteExpense));
  };

  editBtn = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section className="table_div">
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th className="coin">Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((
              { id,
                description,
                tag,
                method,
                value,
                exchangeRates,
                currency },
            ) => (
              <tr key={ id } className="table_data">
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{parseFloat(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  R$
                  {' '}
                  {parseFloat(exchangeRates[currency].ask * value).toFixed(2)}
                </td>
                <td className="coin">Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="btn"
                    name={ id }
                    onClick={ () => this.editBtn(id) }
                  >
                    <FaEdit size="20px" />
                  </button>
                  <button
                    type="button"
                    className="btn"
                    data-testid="delete-btn"
                    onClick={ this.deleteBtn }
                    name={ id }
                  >
                    <MdDeleteForever size="20px" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(Table);
