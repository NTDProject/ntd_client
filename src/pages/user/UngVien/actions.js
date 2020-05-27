import * as Types from './constants';


export const getData = (after) => {
    return {
        type : Types.GET_DATA_UNGVIEN,
        payload: {after}
    }
}

export const getDataCP = (after) => {
    return {
        type : Types.GET_DATA_CAMPAIGN,
        payload: {after}
    }
}

export const deleteData = (value,after) => {
    return {
        type : Types.DELETE_UNGVIEN,
        payload: {value,after}
    }
}