import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

export function checkCustomerApi(username, password) {
    return callApiUnAuth(`signin`, 'POST', { username: username, password: password })
        .then(res => res)
        .catch(error => error.response.data);
}

export function* login( action ) {
    try {        
        const { user } = action
        const msg = yield call(checkCustomerApi, user.username, user.password)        
        if (msg.success === true) {            
            yield put(actions.loginSuccess(msg));
        } else {
            yield put(actions.loginFail(msg));
        }

    } catch (error) {
        yield put(actions.loginFail(error));
    }

}

function* watchCheckLogin() {
    yield takeLatest(Types.CHECK_CUSTOMER, login)
  }

export default watchCheckLogin;