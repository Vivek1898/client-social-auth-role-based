import { combineReducers } from 'redux'
import UserSlice from '../slices/UserSlice'
import StaffSlice from "../slices/StaffSlice";
// Main Reducer
const reducer = combineReducers({
    // here we will be adding reducers
    user: UserSlice,
    staff: StaffSlice
});

export default reducer;