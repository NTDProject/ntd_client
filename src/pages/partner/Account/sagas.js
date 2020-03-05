import { put, call, takeLatest } from 'redux-saga/effects'
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
import * as actions from './actions'
import * as Types from './constants'

 function fetchPartnerApi(customerID) {
    return callApiUnAuth(`partner/${customerID}`, 'GET', {})
        .then(res => res)
        .catch(error => error.response.data);
}

 function fetchCityApi() {
    return callApiUnAuth(`city`, 'GET', {})
        .then(res => res)
        .catch(error => error.response.data);
}

 function updatePartnerApi(partner) {
    return callApiUnAuth(`partner`, 'PUT', partner)
        .then(res => res)
        .catch(error => error.response.data);
}



 function* fetchPartner( action ) {
    try {        
        const { id } = action
        const partner = yield call(fetchPartnerApi, id)     
        const city = yield call(fetchCityApi)
           
        // if (msg.success === true) {            
            yield put(actions.fetchPartnerSuccess({partner: partner, city: city}));
        // } else {
            // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        yield put(actions.fetchPartnerFail(error));
    }

}


function* putPartner( action ) {
    try {        
        const { partner } = action
        // const partnerRes = 
        yield call(updatePartnerApi, partner)     
           
        // if (msg.success === true) {            
            yield put(actions.updatePartnerSuccess(partner));
        // } else {
            // yield put(actions.fetchPartnerFail(partner));
        // }

    } catch (error) {
        // yield put(actions.fetchPartnerFail(error));
    }

}

function* watchfetchPartner() {
    yield takeLatest(Types.FETCH_PARTNER, fetchPartner);
    yield takeLatest(Types.UPDATE_PARTNER, putPartner);
  }

export default watchfetchPartner;