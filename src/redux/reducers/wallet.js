// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCY_SUCCESS,
  RECEIVE_CURRENCY_FAILURE,
  REQUEST_CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, { type, currencies, error }) => {
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
  default: return state;
  }
};

export default wallet;
