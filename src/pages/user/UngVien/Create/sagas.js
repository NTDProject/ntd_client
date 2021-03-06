import { put, call, takeLatest } from 'redux-saga/effects'

import * as Types from './constants'
import callApiUnauthWithBody from "../../../../utils/apis/apiUnAuth"

function* wathUNGVIENDetailAction(){
    yield takeLatest (Types.GET_DATA_UNGVIEN_DETAIL, getDataSaga)
    yield takeLatest (Types.SAVE_UNGVIEN, saveSaga)
    yield takeLatest (Types.GET_DATA_HISTORY, historySaga)
}

function*  getDataSaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"ungvien/getDetailUngVien/"+payload.value.ungvien_id+"/"+payload.value.chiendich_id,"GET",{});
    console.log("resp",resp)
    yield call(payload.after,resp.data)

}

function*  historySaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"ungvien/history","POST",payload.value);
    yield call(payload.after,resp.data)

}

function*  saveSaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"ungvien/saveUvVtCd","POST",payload.value);
    console.log("resp",resp)
    yield call(payload.after,resp.data)

}

export default wathUNGVIENDetailAction;