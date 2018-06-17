import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const fetchMembers = () => (dispatch) => {
  return axios.get(`${myConstClass.mymsg.API_HOST}/members`)
    .then(response => {
      dispatch({type:"FETCH_HHMEMBERS_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_HHMEMBERS_REJECTED",payload:err})
  })
}

export const setDOB=(dob) =>(dispatch)=>{
  dispatch({type:"ADD_DOB_FULFILLED",payload:dob})
}
