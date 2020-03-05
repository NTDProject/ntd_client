import { combineReducers } from 'redux';
import users from '../pages/admin/Login/reducers';
import partnerInfo from '../pages/partner/Account/reducers';
import product from '../pages/partner/Product/reducers';

const appReducers = combineReducers({
    users,
    partnerInfo,
    product
});

export default appReducers;