import * as Types from './constants';


export const save = (value,after) => {
    return {
        type : Types.SAVE_UNGVIEN,
        payload: {value,after}
    }
}