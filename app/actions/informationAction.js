import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export const fetchContact = () => (dispatch) => { //http://localhost:8080/Rest/v1
  return axios.get(`${myConstClass.mymsg.API_HOST}/informations/ContactDetails`)
    .then(response => {
      dispatch({type:"FETCH_CONTACT_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_CONTACT_REJECTED",payload:err})
  })
}


export const validateAddress = (addressData) => (dispatch) => {
  return axios.post(`${myConstClass.mymsg.API_HOST}/ValidateAddress`,addressData)
    .then(response => {
      dispatch({type:"FETCH_VALIDATEADDRESS_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_VALIDATEADDRESS_REJECTED",payload:err})
  })
}

export const updateAddress = (addressAndPersons) => (dispatch) => {
  return axios.post(`${myConstClass.mymsg.API_HOST}/UpdateEvidence`,addressAndPersons)
    .then(response => {  
      dispatch({type:"FETCH_UPDATEADDRESS_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_UPDATEADDRESS_REJECTED",payload:err})
  })
}

export const updateEmailAddress = (emailAddressData) => (dispatch) => {
  return axios.post(`${myConstClass.mymsg.API_HOST}/UpdateEvidence`,emailAddressData)
    .then(response => {    
      dispatch({type:"FETCH_EMAILADDRESS_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_EMAILADDRESS_REJECTED",payload:err})
  })
}

export const updatePhoneNumber = (phoneNumberDetails) => (dispatch) => {
  return axios.post(`${myConstClass.mymsg.API_HOST}/UpdateEvidence`,phoneNumberDetails)
    .then(response => {    
      dispatch({type:"FETCH_PHONENUMBER_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_PHONENUMBER_REJECTED",payload:err})
  })
}
export const updatePreferredContact = (preferredContactDetails) => (dispatch) => {
  return axios.post(`${myConstClass.mymsg.API_HOST}/UpdateEvidence`,preferredContactDetails)
    .then(response => {    
      dispatch({type:"FETCH_PREFERRED_CONTACT_FULFILLED",payload:response.data})
    })
    .catch(err=>{
    dispatch({type:"FETCH_PREFERRED_CONTACT_REJECTED",payload:err})
  })
}

export const clearAddressOperation = () => (dispatch) => {
    dispatch({type:"FETCH_UPDATEADDRESS_CLEAR",payload:''})
}
export const clearEmailAddressOperation = () => (dispatch) => {
  dispatch({type:"FETCH_EMAILADDRESS_CLEAR",payload:''})
}
export const clearPhoneNumberOperation = () => (dispatch) => {
  dispatch({type:"FETCH_PHONENUMBER_CLEAR",payload:''})
}
export const clearContact = () => (dispatch) => {
  dispatch({type:"FETCH_CONTACT_CLEAR",payload:''})
}
export const clearPrefferedContact = () => (dispatch) => {
  dispatch({type:"FETCH_PREFFERED_CONTACT_CLEAR",payload:''})
}
