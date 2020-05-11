import { combineReducers } from 'redux';
import campaign from '../pages/user/Campaign/reducers';
import partnerInfo from '../pages/admin/Account/reducers';




const appReducers = combineReducers({
    campaign,
    partnerInfo
});

export default appReducers;