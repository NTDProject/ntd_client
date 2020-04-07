import * as Types from './constants';


export const getData = (value,after) => {
    return {
        type : Types.GET_DATA_NOT_UNGVIEN,
        payload: {value,after}
    }
}

export const save = (value,after) => {
    return {
        type : Types.ADD_UNGVIEN,
        payload: {value,after}
    }
}