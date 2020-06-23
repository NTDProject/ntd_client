import { put, call, takeLatest } from 'redux-saga/effects'

import * as Types from './constants'
import callApiUnauthWithBody from "../../../../utils/apis/apiUnAuth"

function* wathCampaignDetailAction(){
    yield takeLatest (Types.GET_DATA_CAMPAIGN_DETAIL, getDataSaga)
    yield takeLatest (Types.SAVE_CAMPAIGN, saveSaga)
    yield takeLatest (Types.CHECK_SAVE_CAMPAIGN, checkSaveSaga)
    yield takeLatest (Types.GET_DATA_UV_YC, getDataYCSaga)
}

function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"chiendich/"+payload.value,"GET",{});
    console.log(resp)
    yield call(payload.after,resp.data)

}

function*  getDataYCSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"ungvien/getUngVienByViTriChienDichYeuCau","POST",payload.value);
    console.log(resp)
    yield call(payload.after,resp.data)

}

function*  saveSaga({payload}){

    var resp = yield call(callApiUnauthWithBody,"chiendich/save","POST",payload.value);
    console.log(resp)
    yield call(payload.after,resp.data)
}

function*  checkSaveSaga({payload}){
    
    var resp = yield call(callApiUnauthWithBody,"chiendich/checkSave","POST",payload.value);
    console.log(resp)
    yield call(payload.after,resp.data)
}

export default wathCampaignDetailAction;