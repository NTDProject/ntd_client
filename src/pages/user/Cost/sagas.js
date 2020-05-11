import { put, call, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux';

import * as actions from './actions'
import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathCampaignAction(){
    yield takeLatest (Types.GET_DATA_COST, getDataSaga)
    yield takeLatest (Types.GET_DATA_CAMPAIGN, getDataCPSaga)
    yield takeLatest (Types.DELETE_DATA_COST, deleteDataSaga)
}



function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"chiphi/getByChienDich/"+ payload.value,"GET",{});
    yield call(payload.after,resp.data)
}

function*  deleteDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"chiphi/deleteChiPhiOfChienDich/","POST",payload.value);
    yield call(payload.after,resp.data)
}

function*  getDataCPSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"chiendich/","GET",{});
    yield call(payload,resp.data)

}



export default wathCampaignAction;