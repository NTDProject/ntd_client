import * as Types from './constants';


export const getData = (value,after) => {
    return {
        type : Types.GET_DATA_UNGVIEN_VITRI,
        payload: {value,after}
    }
}

export const tranfer = (value,after) => {
    return {
        type : Types.TRANFER_CHIENDICH,
        payload: {value,after}
    }
}

