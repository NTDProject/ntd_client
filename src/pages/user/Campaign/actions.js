import * as Types from './constants';


export const getData = (value,after) => {
    return {
        type : Types.GET_DATA_CAMPAIGN,
        payload: {value,after}
    }
}

export const deleteData = (value,after) => {
    return {
        type : Types.DELETE_DATA_CAMPAIGN,
        payload: {value,after}
    }
}

export const getDataSuccess = (data) => {
    return {
        type : Types.GET_DATA_CAMPAIGN_SUCCESS,
        payload: data 
    }
}

export const getDataFalse = (error) => {
    return {
        type : Types.GET_DATA_CAMPAIGN_FALSE,
        payload: error
    }
}

export const toThemChienDich = (value) => {
    return {
        type : Types.TO_THEM_CHIEN_DICH,
        payload : value
    }
}