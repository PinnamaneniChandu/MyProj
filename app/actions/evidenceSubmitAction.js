import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'
import {convertEvd} from './CommonActions'

export const submitEvidence = (list) => (dispatch) => {
  let evidences=dispatch(convertEvd(list))
  return axios.post(`${myConstClass.mymsg.API_HOST}/GetARWorksDisplayStatus`,evidences)
    .then(response => {
      dispatch({type:"FETCH_submitedEvidence_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_submitedEvidence_REJECTED",payload:err})
  })
}
export const clearResponse = () => (dispatch) => {
  dispatch({type:"FETCH_submitedEvidence_CLEAR",payload: ''})
}
