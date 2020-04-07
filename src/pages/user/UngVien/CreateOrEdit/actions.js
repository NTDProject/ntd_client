import * as Types from './constants';


export const getData = (value,after) => {
    return {
        type : Types.GET_DATA_UNGVIEN_DETAIL,
        payload: {value,after}
    }
}

export const getDataSuccess = (data) => {
    return {
        type : Types.GET_DATA_UNGVIEN_DETAIL_SUCCESS,
        payload: data 
    }
}

export const getDataFalse = (error) => {
    return {
        type : Types.GET_DATA_UNGVIEN_DETAIL_FALSE,
        payload: error
    }
}

export const save = (value,after) => {
    return {
        type : Types.SAVE_UNGVIEN,
        payload: {value,after}
    }
}