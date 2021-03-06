import { put, call, takeLatest } from 'redux-saga/effects'

import * as Types from './constants'
import callApiUnauthWithBody from "../../../../utils/apis/apiUnAuth"

function* wathUNGVIENDetailAction(){
    yield takeLatest (Types.GET_DATA_UNGVIEN_DETAIL, getDataSaga)
    yield takeLatest (Types.SAVE_UNGVIEN, saveSaga)
    yield takeLatest (Types.GET_DATA_HISTORY, historySaga)
    yield takeLatest (Types.GET_DATA_GIAIDOAN, getGiaiDoanSaga)
    yield takeLatest (Types.TRANFER_UNGVIEN, tranfer)
     
}

function*  getDataSaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"ungvien/getDetailUngVien/"+payload.value.ungvien_id+"/"+payload.value.chiendich_id,"GET",{});
    console.log("resp",resp)
    yield call(payload.after,resp.data)

}

function*  getGiaiDoanSaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"giaidoan/getallminusgiaidoan/"+payload.value.giaidoan,"GET",{});
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
    var resp = yield call(callApiUnauthWithBody,"ungvien/save","POST",payload.value);
    console.log("resp",resp)
    yield call(payload.after,resp.data)
    
}

function*  tranfer({payload}){
    var resp = yield call(callApiUnauthWithBody,"ungvien/tranfer","POST",payload.value);
    yield call(payload.after,resp.data)

}



export default wathUNGVIENDetailAction;