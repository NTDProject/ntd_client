import { put, call, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux';

import * as actions from './actions'
import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathCampaignAction(){
    yield takeLatest (Types.GET_DATA_UNGVIEN, getDataSaga)
    yield takeLatest (Types.GET_DATA_CAMPAIGN, getDataCPSaga)
}



function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"ungvien/getUngVienByChienDich/"+payload.value,"GET",{});
    console.log(resp)
    if(resp.statusText == "OK") {
        yield call(payload.after,resp.data)
        yield put(actions.getDataSuccess(resp.data))
    }
    else{
        yield put(actions.getDataFalse(resp))
    }
}

function*  getDataCPSaga({payload}){
    console.log(payload)
    var resp = yield call(callApiUnauthWithBody,"chiendich/","GET",{});
    yield call(payload,resp.data)

}



export default wathCampaignAction;