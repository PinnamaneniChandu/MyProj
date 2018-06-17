import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const addEvidence = (data) => (dispatch) => {
    dispatch({type:"FETCH_EVIDENCES_FULFILLED",payload:data})      
}

export const clearEvidence = () => (dispatch) => {
    dispatch({type: "FETCH_EVIDENCES_CLEAR", payload: []})        
}