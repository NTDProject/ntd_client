import { put, call, takeLatest } from 'redux-saga/effects'

import * as Types from './constants'
import callApiUnauthWithBody from "../../../../utils/apis/apiUnAuth"

function* wathCampaignDetailAction(){
    yield takeLatest (Types.GET_DATA_UNGVIEN_VITRI, getDataSaga)
    
    yield takeLatest (Types.TRANFER_CHIENDICH, tranferSaga)
}

function*  getDataSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"ungvien/getAllUngVienAndViTriByChienDich/"+payload.value.chiendich_id,"GET",{});
    console.log(resp)
    yield call(payload.after,resp.data)

}

function*  tranferSaga({payload}){
    var resp = yield call(callApiUnauthWithBody,"chiendich/tranfer","POST",payload.value);
    console.log(resp)
    yield call(payload.after,resp.data)

}



export default wathCampaignDetailAction;