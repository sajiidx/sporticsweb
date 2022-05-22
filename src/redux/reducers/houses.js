import * as constants from '../constants';

const initialState = {
    houses: [],
    games: [],
    teams: [],
    matches: [],
    news: [],
    recentmatches: []
}

export const houses = (state = initialState, action) => {
    switch(action.type){
        case constants.ON_GAMES_LOADED:
            return{
                ...state,
                games: action.games
            }
        case constants.ON_HOUSES_LOADED:
            return{
                ...state,
                houses: action.houses
            }
        case constants.ON_TEAMS_LOADED:
            return{
                ...state,
                teams: action.teams
            }
        case constants.ON_MATCHES_LOADED:
            return{
                ...state,
                matches: action.matches
            }
        case constants.ON_NEWS_LOADED:
            return{
                ...state,
                news: action.news
            }
        case constants.ON_RECENT_MATCHES_LOADED:
            return{
                ...state,
                recentmatches: action.recentmatches
            }
        default:
            return state;
    }
}