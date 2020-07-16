import { put, call, takeLatest } from 'redux-saga/effects'

import * as Types from './constants'
import callApiUnauthWithBody from "../../../../utils/apis/apiUnAuth"

function* wathUNGVIENDetailAction(){
    yield takeLatest (Types.GET_DATA_GROUP_DETAIL, getDataSaga)
    yield takeLatest (Types.SAVE_GROUP, saveSaga) 
}

function*  getDataSaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"group/"+payload.value.group_id,"GET",{});
    console.log("resp",resp)
    yield call(payload.after,resp.data)

}

function*  saveSaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"group/save","POST",payload.value);
    console.log("resp",resp)
    yield call(payload.after,resp.data)
    
}

export default wathUNGVIENDetailAction;