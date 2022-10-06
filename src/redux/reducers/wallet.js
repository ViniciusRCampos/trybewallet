// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCY_SUCCESS,
  RECEIVE_CURRENCY_FAILURE,
  REQUEST_CURRENCY,
  NEW_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  currentId: 0,
  edit: false,
};

const wallet = (state = INITIAL_STATE, { type, currencies, error,
  expenses, id, expense }) => {
  switch (type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
    };
  case RECEIVE_CURRENCY_SUCCESS:
    return { ...state,
      currencies };
  case RECEIVE_CURRENCY_FAILURE:
    return {
      ...state,
      error,
    };
  case NEW_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, expenses] };
  case REMOVE_EXPENSE:
    return { ...state,
      expenses: [...expenses],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: true,
      currentId: id,
    };

  case SAVE_EXPENSE:
    return {
      ...state,
      edit: false,
      expenses: state.expenses.map((element) => {
        if (element.id === state.currentId) {
          return { ...expense, id: state.currentId };
        }
        return element;
      }),
    };

  default: return state;
  }
};

export default wallet;
