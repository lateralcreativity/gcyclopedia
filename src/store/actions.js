import {axiosWithAuth} from '../utils/axiosWithAuth';

export const GET_GAME_SUCCESS = 'GET_GAME_SUCCESS';
export const GET_GAME_FAILURE = 'GET_GAME_FAILURE';

export const getGame = title => {
    return dispatch => {
        axiosWithAuth()
            .post(`/games/?search=${title}&fields=name,cover.image_id,summary`)
            .then(response => {
                console.log(response)
                if(!response.data[0]) {
                    dispatch({ type: GET_GAME_FAILURE, payload: 'No game with that name was found!'})
                } else {
                    console.log(response.data)
                    dispatch({ type: GET_GAME_SUCCESS, payload: response.data })
                }
            })
            .catch(error => {
                console.log('Error ->', error)
                dispatch({ type: GET_GAME_FAILURE, payload: error})
            })
    }
}