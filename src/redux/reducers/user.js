import * as constants from '../constants';
const initialState = {
    currentUser: null,
    loading: false,
}

export const user = (state = initialState, action) => {
    switch(action.type){
        case constants.ON_USER_LOADED:
            return{
                ...state,
                currentUser: action.user,
            }
        case constants.ON_USER_LOGIN:
            return {
                ...state,
                currentUser: action.user,
                loading: false,
            }
        case constants.ON_USER_SIGNUP:
            return {
                ...state,
                currentUser: action.user,
                loading: false,
            }
        case constants.ON_BUTTON_PRESSED:
            return{
                ...state,
                loading: true
            }
        case constants.ON_ACTION_FAILED:
            return{
                ...state,
                loading: false
            }
        case constants.CLEAR_DATA:
            return initialState;
        default:
            return state;
    }
}