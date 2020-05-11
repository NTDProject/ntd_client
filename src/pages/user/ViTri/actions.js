import * as Types from './constants';


export const getData = (after) => {
    return {
        type : Types.GET_DATA_COST,
        payload: {after}
    }
}

export const deleteData = (value,after) => {
    return {
        type : Types.DELETE_DATA_VT,
        payload: {value, after}
    }
}


