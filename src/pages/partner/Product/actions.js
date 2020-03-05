import * as Types from './constants';

// fetch product
export const fetchProduct = (partnerId) => {
    return {
        type : Types.FETCH_PRODUCT,
        partnerId
    }
}

export const fetchProductSuccess = (listProduct) => {
    return {
        type : Types.FETCH_PRODUCT_SUCCESS,
        listProduct
    }
}

export const fetchProductFail = (msg) => {
    return {
        type : Types.FETCH_PRODUCT_FAIL,
        msg
    }
}

// Add Product
export const addProduct = (product) => {
    return {
        type : Types.ADD_PRODUCT,
        product
    }
}

export const addProductSuccess = (product) => {
    return {
        type : Types.ADD_PRODUCT_SUCCESS,
        product
    }
}

export const addProductFail = (msg) => {
    return {
        type : Types.ADD_PRODUCT_FAIL,
        msg
    }
}

// Delete Product
export const deleteProduct = (productId) => {
    return {
        type : Types.DELETE_PRODUCT,
        productId
    }
}

export const deleteProductSuccess = (msg) => {
    return {
        type : Types.ADD_PRODUCT_SUCCESS,
        msg
    }
}

export const deleteProductFail = (msg) => {
    return {
        type : Types.ADD_PRODUCT_FAIL,
        msg
    }
}

// Update Product
export const updateProduct = (product) => {
    return {
        type : Types.UPDATE_PRODUCT,
        product
    }
}

export const updateProductSuccess = (msg) => {
    return {
        type : Types.UPDATE_PRODUCT_SUCCESS,
        msg
    }
}

export const updateProductFail = (msg) => {
    return {
        type : Types.UPDATE_PRODUCT_FAIL,
        msg
    }
}