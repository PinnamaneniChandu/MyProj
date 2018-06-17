import moment from 'moment-es6';

export function searchValueForName(data,name)
{
    return function(dispatch)
	{
    let returnData;
    if(data){
        data.map((nameValue)=>{ 
        if(nameValue.name===name)
        {            
            returnData=nameValue.value
        }
        })
    }    
    return returnData;  
    }
}

    /* for (var key in evidences) {
    console.log('I am here',key, evidences[key]);
    } */


    export function getAddressInList(data,evidenceType)
    {
        return function(dispatch)
        {
            let evidences=data.evidencedtls.evidenceList        
            let returnData;
            evidences.map((evidence)=>{
            if(evidence.evidenceType.value===evidenceType)
                {                        
                    let commonData=evidence.evidenceDataList;                                    
                    returnData=commonData;            
                }
        })
        return returnData;
        }
    }

    export function getEvidenceList(data,evidenceType)
    {
        return function(dispatch)
        {
            let evidences=data.evidencedtls.evidenceList        
            let returnData=[];
            evidences.map((evidence)=>{
            if(evidence.evidenceType.value===evidenceType)
                {                        
                    let commonData=evidence.evidenceDataList;                                            
                    returnData.push(commonData)
                }
        })
        return returnData;
        }
    }

    export function getARWorksSummary(data,evidenceType)
    {
        return function(dispatch)
        {
            let evidences=data.evidencedtls.evidenceList        
            let returnData;
            evidences.map((evidence)=>{
            if(evidence.evidenceType.value===evidenceType)
                {                        
                    let commonData=evidence.evidenceDataList;                                    
                    returnData=commonData;            
                }
        })
        return returnData;
        }
    }

    export function getSummaryList(data)
    {
        return function(dispatch)
        {
            let evidences=data.evidencedtls.evidenceList  

        return evidences;
        }
    }

    export function getPreviousSummary(arWorksEvidenceDataList){
        return function(dispatch){
        let returnData
    if(arWorksEvidenceDataList.length>0){
        arWorksEvidenceDataList.map((evidence)=>{
            for (var key in evidence) {
                if(key === 'evidenceDataList'){
                    evidence[key].map((nameValue)=>{
                        if(nameValue.name === 'currentOrPreviousMonth' && nameValue.value === 'previous') {
                            returnData = evidence[key]
                            return returnData;
                        }
                    })
                }
            }
        })
    }
    return returnData;
    }
    }
    export function getCurrentSummary(arWorksEvidenceDataList){
        return function(dispatch){
            let returnData
        if(arWorksEvidenceDataList.length>0){
            arWorksEvidenceDataList.map((evidence)=>{
                for (var key in evidence) {
                    if(key === 'evidenceDataList'){
                        evidence[key].map((nameValue)=>{
                            if(nameValue.name === 'currentOrPreviousMonth' && nameValue.value === 'current') {
                                returnData = evidence[key]
                                return returnData;
                            }
                        })
                    }
                }
            })
        }
        return returnData;
        }
    }

export function getInfoInList(data,evidenceType,evidenceTypeString,evidenceSubType)
{
    return function(dispatch)
    {
        let evidences=data.evidencedtls.evidenceList        
        let returnData;
        evidences.map((evidence)=>{
        if(evidence.evidenceType.value===evidenceType)
            {                        
                let commonData=evidence.evidenceDataList;                
                commonData.map((nameValue)=>{                
                if(nameValue.name===evidenceTypeString&&nameValue.value===evidenceSubType)
                {
                    returnData=commonData;
                }
            })
            }
    })
    return returnData;
    }
}

export function getPreferedList(data,evidenceType)
{
    return function(dispatch)
    {
        let evidences=data.evidencedtls.evidenceList        
        let returnData;
        evidences.map((evidence)=>{
        if(evidence.evidenceType.value===evidenceType)
            {                        
                let commonData=evidence.evidenceDataList;                
                commonData.map((nameValue)=>{                
                if(nameValue.name === "PreferredCommunicationMethod")
                {
                    returnData=nameValue.value;
                }
            })
            }
    })
    return returnData;
    }
}

export function getHHMembers(data){
    return function(dispatch){
        let HHMembers=[];
        
        data.personsDtls.personList.map((person)=>{
            let member={
                name:'',
                concernRoleID:'',
                dateOfBirth:'',
                isPrimary:'',
                gender:''
            };
            member.name=dispatch(searchValueForName(person.personDataList,'name'))
            member.concernRoleID=dispatch(searchValueForName(person.personDataList,'concernRoleID'))
            member.dateOfBirth=dispatch(searchValueForName(person.personDataList,'dateOfBirth'))
            member.isPrimary=dispatch(searchValueForName(person.personDataList,'isPrimary'))
            member.gender=dispatch(searchValueForName(person.personDataList,'gender'))
            HHMembers.push(member)
        })
        return HHMembers;
    }
}

