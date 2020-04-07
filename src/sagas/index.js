import LoginSaga from '../pages/admin/Login/sagas';
import CampaignSaga from '../pages/user/Campaign/sagas';
import CampaignDetailSaga from '../pages/user/Campaign/CreateOrEdit/sagas';
import CampaignTranferSaga from '../pages/user/Campaign/Tranfer/sagas';
import CampaignUngVienSaga from '../pages/user/UngVien/sagas';
import CampaignAddUngVienSaga from '../pages/user/UngVien/Add/sagas';
import UngVienDetailSaga from '../pages/user/UngVien/CreateOrEdit/sagas';

import { fork } from 'redux-saga/effects'


export default function* IndexSaga () {  
  yield fork(LoginSaga);
  yield fork(CampaignSaga);
  yield fork(CampaignDetailSaga)
  yield fork(CampaignAddUngVienSaga)
  yield fork(UngVienDetailSaga)
  yield fork(CampaignUngVienSaga)
  yield fork(CampaignTranferSaga)
}