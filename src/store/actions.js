import axiosWithAuth from '../utils/axiosWithAuth';

export const GET_GAME = 'GET_GAME';

export const getGame = title => {
    return dispatch => {
        dispatch({ type: GET_GAME })
        axiosWithAuth()
        .post(`/games`, {data: `fields games, where name = ${title};`})
        .then(response => {
            console.log(response)
            dispatch({ payload: response.data })
        })
        .catch(error => {
            console.log('Error', error)
        })
    }
}