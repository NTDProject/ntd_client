import * as Types from './constants';


export const getData = (value,after) => {
    return {
        type : Types.GET_DATA_UNGVIEN,
        payload: {value,after}
    }
}

export const deleteData = (value,after) => {
    return {
        type : Types.DELETE_UNGVIEN,
        payload: {value,after}
    }
}

export const getDataSuccess = (data) => {
    return {
        type : Types.GET_DATA_UNGVIEN_SUCCESS,
        payload: data 
    }
}

export const getDataFalse = (error) => {
    return {
        type : Types.GET_DATA_UNGVIEN_FALSE,
        payload: error
    }
}

export const getDataCP = (after) => {
    return {
        type : Types.GET_DATA_CAMPAIGN,
        payload: after
    }
}

export const getDataSuccessCP = (data) => {
    return {
        type : Types.GET_DATA_CAMPAIGN_SUCCESS,
        payload: data 
    }
}

export const getDataFalseCP = (error) => {
    return {
        type : Types.GET_DATA_CAMPAIGN_FALSE,
        payload: error
    }
}