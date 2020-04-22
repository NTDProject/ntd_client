import * as Types from './constants';



export const getData2 = (after) => {
    return {
        type : Types.GET_DATA_ANA,
        payload: {after}
    }
}

