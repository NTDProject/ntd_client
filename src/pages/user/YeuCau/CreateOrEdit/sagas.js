import { put, call, takeLatest } from 'redux-saga/effects'

import * as Types from './constants'
import callApiUnauthWithBody from "../../../../utils/apis/apiUnAuth"

function* wathGiaiDoanDetailAction(){
    yield takeLatest (Types.SAVE_UNGVIEN, saveSaga)
}


function*  saveSaga({payload}){
    console.log(payload.value)
    var resp = yield call(callApiUnauthWithBody,"yeucau/save","POST",payload.value);
    yield call(payload.after,resp.data)

}

export default wathGiaiDoanDetailAction;