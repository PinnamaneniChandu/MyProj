import axios from 'axios';
import * as myConstClass from '.././Labels.jsx'
import moment from 'moment-es6';

export const addAChildInformation = (data) => (dispatch) => {
    dispatch({type:"FETCH_ADDACHILD_PENDING"})
    return axios.post(`${myConstClass.mymsg.API_HOST}/address/AT1`, data)
      .then(response => {
        dispatch({type:"FETCH_ADDACHILD_FULFILLED",payload:response.data})
      })
      .catch(err=>{
      dispatch({type:"FETCH_ADDACHILD_REJECTED",payload:err})
    })
  }

  export const applyPersonMatch = (personData) => (dispatch) => {   
    return axios.post(`${myConstClass.mymsg.API_HOST}/PersonMatch`,personData)
      .then(response => {
        dispatch({type:"FETCH_PERSONMATCH_FULFILLED",payload:response.data})
      })
      .catch(err=>{
      dispatch({type:"FETCH_PERSONMATCH_REJECTED",payload:err})
    })
  }


  export const formatPerson = (personInfo) => (dispatch) => {
    let addPerson={};
    addPerson.evidenceType='EEFDET0023'
    let evidenceDataList=[];    
    for (var key in personInfo) {
        let nameValue={
            name:'',
            value:''
        }
        nameValue.name=key
        nameValue.value=personInfo[key]
        if(nameValue.name !== 'loading' && nameValue.name !== 'disabled'){
        evidenceDataList.push(nameValue)
        }
    }
    addPerson.evidenceDataList = evidenceDataList    
    return addPerson
  }

  export const formatPersonMatchData = (personMatch) => (dispatch) => {
    let result
    personMatch.commondatadtls.commonDataList.map((nameValue)=>{      
      if(nameValue.name === 'PersonIsExisted'){
      result = nameValue.value;
      }
    })
    return result;
  }

  export const clearPersonMatchData = () => (dispatch) => {
    dispatch({type:"FETCH_PERSONMATCH_CLEAR",payload:undefined})
  }
