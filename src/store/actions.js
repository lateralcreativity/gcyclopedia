import { igdbGetGame, igdbGetGameDetails } from '../utils/igdbwrapper';

export const GET_GAME_SUCCESS = 'GET_GAME_SUCCESS';
export const GET_GAME_FAILURE = 'GET_GAME_FAILURE';
export const GET_GAME_DETAILS = 'GET_GAME_DETAILS';

export const getGame = title => {
    return dispatch => {
        igdbGetGame(title)
            .then(response => {
                if (!response[0]) {
                    dispatch({ type: GET_GAME_FAILURE, payload: 'No game with that name was found!' })
                } else {
                    dispatch({ type: GET_GAME_SUCCESS, payload: response })
                }
            })
            .catch(error => {
                dispatch({ type: GET_GAME_FAILURE, payload: error })
            })
    }
}

export const getGameDetails = id => {
    return dispatch => {
        igdbGetGameDetails(id)
            .then(response => {
                dispatch({ type: GET_GAME_DETAILS, payload: response.data[0] })
            })
            .catch(error => {
                console.log(error)
            })
    }
}