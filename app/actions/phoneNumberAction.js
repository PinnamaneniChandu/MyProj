import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const phoneNumberInformation = (data) => (dispatch) => {
    dispatch({type:"FETCH_PHONENUMBER_PENDING"})
    return axios.post(`${myConstClass.mymsg.API_HOST}/address/AT1`, data)
    .then(response => {
        dispatch({type:"FETCH_PHONENUMBER_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_PHONENUMBER_REJECTED",payload:err})
    })
}