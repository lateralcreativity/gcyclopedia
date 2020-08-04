const igdb = require('igdb-api-node').default;
const client = igdb(`d62a1813a58d9c855b6a319db2ed0703`, {baseURL: 'https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com'})

export async function igdbGetGame(title) {
    try {
        const response = await client
            .fields('name,cover.image_id')
            .limit(50)
            .search(`${title}`)
            .request('/games');

        return response.data
    }
    catch (err) {
        return err
    }
}

export async function igdbGetGameDetails(id) {
    try {
        const response = await client
        .fields('name,cover.image_id,summary,genres.name,release_dates.human,videos.video_id')
        .where(`id = ${id}`)
        .request(`/games`)

        return response
    }
    catch (err) {
        return err
    }
}