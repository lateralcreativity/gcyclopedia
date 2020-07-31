import {axiosWithAuth} from '../utils/axiosWithAuth';

export const GET_GAME_SUCCESS = 'GET_GAME_SUCCESS';
export const GET_GAME_FAILURE = 'GET_GAME_FAILURE';
export const GET_GAME_DETAILS = 'GET_GAME_DETAILS';

export const getGame = title => {
    return dispatch => {
        axiosWithAuth()
            .post(`/games/?search=${title}&fields=name,cover.image_id,summary,genres.name,release_dates.human,videos.video_id`)
            .then(response => {
                if(!response.data[0]) {
                    dispatch({ type: GET_GAME_FAILURE, payload: 'No game with that name was found!'})
                } else {
                    dispatch({ type: GET_GAME_SUCCESS, payload: response.data })
                }
            })
            .catch(error => {
                console.log('Error ->', error)
                dispatch({ type: GET_GAME_FAILURE, payload: error})
            })
    }
}

export const getGameDetails = id => {
    return dispatch => {
        axiosWithAuth()
        .get(`/games/${id}?&fields=name,cover.image_id,summary,genres.name,release_dates.human,videos.video_id`)
        .then(response => {
            dispatch({ type: GET_GAME_DETAILS, payload: response.data[0] })
        })
        .catch(error => {
            console.log('Error ->', error)
        })
    }
}