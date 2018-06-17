import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const alcoholDrugInformation = (data) => (dispatch) => {
    dispatch({type:"FETCH_ALCOHOLDRUG_PENDING"})
    return axios.post(`${myConstClass.mymsg.API_HOST}/address/AT1`, data)
    .then(response => {
        dispatch({type:"FETCH_ALCOHOLDRUG_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_ALCOHOLDRUG_REJECTED",payload:err})
    })
}