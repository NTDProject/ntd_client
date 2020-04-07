import { put, call, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux';

import * as actions from './actions'
import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathCampaignAction(){
    yield takeLatest (Types.GET_DATA_CAMPAIGN, getDataSaga)
    yield takeLatest (Types.TO_THEM_CHIEN_DICH, getThemChienDich)
}

function*  getThemChienDich({payload}){
    yield put (push(payload));
}

function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"chiendich/","GET",{});
    console.log(resp)
    if(resp.statusText == "OK") {
        yield call(payload.after,resp.data)
        yield put(actions.getDataSuccess(resp.data))
    }
    else{
        yield put(actions.getDataFalse(resp))
    }
}



export default wathCampaignAction;