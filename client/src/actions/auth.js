import {RSAA} from 'redux-api-middleware';

export const LOGIN_REQUEST = '@@jwt/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@jwt/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@jwt/LOGIN_FAILURE';

export const REGISTER_REQUEST = '@@jwt/REGISTER_REQUEST';
export const REGISTER_SUCCESS = '@@jwt/REGISTER_SUCCESS';
export const REGISTER_FAILURE = '@@jwt/REGISTER_FAILURE';

export const TOKEN_REQUEST = '@@jwt/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@jwt/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@jwt/TOKEN_FAILURE';

export const LOGOUT = 'LOGOUT';

export const logout = () => ({type: LOGOUT});

export const login = (username, password) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/obtain/',
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'},
        types: [
            LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
        ]
    }
});

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/refresh/',
        method: 'POST',
        body: JSON.stringify({refresh: token}),
        headers: {'Content-Type': 'application/json'},
        types: [
            TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
        ]
    }
});

export const register = (username, password) => ({
    [RSAA]: {
        endpoint: '/api/users/',
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'},
        types: [
            REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
        ]
    }
});
