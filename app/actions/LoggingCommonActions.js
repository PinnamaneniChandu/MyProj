import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'

export function addPageLoggingInfo(existingPageDetails,userName,pageName,transactionDateTime,ipAddress){
    return function(dispatch){
        //dispatch(getIpAddress())
       /* if(ipAddress.trim()=="" || ipAddress.trim().length==0){
            ipAddress = "Ip Address not retrived";
        }
       */
       
        let newPageDetails={
            userName:userName,
            pageName:pageName,
            transactionDateTime:transactionDateTime,
            ipAddress:ipAddress
        }
        existingPageDetails.push(newPageDetails)
        
    }
}
export function addPageLoggingInfo1(existingPageDetails,userName,pageName,transactionDateTime,requestTime,responseTime,sessionTime){
    return function(dispatch){
        let newPageDetails={
            userName:userName,
            pageName:pageName,
            transactionDateTime:transactionDateTime,
            sessionTime:sessionTime,
            requestTime:requestTime,
            responseTime:responseTime
        }
        existingPageDetails.push(newPageDetails)
        
    }
}
export function getIpAddress(){
    return function(dispatch){
    axios.get(`https://api.ipify.org/`)
    .then(response => {
        dispatch({type:"FETCH_IPADDRESS_FULFILLED",payload:response.data})
    })
    .catch(err=>{
       dispatch({type:"FETCH_IPADDRESS_REJECTED",payload:err}) 
  })
    }
}      

export function convertPageDetails(list){
    return function(dispatch){
        let covertList={list:[]};
        list.map((evidence)=>{
            let data={
                month:'',
                evidenceType:'',
                entries:[
                ]
            }
            data.evidenceType='PDC0000261',
            data.month = '10'
            for (var key in evidence) {
                if(key !== 'month' && key !== 'evidenceType' && key !== 'evidenceName' && key!=='disabled' && key!=='index')
                {                  
                    let nameValue={
                        name:'',
                        value:''
                    }
                    nameValue.name=key
                    nameValue.value=evidence[key]
        
                if(nameValue.value!=undefined){
                    data.entries.push(nameValue)
                }
            }
            }
            covertList.list.push(data)
        })
        return covertList
    }
}
export const submitPageDetails = (list) => (dispatch) => {
    let pageDetails=dispatch(convertPageDetails(list))
    return axios.post(`${myConstClass.mymsg.API_HOST}/SendUserLogInfo`,pageDetails)
      .then(response => {
        dispatch({type:"FETCH_submitedEvidence_FULFILLED",payload:response.data})
      })
      .catch(err=>{
      dispatch({type:"FETCH_submitedEvidence_REJECTED",payload:err})
    })
  }

  

  export const clearPageDetailsResponse = () => (dispatch) => {
    dispatch({type:"FETCH_PAGEDETAILS_CLEAR",payload: []}) 
  }
  export const setRequestTime = (reqeustTime) => (dispatch) => {
    dispatch({type:"FETCH_REQUEST_TIME",payload:reqeustTime}) 
  }
  export const setSessionTime = (sessionTime) => (dispatch) => {
    dispatch({type:"FETCH_SESSION_TIME",payload:sessionTime}) 
  }
  export const setStartSessionTime = (sessionTime) => (dispatch) => {
    dispatch({type:"FETCH_START_SESSION_TIME",payload:sessionTime}) 
  }
  export const setResponseTime = (responseTime) => (dispatch) => {
    dispatch({type:"FETCH_RESPONSE_TIME",payload:responseTime}) 
  }