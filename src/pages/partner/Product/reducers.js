import * as Types from './constants';
var initialState = null;

const product = (state = initialState, action) => {

  switch (action.type) {
    case Types.FETCH_PRODUCT:
      return state
    case Types.FETCH_PRODUCT_SUCCESS:
      return action.listProduct
    case Types.FETCH_PRODUCT_FAIL:
      return action.msg

    case Types.ADD_PRODUCT:
      return state
    case Types.ADD_PRODUCT_SUCCESS:
      return state
    case Types.ADD_PRODUCT_FAIL:
      return state

    case Types.DELETE_PRODUCT:
      return state
    case Types.DELETE_PRODUCT_SUCCESS:
      return state
    case Types.DELETE_PRODUCT_FAIL:
      return state

    case Types.UPDATE_PRODUCT:
      return state
    case Types.UPDATE_PRODUCT_SUCCESS:
      return state
    case Types.UPDATE_PRODUCT_FAIL:
      return state
    default:
      return state
  }
};


export default product;    