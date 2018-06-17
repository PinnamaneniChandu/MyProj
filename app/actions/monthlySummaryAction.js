import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const fetchMontlySummary = (informationType) => (dispatch) => { 
  return axios.get(`${myConstClass.mymsg.API_HOST}/GetMonthlySummary/${informationType}`)
    .then(response => {
      dispatch({type:"FETCH_MONTLYSUMMARY_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_MONTLYSUMMARY_REJECTED",payload:err})
  })
}