import { put, call, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux';

import * as actions from './actions'
import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathCampaignAction(){
    yield takeLatest (Types.GET_DATA_GROUP, getDataSaga)
    yield takeLatest (Types.DELETE_GROUP, deleteDataSaga)   
}



function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"group/","GET",{});
    console.log("saga")
    yield call(payload.after,resp.data)
}

function*  deleteDataSaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"group/delete/","POST",payload.value);
    console.log(resp)
    yield call(payload.after,resp.data)
}




export default wathCampaignAction;