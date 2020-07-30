import axios from 'axios';

// The Structure of a Request
// Most of the requests you will send to the API will use the POST method.
// The base URL you will make your requests to is: https://api-v3.igdb.com.
// You define which endpoint you wish to query by appending /{endpoint name} to the base URL eg. https://api-v3.igdb.com/games.
// You put your API key in the HEADER of your request.
// You use the BODY of your request to specify the fields you want to retrieve as well as any other filters, sorting etc

export const axiosWithAuth = () => {
    return axios.create({
        headers: {
            'Accept': 'application/json',
            'user-key': process.env.REACT_APP_USER_KEY
        }
    });
}