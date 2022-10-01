// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, email }) => {
  switch (type) {
  case GET_USER:
    return {
      ...state,
      email,
    };
  default:
    return state;
  }
};

export default user;
