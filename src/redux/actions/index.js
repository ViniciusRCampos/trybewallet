import currencyAPI from '../../helpers/currencyAPI';

// Coloque aqui suas actions
export const GET_USER = 'GET_USER';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY_SUCCESS = 'RECEIVE_CURRENCY_SUCCESS';
export const RECEIVE_CURRENCY_FAILURE = 'RECEIVE_CURRENCY_FAILURE';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const login = (email) => ({ type: GET_USER, email });

export const requestAPI = () => ({
  type: REQUEST_CURRENCY,
});

export const receiveAPISuccess = (currencies) => ({
  type: RECEIVE_CURRENCY_SUCCESS, currencies,
});

export const receiveAPIFailure = (error) => ({
  type: RECEIVE_CURRENCY_FAILURE, error,
});

export const addExpense = (expenses) => ({
  type: NEW_EXPENSE, expenses,
});

export const removeExpense = (expenses) => ({
  type: REMOVE_EXPENSE, expenses,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE, id,
});

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE, expense,
});

export function fetchCurrencyAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    try {
      const currencies = await currencyAPI();
      delete currencies.USDT;
      dispatch(receiveAPISuccess(Object.keys(currencies)));
    } catch (error) {
      dispatch(receiveAPIFailure(error));
    }
  };
}
