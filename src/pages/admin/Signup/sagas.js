import { put, call, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux';

import * as actions from './actions'
import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathCampaignAction(){
    yield takeLatest (Types.SAVE_ACC, save)
}

function*  save({payload}){
    var resp = yield call(callApiUnauthWithBody,"user/","POST",payload.value);
    console.log(resp)
    yield call(payload.after,resp.data)
}




export default wathCampaignAction;