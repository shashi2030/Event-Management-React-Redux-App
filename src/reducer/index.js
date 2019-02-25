import { combineReducers } from 'redux';
import itemReducer from './item.reducer' ;
import itemViewReducer from './item.view.reducer';
import itemEditReducer from './item.edit.reducer';

const rootReducer = combineReducers({
    itemReducer:itemReducer,
    viewItem:itemViewReducer,
    editItem:itemEditReducer
})

export default rootReducer;