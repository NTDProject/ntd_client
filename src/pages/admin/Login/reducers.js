import * as Types from './constants';
var initialState = null;

const users = (state = initialState, action) => {

    switch (action.type) {
        case Types.CHECK_LOGIN:
          return state
        case Types.LOGIN_SUCCESS:            
          return action.msg
        case Types.LOGIN_FAIL:
          return action.msg
        default:
          return state
      }
};


export default users;    