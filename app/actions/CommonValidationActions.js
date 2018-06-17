import axios from 'axios';
import React from 'react'
import * as myConstClass from '.././Labels.jsx'

export const validateStreet1 = (street1) => (dispatch)=>{
         if(street1==='' || street1===undefined || street1.trim()===''){
           return true;
         }
         return false
  }

  export const validateCity = (city) => (dispatch)=>{
    if(city==='' || city===undefined || city.trim()===''){
      return true;
    }
    return false;
}

export const validateState = (state) => (dispatch)=>{
  if(state==='' || state===undefined || state.trim()==='' || state === '--Please Select--'){
    return true;
  }
  return false
}

export const validateZipCode = (zip) => (dispatch)=>{
  if( zip.length<5 || isNaN(zip)===true || zip.trim()===''){
    return true;
  }
  return false
}

export const  validateAreaCode = (areaCode) => (dispatch)=>{
  if(isNaN(areaCode)===true || areaCode.length<3 || areaCode.trim()==='' ){
    return true;
  }
  return false
}

export const  validatePhoneNumber = (phoneNumber) => (dispatch)=>{
  if(  isNaN(phoneNumber)===true ||phoneNumber.length<7 ||phoneNumber.trim()===''){
    return true;
  }
  return false
}

export const  validateAreaCodeMandatory = (areaCode) => (dispatch)=>{
  if(areaCode==='' || areaCode===undefined ){
    return true;
  }
  return false
}

export const  validatePhoneNumberMandatory = (phoneNumber) => (dispatch)=>{
  if(phoneNumber==='' || phoneNumber===undefined){
    return true;
  }
  return false
}

export const  validateZipCodeMandatory = (zip) => (dispatch)=>{
  if(zip==='' || zip===undefined){
    return true;
  }
  return false
}
