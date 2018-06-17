import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const healthEducationInformation = (data) => (dispatch) => {
    dispatch({type:"FETCH_HEALTHEDUCATION_PENDING"})
    return axios.post(`${myConstClass.mymsg.API_HOST}/address/AT1`, data)
    .then(response => {
        dispatch({type:"FETCH_HEALTHEDUCATION_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_HEALTHEDUCATION_REJECTED",payload:err})
    })
}
