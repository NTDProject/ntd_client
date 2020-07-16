import * as Types from './constants';


export const getData = (after) => {
    return {
        type : Types.GET_DATA_GROUP,
        payload: {after}
    }
}


export const deleteData = (value,after) => {
    return {
        type : Types.DELETE_GROUP,
        payload: {value,after}
    }
}