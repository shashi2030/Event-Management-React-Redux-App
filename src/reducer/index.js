import { combineReducers } from 'redux';
import itemReducer from './item.reducer' ;

const rootReducer = combineReducers({
    itemReducer:itemReducer
})

export default rootReducer;