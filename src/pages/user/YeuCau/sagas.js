import { put, call, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux';

import * as actions from './actions'
import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathGiaiDoannAction(){
    yield takeLatest (Types.GET_DATA_COST, getDataSaga)
    yield takeLatest (Types.DELETE_DATA_COST, deleteDataSaga)
}

function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"yeucau/getall","GET",{});
    console.log(resp)
    yield call(payload.after,resp.data)
}

function*  deleteDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"yeucau/delete","POST",payload.value);
    yield call(payload.after,resp.data)
}




export default wathGiaiDoannAction;