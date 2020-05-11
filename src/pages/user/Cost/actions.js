import * as Types from './constants';


export const getData = (value,after) => {
    return {
        type : Types.GET_DATA_COST,
        payload: {value,after}
    }
}
export const deleteData = (value,after) => {
    return {
        type : Types.DELETE_DATA_COST,
        payload: {value,after}
    }
}


export const getDataCP = (after) => {
    return {
        type : Types.GET_DATA_CAMPAIGN,
        payload: after
    }
}
