// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_USER } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER:
    return {
      ...state,
      user: { email: action.email },
    };
  default:
    return state;
  }
};

export default user;
