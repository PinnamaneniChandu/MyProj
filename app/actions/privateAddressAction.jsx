import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'
export function fetchPrivateAddress(userName){
	return function(dispatch)
	{
		dispatch({type:"FETCH_PRIVATEADDRESS_PENDING"})
		axios.get(`${myConstClass.mymsg.API_HOST}/users/${userName}/address`)
		.then((response)=>{			
			dispatch({type:"FETCH_PRIVATEADDRESS_FULFILLED",payload:response.data})
		})
		.catch((err)=>{
			dispatch({type:"FETCH_PRIVATEADDRESS_REJECTED",payload:err})
		})
	}
}

export function setPrivateAddress(userName,address){
	return function(dispatch)
	{
		dispatch({type:"SET_PRIVATEADDRESS_REQUEST"})
		axios.post(`${myConstClass.mymsg.API_HOST}/users/${userName}/addaddress`,{
		"displayText" : "New Address",
		"addressType" : null
		})
		.then((response)=>{			
			dispatch({type:"SET_PRIVATEADDRESS_SUCCESS",payload:response.data})
		})
		.catch((err)=>{
			dispatch({type:"SET_PRIVATEADDRESS_REJECTED",payload:err})
		})
	}
}
