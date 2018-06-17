import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const workActivitDetailsPost = (formattedWorkActivityDetails) => (dispatch) => {
    dispatch({type:"FETCH_WORKACTIVITYDETAILS_PENDING"})
    return axios.post(`${myConstClass.mymsg.API_HOST}/getWorkActivityDetails`, formattedWorkActivityDetails.EEFARwoksCommonDataDetails)
    .then(response => {
        dispatch({type:"FETCH_WORKACTIVITYDETAILS_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_WORKACTIVITYDETAILS_REJECTED",payload:err})
    })
}

export const clearWorkActivityDetailsList = () => (dispatch) => {
    dispatch({type: "FETCH_WORKACTIVITYDETAILS_CLEAR", payload: []})        
}