import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const fetchARWorksHome = () => (dispatch) => { 
    return axios.get(`${myConstClass.mymsg.API_HOST}/displayWorkActivitySummary`)
    .then(response => {
        dispatch({type:"FETCH_HOMEPAGE_FULFILLED",payload:response.data})
    })
    .catch(err=>{
        dispatch({type:"FETCH_HOMEPAGE_REJECTED",payload:err})
    })
}