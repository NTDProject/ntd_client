import * as Types from './constants';


export const getData = (value,after) => {
    return {
        type : Types.GET_DATA_GROUP_DETAIL,
        payload: {value,after}
    }
}

export const save = (value,after) => {
    return {
        type : Types.SAVE_GROUP,
        payload: {value,after}
    }
}