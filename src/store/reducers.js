import {
    GET_GAME_SUCCESS,
    GET_GAME_FAILURE,
    GET_GAME_DETAILS
} from '../store/actions';

const initialState = {
    gameData: [],
    errorMessage: '',
    gameDetails: {}
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_GAME_SUCCESS:
            return {
                ...state,
                gameData: [...action.payload],
                errorMessage: ''
            }
        case GET_GAME_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            }
        case GET_GAME_DETAILS:
            return {
                ...state,
                gameDetails: action.payload
            }
        default:
            return state
    }
}