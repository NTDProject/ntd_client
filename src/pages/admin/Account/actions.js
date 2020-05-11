import * as Types from './constants';

//////// update partner
export const updatePartner = (partner) => {
    return {
        type : Types.UPDATE_PARTNER,
        partner
    }
}

export const updatePartnerSuccess = (partner) => {
    return {
        type : Types.UPDATE_PARTNER_SUCCESS,
        partner
    }
}

export const updatePartnerFail = (msg) => {
    return {
        type : Types.UPDATE_PARTNER_FAIL,
        msg
    }
}
///////// signIn
export const signIn = (user) => {
    return {
        type : Types.PARTNER_SIGNIN,
        user
    }
}

export const signInSuccess = (token) => {
    return {
        type : Types.PARTNER_SIGNIN_SUCCESS,
        token
    }
}

export const signInFail = (msg) => {
    return {
        type : Types.PARTNER_SIGNIN_FAIL,
        msg
    }
}

//////// update image
export const updateImage = (partner) => {
    return {
        type : Types.PARTNER_CHANGE_IMAGE,
        partner
    }
}

export const updateImageSuccess = (link) => {
    return {
        type : Types.PARTNER_CHANGE_IMAGE_SUCCESS,
        link
    }
}

export const updateImageFail = (msg) => {
    return {
        type : Types.PARTNER_CHANGE_IMAGE_FAIL,
        msg
    }
}

///////// map localstorage to store
export const mlts = (partner) => {
    return {
        type : Types.MLTS,
        partner
    }
}

///////// signout
export const signout = () => {
    return {
        type : Types.SIGN_OUT
    }
}

