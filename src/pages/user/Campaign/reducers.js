import * as Types from './constants';

var initialState = {
  CampignList: []
};

const ProductItems = (state = initialState, action) => {

    switch (action.type) {
      case Types.GET_DATA_CAMPAIGN_SUCCESS:

      return{
        ...state,
        CampignList: action.payload
      }
      case Types.GET_DATA_CAMPAIGN_FALSE:


        return{
          ...state
        }
      
      default:
           return state
    }
};


export default ProductItems;    