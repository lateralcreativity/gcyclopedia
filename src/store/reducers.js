import {
    GET_GAME_SUCCESS,
    GET_GAME_FAILURE
} from '../store/actions';

const initialState = {
    gameData: [],
    errorMessage: ''
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
        default:
            return state
    }
}