import { put, call, takeLatest } from 'redux-saga/effects'

import * as Types from './constants'
import callApiUnauthWithBody from "../../../../utils/apis/apiUnAuth"

function* wathUNGVIENDetailAction(){
    yield takeLatest (Types.GET_DATA_NOT_UNGVIEN, getDataSaga)
    yield takeLatest (Types.ADD_UNGVIEN, saveSaga)

}

function*  getDataSaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"ungvien/getUngVienByViTriChienDich/"+payload.value.chiendich_id,"GET",{});
    console.log("resp",resp)
    yield call(payload.after,resp.data)

}

function*  saveSaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"chiendich/add","POST",payload.value);
    if (resp.status){
        yield call(payload.after,resp.data)
    }

}

export default wathUNGVIENDetailAction;