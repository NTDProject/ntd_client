import { put, call, takeLatest } from 'redux-saga/effects'

import * as actions from './actions'
import * as Types from './constants'
import callApiUnauthWithBody from "../../../utils/apis/apiUnAuth"

function* wathAnalysisAction(){
    yield takeLatest (Types.GET_DATA_ANA, getDataSaga2)
}

function*  getDataSaga2({payload}){
    var resp = yield call(callApiUnauthWithBody,"chiendich/chung/analysis","GET",{});
    yield call(payload.after,resp.data)
}



export default wathAnalysisAction;