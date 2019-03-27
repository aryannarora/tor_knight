import {combineReducers} from 'redux';
import uploadReducer from './uploadReducer';
import downloadReducer from './downloadReducer';

export default combineReducers({
    uploadReducer,
    downloadReducer
});