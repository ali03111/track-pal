import {types} from '../types';

const initial_state = {
  userData: {},
  token: '',
};

const actionMap = {
  [types.UpdateAuth]: (state, act) => {
    return {
      userData: act.payload.user,
      token: act.payload.token,
    };
  },
  [types.LogoutType]: (state, act) => {
    return {
      userData: {},
      token: '',
    };
  },
  [types.UpdateProfile]: (state, act) => ({
    ...state,
    userData: act.payload.data,
  }),
};

export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
