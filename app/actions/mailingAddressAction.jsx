import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'
export function fetchMailingAddress(userName){
	return function(dispatch)
	{
		dispatch({type:"FETCH_MAILINGADDRESS_PENDING"})
	axios.get(`${myConstClass.mymsg.API_HOST}/users/${userName}/mailingaddress`)
		.then((response)=>{			
			dispatch({type:"FETCH_MAILINGADDRESS_FULFILLED",payload:response.data})
		})
		.catch((err)=>{
			dispatch({type:"FETCH_MAILINGADDRESS_REJECTED",payload:err})
		})
	}
}

export function setAddress(address){
	return {
		type: "SET_ADDRESS",
		payload: name,
	}
}

export function setUserAge(age){
	return {
		type: "SET_USER_AGE",
		payload: age,
	}
}