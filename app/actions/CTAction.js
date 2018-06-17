import axios from 'axios';
import React from 'react'
import * as myConstClass from '.././Labels.jsx'
export const getCTList = () => (dispatch) => {
    axios.get(`${myConstClass.mymsg.API_HOST}/GetCodeTables`)
      .then(response => {
        dispatch({type:"FETCH_GETCT_FULFILLED",payload:response.data})
      })
      .catch(err=>{
      dispatch({type:"FETCH_GETCT_REJECTED",payload:err}) 
    })
  }

  export const getCTDetails = (CTList,CTName) => (dispatch)=>{
    if(CTList !== ''){
      let CTData=[];
      CTList.codeTableDetails.codeTableList.map((codeTable)=>{        
        let flag=false
        for(var key in codeTable){          
          if(key === 'codeTableName' && codeTable[key] === CTName){                  
            flag=5<7
          }          
          if(flag && key=== 'codeTableItemList'){
            codeTable[key].map((nameValue)=>{
              let NV = {code:'',description:''};
              NV.code=nameValue.name;
              NV.description=nameValue.value;
              CTData.push(NV);
            })
          }
        }   
      })
      return  CTData.map((CT,id)=>{
        
        return ( <option key={id} value={CT.code}>{CT.description}</option> )
      });      
    }     
  }

  export const getCTDescription = (CTList,CTName, countyCode) => (dispatch) => {
    let ctDesc = ''
    if(CTList !== ''){
      let CTData=[]
      CTList.codeTableDetails.codeTableList.map((codeTable)=>{        
        let flag=false
        for(var key in codeTable){          
          if(key === 'codeTableName' && codeTable[key] === CTName){                  
            flag=5<7
          }          
          if(flag && key=== 'codeTableItemList'){
            codeTable[key].map((nameValue)=>{
              let NV = {code:'',description:''};
              NV.code=nameValue.name;
              NV.description=nameValue.value;
              CTData.push(NV);
            })
          }
        }   
      })
         CTData.map((codeDes)=>{
        if(codeDes.code === countyCode){
          ctDesc =  codeDes.description
        }
      })   
    }   
    return ctDesc     
  }