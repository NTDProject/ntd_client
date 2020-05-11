import * as Types from './constants';
var initialState = null;

const users = (state = initialState, action) => {

  switch (action.type) {
    // update partner
    case Types.UPDATE_PARTNER:
      return state;
    case Types.UPDATE_PARTNER_SUCCESS:
      {
        state.token.user = Object.assign(state.token.user, action.partner);
        localStorage.setItem('sessionpartner', JSON.stringify(state));
        return state
      }
    case Types.UPDATE_PARTNER_FAIL:
      return action.msg
    // Sign in
    case Types.PARTNER_SIGNIN:
      return state
    case Types.PARTNER_SIGNIN_SUCCESS:
      return action.token
    case Types.PARTNER_SIGNIN_FAIL:
      return action.msg
    // update image
    case Types.PARTNER_CHANGE_IMAGE:
      return state;
    case Types.PARTNER_CHANGE_IMAGE_SUCCESS:
      {
        state.token.user.PartnerImage = action.link;
        localStorage.setItem('sessionpartner', JSON.stringify(state));
        return state
      }
    case Types.PARTNER_CHANGE_IMAGE_FAIL:
      return action.msg
    //
    case Types.MLTS:
      return action.partner

    case Types.SIGN_OUT:
      return null
      
    default:
      return state
  }
};


export default users;    