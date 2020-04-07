import { combineReducers } from 'redux';
import users from '../pages/admin/Login/reducers';
import campaign from '../pages/user/Campaign/reducers';


const appReducers = combineReducers({
    users,
    campaign
});

export default appReducers;