import * as Types from './constants';


export const getData = (value,after) => {
    return {
        type : Types.GET_DATA_CAMPAIGN_DETAIL,
        payload: {value,after}
    }
}

export const getDataByViTri = (value,after) => {
    return {
        type : Types.GET_DATA_VT_DETAIL,
        payload: {value,after}
    }
}

export const getDataYC = (value,after) => {
    return {
        type : Types.GET_DATA_UV_YC,
        payload: {value,after}
    }
}



export const getDataSuccess = (data) => {
    return {
        type : Types.GET_DATA_CAMPAIGN_DETAIL_SUCCESS,
        payload: data 
    }
}

export const getDataFalse = (error) => {
    return {
        type : Types.GET_DATA_CAMPAIGN_DETAIL_FALSE,
        payload: error
    }
}

export const saveCampaign = (value,after) => {
    return {
        type : Types.SAVE_CAMPAIGN,
        payload: {value,after}
    }
}

export const checkSaveCampaign = (value,after) => {
    return {
        type : Types.CHECK_SAVE_CAMPAIGN,
        payload: {value,after}
    }
}