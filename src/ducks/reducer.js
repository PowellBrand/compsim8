import axios from 'axios';


const initialState = {
    user: {}
}

const GET_USER = 'GET_USER';


export function getUserInfo(){
    let userData = axios.get('/auth/me').then( res => {
        return res.data;
    })
    return {
        type: GET_USER,
        payload: userData
    }
}


export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return Object.assign({}, state, {user: action.payload})
        default:
            return state;
    }
}