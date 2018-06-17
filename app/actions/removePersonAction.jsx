import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const removeMemberInformation = (data) => (dispatch) => {
    dispatch({type:"FETCH_REMOVEMEMBER_FULFILLED",payload:data})        
}