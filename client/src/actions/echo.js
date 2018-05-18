import {RSAA} from 'redux-api-middleware';
import {withAuth} from '../reducers'

export const ECHO_REQUEST = '@@echo/ECHO_REQUEST';
export const ECHO_SUCCESS = '@@echo/ECHO_SUCCESS';
export const ECHO_FAILURE = '@@echo/ECHO_FAILURE';
export const ADD_RECIPE_REQUEST = '@@echo/ADD_RECIPE_REQUEST';
export const ADD_RECIPE_SUCCESS = '@@echo/ADD_RECIPE_REQUEST';
export const ADD_RECIPE_FAILURE = '@@echo/ADD_RECIPE_FAILURE';

export const echo = (message) => ({
    [RSAA]: {
        endpoint: '/api/recipes/',
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            ECHO_REQUEST, ECHO_SUCCESS, ECHO_FAILURE
        ]
    }
});

export const addRecipe = (myRecipe) => ({
    [RSAA]: {
        endpoint: '/api/recipes/',
        method: 'POST',
        body: JSON.stringify(myRecipe),
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, ADD_RECIPE_FAILURE
        ]
    }
});
