// import SigupSaga from '../pages/admin/SignUp/sagas';
import CampaignSaga from '../pages/user/Campaign/sagas';
import CampaignDetailSaga from '../pages/user/Campaign/CreateOrEdit/sagas';
import CampaignTranferSaga from '../pages/user/Campaign/Tranfer/sagas';
import CampaignUngVienSaga from '../pages/user/UngVien/sagas';
import CampaignAddUngVienSaga from '../pages/user/UngVien/Add/sagas';
import UngVienDetailSaga from '../pages/user/UngVien/CreateOrEdit/sagas';
import UngVienCreateSaga from '../pages/user/UngVien/Create/sagas';
import AnalysisSaga from '../pages/admin/HomePage/sagas';
import CostSaga from '../pages/user/Cost/sagas';
import CostAddfrom from '../pages/user/Cost/CreateOrEdit/sagas';
import GiaiDoan from '../pages/user/GiaiDoan/sagas';
import YeuCau from '../pages/user/YeuCau/sagas';
import ViTri from '../pages/user/ViTri/sagas';
import ViTriAdd from '../pages/user/ViTri/CreateOrEdit/sagas';
import YeuCauAdd from '../pages/user/YeuCau/CreateOrEdit/sagas';
import GiaiDoanAdd from '../pages/user/GiaiDoan/CreateOrEdit/sagas';
import Acc from '../pages/admin/Account/sagas';
import { fork } from 'redux-saga/effects';


export default function* IndexSaga () {  
  yield fork(AnalysisSaga);
  // yield fork(SigupSaga);
  yield fork(CampaignSaga);
  yield fork(CampaignDetailSaga);
  yield fork(CampaignAddUngVienSaga);
  yield fork(UngVienDetailSaga);
  yield fork(CampaignUngVienSaga);
  yield fork(CampaignTranferSaga);
  yield fork(CostSaga);
  yield fork(CostAddfrom);
  yield fork(GiaiDoan);
  yield fork(GiaiDoanAdd);
  yield fork(YeuCau);
  yield fork(YeuCauAdd);
  yield fork(ViTri);
  yield fork(ViTriAdd);
  yield fork(Acc);
  yield fork(UngVienCreateSaga);
}