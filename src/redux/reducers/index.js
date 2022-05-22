import { combineReducers } from 'redux';
import { houses } from './houses';
import { user } from './user';

const Reducers = combineReducers({
    user, houses
});

export default Reducers;