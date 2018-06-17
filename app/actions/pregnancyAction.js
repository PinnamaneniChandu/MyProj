import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const pregnancyInformation = (data) => (dispatch) => {
    dispatch({type:"FETCH_PREGNANCY_PENDING"})
    return axios.post(`${myConstClass.mymsg.API_HOST}/address/AT1`, data)
    .then(response => {
        dispatch({type:"FETCH_PREGNANCYS_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_PREGNANCY_REJECTED",payload:err})
    })
}