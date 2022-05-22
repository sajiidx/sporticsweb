import * as constants from '../constants'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export function clearData() {
    return ((dispatch) => {
        dispatch({type: constants.CLEAR_DATA})
    })
}
export function logout(){
    return ((dispatch) => {
        firebase.auth().signOut()
        .then((response)=>{
            dispatch({type: constants.CLEAR_DATA})
        })
        .catch((err)=>{
            alert(err.message);
        })
    })
}
export function login(email, password){
    return ((dispatch) => {
        dispatch({type: constants.ON_BUTTON_PRESSED});
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((resp) => {
                const data = resp.data();
                dispatch({type: constants.ON_USER_LOGIN, user: data});
            }).catch((err) =>{
                alert(err.message);
                dispatch({type: constants.ON_ACTION_FAILED});
            })
        })
        .catch((error) =>{
            alert(error.message);
            dispatch({type: constants.ON_ACTION_FAILED});
        })
    });
}
export function signup(email, password, payload){
    return ((dispatch) => {
        dispatch({type: constants.ON_BUTTON_PRESSED});
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
            firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                ...payload,
                email
            })
            .then((resp) => {
                dispatch({type: constants.ON_USER_SIGNUP, user: {...payload, email}});
            }).catch((err) =>{
                alert(err.message);
                dispatch({type: constants.ON_ACTION_FAILED});
            })
        })
        .catch((error) =>{
            alert(error.message);
            dispatch({type: constants.ON_ACTION_FAILED});
        })
    })
}
export function loadUser(){
    return ((dispatch) => {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((resp) => {
            const data = resp.data();
            dispatch({type: constants.ON_USER_LOGIN, user: data});
        }).catch((err) =>{
            alert(err.message)
            dispatch({type: constants.ON_ACTION_FAILED});
        })
    })
}
export function loadGames(){
    return ((dispatch) => {
        firebase.firestore()
        .collection("games")
        .get()
        .then((response) => {
            const games = response.docs.map((doc)=>{
                return {cid: doc.id, ...doc.data()}
            })
            dispatch({type: constants.ON_GAMES_LOADED, games});
        })
        .catch((err) => alert(err.message))
    });
}
export function loadHouses(){
    return ((dispatch) => {
        firebase.firestore()
        .collection("houses")
        .get()
        .then((response) => {
            const data = response.docs.map((doc)=>{
                return {cid: doc.id, ...doc.data()}
            })
            dispatch({type: constants.ON_HOUSES_LOADED, houses: data});
        })
        .catch((err) => alert(err.message))
    });
}
export function loadTeams(){
    return ((dispatch) => {
        firebase.firestore()
        .collection("teams")
        .get()
        .then((snap) => {
            const data = snap.docs.map((doc)=>{
                return {cid: doc.id, ...doc.data()}
            })
            dispatch({type: constants.ON_TEAMS_LOADED, teams: data});
        }).catch((err) =>{
            alert(err.message);
        });
    });
}
export function loadMatches(){
    return ((dispatch) => {
        firebase.firestore()
        .collection("matches")
        .get()
        .then((snap) => {
            const data = snap.docs.map((doc)=>{
                return {cid: doc.id, ...doc.data()}
            })
            dispatch({type: constants.ON_MATCHES_LOADED, matches: data});
        }).catch((err) =>{
            alert(err.message);
        });
    });
}
export function loadNews(){
    return ((dispatch) => {
        firebase.firestore()
        .collection("news")
        .orderBy('creation', 'desc')
        .get()
        .then((snap) => {
            const data = snap.docs.map((doc)=>{
                return {cid: doc.id, ...doc.data()}
            })
            dispatch({type: constants.ON_NEWS_LOADED, news: data});
        }).catch((err) =>{
            alert(err.message);
        });
    });
}
export function fetchRecentMatches(n){
    return ((dispatch) => {
        firebase.firestore()
        .collection("matches")
        .orderBy("startTime", 'desc')
        .limit(n)
        .get()
        .then(snap => {
            const data = snap.docs.map(doc => (
                {cid: doc.id, ...doc.data()}
            ))
            dispatch({type: constants.ON_RECENT_MATCHES_LOADED, recentmatches: data})
        }).catch(err => alert(err.message))
    })
}
function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}