export function addEvd(existingEvd,newEvd,evidenceType, monthName){
    return function(dispatch){
        let evdType=
            {
            evidenceType:evidenceType,
        }
        let month = {
            month : monthName,
        }
        newEvd.evidenceType=evdType.evidenceType
        newEvd.month = month.month
        existingEvd.push(newEvd)
    }
}


export function updateEvd(existingEvd,updEvd,evidenceType, monthName,index){
    return function(dispatch){
        let evdType=
            {
            evidenceType:evidenceType,
        }
        let month = {
            month : monthName,
        }
        updEvd.evidenceType=evdType.evidenceType
        updEvd.month = month.month
        existingEvd[index]=updEvd
    }
}

export function convertEvd(list){
    return function(dispatch){
        let covertList={list:[]};
        list.map((evidence)=>{
            let data={
                month:'',
                evidenceType:'',
                entries:[
                ]
            }
            data.evidenceType=evidence.evidenceType,
            data.month = evidence.month
            for (var key in evidence) {
                if(key !== 'month' && key !== 'evidenceType' && key !== 'evidenceName' && key!=='disabled' && key!=='index' && key!=='updateFlag')
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

export function addCT(existingList,CTName,CTData){
    return function(dispatch){
        if(CTData){
        let newCT={
            CTName:CTName,
            CTData:CTData
        }
        existingList.push(newCT)
    }
    }
}

export function getCT(existingList,CTName){
    return function(dispatch){
        existingList.map((CT)=>{
            if(CT.CTName===CTName)
                return CT.CTData
        })
    }
}

export function getStatus(lang, inputValue){
    return function(dispatch){
        if(inputValue === 'IAP'){
            return lang.IAP
        }else if(inputValue === 'EXMT'){
            return lang.EXMT
        }else if(inputValue === 'NSW'){
            return lang.NSW
        }else if(inputValue === 'IIP'){
            return lang.IIP
        }else if(inputValue === 'IAP'){
            return lang.IAP
        }else if(inputValue === 'IRP'){
            return lang.IRP
        }else if(inputValue === 'IAAP'){
            return lang.IAAP
        }else if(inputValue === 'RTW'){
            return lang.RTW
        }else if(inputValue === 'COMP'){
            return lang.COMP
        }else if(inputValue === 'NCM'){
            return lang.NCM
        }else if(inputValue === 'NCM1'){
            return lang.NCM1
        }else if(inputValue === 'NCM2'){
            return lang.NCM2
        }else if(inputValue === 'NCM3'){
            return lang.NCM3
        }else if(inputValue === 'EXAIAN'){
            return lang.EXAIAN
        }else if(inputValue === 'TEACASHEX'){
            return lang.TEACASHEX
        }else if(inputValue === 'EXEC'){
            return lang.EXEC
        }else if(inputValue === 'EXSNAP'){
            return lang.EXSNAP
        }else if(inputValue === 'EXFS'){
            return lang.EXFS
        }else if(inputValue === 'EXMF'){
            return lang.EXMF
        }else if(inputValue === 'EXDM'){
            return lang.EXDM
        }else if(inputValue === 'EXEH'){
            return lang.EXEH
        }else if(inputValue === 'EXPR'){
            return lang.EXPR
        }else if(inputValue === 'EXUN'){
            return lang.EXUN
        }else if(inputValue === 'EXED'){
            return lang.EXED
        }else if(inputValue === 'EXIC'){
            return lang.EXIC
        }else if(inputValue === 'EXIS'){
            return lang.EXIS
        }else if(inputValue === 'EXAL'){
            return lang.EXAL
        }else if(inputValue === 'TITLE_IT26001'){
            return lang.TITLE_IT26001
        }else if(inputValue === 'TITLE_IT26008'){
            return lang.TITLE_IT26008
        }else if(inputValue === 'TITLE_IT26017'){
            return lang.TITLE_IT26017
        }else if(inputValue === 'TITLE_IT26015'){
            return lang.TITLE_IT26015
        }else if(inputValue === 'TITLE_END_INCOME'){
            return lang.TITLE_END_INCOME
        }else if(inputValue === 'DISPLAY1_IT26001_END_INCOME'){
            return lang.DISPLAY1_IT26001_END_INCOME
        }
        else if(inputValue === 'DISPLAY1_IT26008_END_INCOME'){
            return lang.DISPLAY1_IT26008_END_INCOME
        }else if(inputValue === 'DISPLAY1_IT26017_END_INCOME'){
            return lang.DISPLAY1_IT26017_END_INCOME
        }else if(inputValue === 'DISPLAY1_IT26015_END_INCOME'){
            return lang.DISPLAY1_IT26015_END_INCOME
        }
        else if(inputValue === 'DISPLAY2_IT26017_END_INCOME'){
            return lang.DISPLAY2_IT26017_END_INCOME
        }
        else if(inputValue === 'DISPLAY2_IT26015_END_INCOME'){
            return lang.DISPLAY2_IT26015_END_INCOME
        }
        else if(inputValue === 'DISPLAY2_IT26008_END_INCOME'){
            return lang.DISPLAY2_IT26008_END_INCOME
        }
        
        else if(inputValue === 'TITLE_DT1'){
            return lang.TITLE_DT1
        }else if(inputValue === 'TITLE_DT2'){
            return lang.TITLE_DT2
        }else if(inputValue === 'TITLE_DT26301'){
            return lang.TITLE_DT26301
        }else if(inputValue === 'TITLE_EEFDT2'){
            return lang.TITLE_EEFDT2
        }else if(inputValue === 'TITLE_EEFDET0010'){
            return lang.TITLE_EEFDET0010
        }else if(inputValue === 'TITLE_DET0026008'){
            return lang.TITLE_DET0026008
        }else if(inputValue === 'TITLE_EEF01'){
            return lang.TITLE_EEF01
        }else if(inputValue === 'TITLE_ST3'){
            return lang.TITLE_ST3
        }else if(inputValue === 'TITLE_EEF02'){
            return lang.TITLE_EEF02
        }else if(inputValue === 'TITLE_EEF03'){
            return lang.TITLE_EEF03
        }else if(inputValue === 'TITLE_ST12'){
            return lang.TITLE_ST12
        }else if(inputValue === 'TITLE_ST5'){
            return lang.TITLE_ST5
        }else if(inputValue === 'TITLE_ST7'){
            return lang.TITLE_ST7
        }else if(inputValue === 'TITLE_EEFDET0017'){
            return lang.TITLE_EEFDET0017
        }else if(inputValue === 'TITLE_EEFDET0016'){
            return lang.TITLE_EEFDET0016
        }else if(inputValue === 'TITLE_EEFDET0021'){
            return lang.TITLE_EEFDET0021
        }else if(inputValue === 'TITLE_EEFDET0018'){
            return lang.TITLE_EEFDET0018
        }else if(inputValue === 'TITLE_EEFDET0019'){
            return lang.TITLE_EEFDET0019
        }else if(inputValue === 'TITLE_EEFDET0025'){
            return lang.TITLE_EEFDET0025
        }else if(inputValue === 'TITLE_EEFDET0027'){
            return lang.TITLE_EEFDET0027
        }else if(inputValue === 'TITLE_EEFDET0020'){
            return lang.TITLE_EEFDET0020
        }else if(inputValue === 'DISPLAY1_IT26001'){
            return lang.DISPLAY1_IT26001
        }else if(inputValue === 'DISPLAY1_IT26008'){
            return lang.DISPLAY1_IT26008
        }else if(inputValue === 'DISPLAY1_IT26017'){
            return lang.DISPLAY1_IT26017
        }else if(inputValue === 'AMOUNT'){
            return lang.AMOUNT
        }else if(inputValue === 'DISPLAY1_DT1'){
            return lang.DISPLAY1_DT1
        }else if(inputValue === 'DISPLAY1_DT2'){
            return lang.DISPLAY1_DT2
        }else if(inputValue === 'DISPLAY1_DT26301'){
            return lang.DISPLAY1_DT26301
        }else if(inputValue === 'DISPLAY1_EEFDT2'){
            return lang.DISPLAY1_EEFDT2
        }else if(inputValue === 'DISPLAY1_EEFDET0010'){
            return lang.DISPLAY1_EEFDET0010
        }else if(inputValue === 'DUE_DATE'){
            return lang.DUE_DATE
        }else if(inputValue === 'SCHOOL_ORGANIZATION'){
            return lang.SCHOOL_ORGANIZATION
        }else if(inputValue === 'NAME'){
            return lang.NAME
        }else if(inputValue === 'PERSON_CARE_FOR'){
            return lang.PERSON_CARE_FOR
        }else if(inputValue === 'PROGRAM_FACILITY_NAME'){
            return lang.PROGRAM_FACILITY_NAME
        }else if(inputValue === 'DISPLAY1_EEFDET0021'){
            return lang.DISPLAY1_EEFDET0021
        }else if(inputValue === 'DISPLAY1_EEFDET0018'){
            return lang.DISPLAY1_EEFDET0018
        }else if(inputValue === 'DISPLAY1_EEFDET0019'){
            return lang.DISPLAY1_EEFDET0019
        }else if(inputValue === 'DISPLAY1_EEFDET0020'){
            return lang.DISPLAY1_EEFDET0020
        }else if(inputValue === 'EMPLOYER'){
            return lang.EMPLOYER
        }else if(inputValue === 'HOURS'){
            return lang.HOURS
        }else if(inputValue === 'SUBMITTED'){
            return lang.SUBMITTED
        }else if(inputValue === 'END_OF_POSTPARTUM'){
            return lang.END_OF_POSTPARTUM
        }else if(inputValue === 'DISPLAY2_EEF01'){
            return lang.DISPLAY2_EEF01
        }else if(inputValue === 'DISPLAY2_ST3'){
            return lang.DISPLAY2_ST3
        }else if(inputValue === 'DISPLAY2_EEF02'){
            return lang.DISPLAY2_EEF02
        }else if(inputValue === 'DISPLAY2_EEF03'){
            return lang.DISPLAY2_EEF03
        }else if(inputValue === 'DISPLAY2_ST12'){
            return lang.DISPLAY2_ST12
        }else if(inputValue === 'DISPLAY2_ST5'){
            return lang.DISPLAY2_ST5
        }else if(inputValue === 'DISPLAY2_ST7'){
            return lang.DISPLAY2_ST7
        }else if(inputValue === 'ORGANIZATION'){
            return lang.ORGANIZATION
        }else if(inputValue === 'CLASS_NAME'){
            return lang.CLASS_NAME
        }else if(inputValue === 'HMIT1'){
            return lang.HMIT1
        }else if(inputValue === 'HMIT2'){
            return lang.HMIT2
        }else if(inputValue === 'HMIT3'){
            return lang.HMIT3
        }else if(inputValue === 'HMIT4'){
            return lang.HMIT4
        }else if(inputValue === 'HMIT5'){
            return lang.HMIT5
        }else if(inputValue === 'CHLD_EXEMP'){
            return lang.CHLD_EXEMP
        }
    }
}

export function getSubEvidenceList(inputSubEvidenceType, subType){
    return function(dispatch)
    {
        let parentEvidences = inputSubEvidenceType   
        let subEvidenceList=[];
        parentEvidences.map((eachEvidence)=>{
            eachEvidence.map((nameValue) => {
                if(nameValue.name === 'subType'){
                    if(nameValue.value === subType ){
                        subEvidenceList.push(eachEvidence)
                    }
                }
            })
        })
    return subEvidenceList
        }
    }
 /* dosomething(type){
                incomeUEIList = this.props.getSubEvidenceList(incomeList, type)
                console.log("incomeUEIList",incomeUEIList)
                incomeUEIList.map((evidenceData) =>{
                    otherEvidenceData = evidenceData
                    otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                    })
                    return otherEvidenceDisplayData;
            } */

    export function getFormattedDate(fdate){
        return function(dispatch)
        {
                let YYYY, DD, MM, formatedDate
                if(fdate !== '' && fdate !== null && fdate !== undefined){
                    YYYY = fdate.substr(0,4)
                    DD = fdate.substr(6,2)
                    MM = fdate.substr(4,2)
                }
                formatedDate = MM + '/' + DD + '/' + YYYY
                return formatedDate
            }
        }
export function getFormattedDateOfBirth(fdate){
    return function(dispatch){
        let YYYY, DD, MM, formatedDate
        if(fdate !== '' && fdate !== null && fdate !== undefined){
            YYYY = fdate.substr(0,4)
            MM = fdate.substr(5,2)
            DD = fdate.substr(8,2)
            formatedDate = MM + '/' + DD + '/' + YYYY
        }else{
            formatedDate=fdate
        }
        return formatedDate
    }
}

export function getMonth(fdate){
        let month
        if(fdate !== '' && fdate !== null && fdate !== undefined){
            month = moment(fdate).format('YYYY-MM-DD').substr(5,2)
      }else{
        month=fdate
        }
        return month
}

export function getYear(fdate){
        let year
        if(fdate !== '' && fdate !== null && fdate !== undefined){
            year = moment(fdate).format('YYYY-MM-DD').substr(0,4)
      }else{
        year=fdate
        }
        return year
}

export function isDatesInSeperateMonths(sdate, edate) {
    return function (dispatch) {
        let isInSepMonths = true
        let sMonth, eMonth, sYear, eYear
        sMonth = getMonth(sdate)
        sYear = getYear(sdate)
        eMonth = getMonth(edate)
        eYear = getYear(edate)
        if (sMonth === eMonth && sYear === eYear) { 
            return false 
        }
        return isInSepMonths
    }
}

export function dateToYYYYMMDD(fdate){
    return function(dispatch)
    {
            let date = fdate
            let YYYYMMDD = date.toString().replace(/-/g,"")
            return YYYYMMDD
        }
    }


    export function convertMonthNameToMonthNumber(monthName){
        return function(dispatch)
        {
            var d = Date.parse(monthName + "1, 2014");
            if(!isNaN(d)){
                return new Date(d).getMonth();
            }
            return -1;
            }
        }

