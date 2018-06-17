import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'
export function authUser(){
	return function(dispatch)
	{
		dispatch({type:"FETCH_AUTHORIZEUSER_PENDING"})
	axios.get(`${myConstClass.mymsg.API_HOST}/auth`)
		.then((response)=>{	
			dispatch({type:"FETCH_AUTHORIZEUSER_FULFILLED",payload:response.data})
		})
		.catch((err)=>{
			dispatch({type:"FETCH_AUTHORIZEUSER_REJECTED",payload:err})
		})
	}
}

export function getServerDate(){
	return function(dispatch)
	{
		dispatch({type:"FETCH_SERVERDATE_PENDING"})
	axios.get(`${myConstClass.mymsg.API_HOST}/GetServerDate`)
		.then((response)=>{	
			dispatch({type:"FETCH_SERVERDATE_FULFILLED",payload:response.data})
		})
		.catch((err)=>{
			dispatch({type:"FETCH_SERVERDATE_REJECTED",payload:err})
		})
	}
}

export function getServerDateAvailable(date){
	return function(dispatch){
      let dateCommonDataList = date.commonDataList, curamServerDate
      if(dateCommonDataList !== '' && dateCommonDataList !== null && dateCommonDataList !== undefined){
        dateCommonDataList.map((res)=>{
          if(res.name ==='useServerDate'){
            if(res.value === 'Yes'){
              dateCommonDataList.map((res)=>{
                if(res.name === 'serverDate'){
                  curamServerDate = res.value
                }
              })
            }else if(res.value === 'No'){
              curamServerDate = moment().format('YYYYMMDD');
            }
          }
        })
        return curamServerDate;
      }
	}
}
export function fillServerFormattedDate(formattedDate){
	return function(dispatch)
	{
		dispatch({type:"FORMATED_SERVERDATE_FULFILLED",payload:formattedDate})
	}
}

export function getPendingAppDetails(){
	return function(dispatch)
	{
		dispatch({type:"FETCH_PENDINGAPP_PENDING"})
	axios.get(`${myConstClass.mymsg.API_HOST}/pendingApplicationDetails/GetPendingApplicationDetails`)
		.then((response)=>{	
			dispatch({type:"FETCH_PENDINGAPP_FULFILLED",payload:response.data})
		})
		.catch((err)=>{
			dispatch({type:"FETCH_PENDINGAPP_REJECTED",payload:err})
		})
	}
}

export function formatPendingAppDetails(pendingAppDetails){
	return function(dispatch)
	{	
		let returnValue='No'
		let isPendingApp=false;
		let anyCoverage=false;
		if(pendingAppDetails){
		pendingAppDetails.commondatadtls.commonDataList.map((nameValue)=>{			
			if(nameValue.name === 'PendingApplicationExisted' && nameValue.value === 'Yes'){
				isPendingApp = true;				
			}	
			if(nameValue.name === 'hasCoverage' && nameValue.value === 'Yes'){
				anyCoverage = true;				
			}			
		})
	}
	if(isPendingApp && anyCoverage){
		returnValue='Yes'
	}
		return returnValue;
	}
}