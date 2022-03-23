import axios from 'axios';

export const loginUser = (user) => async (dispatch) => {
    dispatch({type: "USER_LOGIN_REQUEST"});
    try {
        const response = await axios.post("http://localhost:4000/login",user);
        console.log(response.data);
        dispatch({type:"USER_LOGIN_SUCCESS", payload: response.data});
        localStorage.setItem('currentUser',JSON.stringify(response.data));           
        window.location.href = "/admin"; 
        
    } catch (error) {
        dispatch({type: "USER_LOGIN_FAIL", payload: error})
    }
    }
