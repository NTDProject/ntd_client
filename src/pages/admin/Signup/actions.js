import * as Types from './constants';

export const save = (value,after) => {
    return {
        type : Types.SAVE_ACC,
        payload: {value,after}
    }
}