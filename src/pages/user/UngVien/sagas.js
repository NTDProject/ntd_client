import { put, call, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux';

import * as actions from './actions'
import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathCampaignAction(){
    yield takeLatest (Types.GET_DATA_UNGVIEN, getDataSaga)
    yield takeLatest (Types.DELETE_UNGVIEN, deleteDataSaga)
    yield takeLatest (Types.GET_DATA_CAMPAIGN, getDataCPSaga)
    
}



function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"ungvien/","GET",{});
    yield call(payload.after,resp.data)
}

function*  getDataCPSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"chienDich/","GET",{});
    yield call(payload.after,resp.data)
}

function*  deleteDataSaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"ungvien/deleteUngVienOfChienDich/","POST",payload.value);
    console.log(resp)
    yield call(payload.after,resp.data)
}




export default wathCampaignAction;