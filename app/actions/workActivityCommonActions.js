import React from 'react'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'

function getTitle(lang, inputValue){

        if(inputValue === 'DT1'){
            return lang.DT1
        }else if(inputValue === 'DT2'){
            return lang.DT2
        }else if(inputValue === 'DT26301'){
            return lang.DT26301
        }else if(inputValue === 'EEFDT2'){
            return lang.EEFDT2
        }else if(inputValue === 'EEFDET0010'){
            return lang.EEFDET0010
        }else if(inputValue === 'EEF01'){
            return lang.EEF01
        }else if(inputValue === 'ST3'){
            return lang.ST3
        }else if(inputValue === 'EEF02'){
            return lang.EEF02
        }else if(inputValue === 'EEF03'){
            return lang.EEF03
        }else if(inputValue === 'ST12'){
            return lang.ST12
        }else if(inputValue === 'ST5'){
            return lang.ST5
        }else if(inputValue === 'ST7'){
            return lang.ST7
        }else if(inputValue === 'IT26001'){
            return lang.IT26001
        }else if(inputValue === 'IT26008'){
            return lang.IT26008
        }else if(inputValue === 'IT26017'){
            return lang.IT26017
        }else if(inputValue === 'IT26015'){
            return lang.IT26015
        }else if(inputValue === 'DET0026008'){
            return lang.DET0026008
        }else if(inputValue === 'EEFDET0027'){
            return lang.EEFDET0027
        }
    }

// Formateed Date function

function getFormattedDate(fdate){
    let YYYY, DD, MM, formatedDate
    if(fdate !== '' && fdate !== null && fdate !== undefined){
        YYYY = fdate.substr(0,4)
        DD = fdate.substr(6,2)
        MM = fdate.substr(4,2)
        formatedDate = MM + '/' + DD + '/' + YYYY
    }else{
        formatedDate=fdate
    }
    return formatedDate
}

function getcommonData(evidenceDataList){
    let fromDateValue, toDate, city, state, street1, street2, zip, areaCode, phoneNumber, comments
        evidenceDataList.map((nameValue)=>{ 
            if(nameValue.name==="startDate" || nameValue.name==="studentStartDate"){            
                fromDateValue =  getFormattedDate(nameValue.value)
            }else if(nameValue.name==="endDate" || nameValue.name==="studentEndDate"){
                toDate = getFormattedDate(nameValue.value)
            }else if(nameValue.name==="city"){
                city = nameValue.value
            }else if(nameValue.name==="state"){
                state = nameValue.value
            }else if(nameValue.name==="street1"){
                street1 = nameValue.value
            }else if(nameValue.name==="street2"){
                    street2 = nameValue.value
            }else if(nameValue.name==="zip"){
                zip = nameValue.value
            }else if(nameValue.name==="areaCode" || nameValue.name==="phoneAreaCode"){
                areaCode = nameValue.value
            }else if(nameValue.name==="phoneNumber"){
                phoneNumber = nameValue.value
            }else if(nameValue.name==="comments"){
                comments = nameValue.value
            }
        })

    let commonData = {
        fromDateValue : fromDateValue,
        toDate: toDate, 
        city: city,
        state: state, 
        street1: street1, 
        street2: street2, 
        zip: zip, 
        areaCode: areaCode, 
        comments: comments, 
        phoneNumber: phoneNumber
    }
    return commonData
}




export function jobSearchDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{
    let jobContact, programName, contactName, hours, index, receiveHelpJobSearch, commonData
        evidenceList.map((evidenceDataList) => {
            commonData = getcommonData(evidenceDataList.evidenceDataList)
            evidenceDataList.evidenceDataList.map((nameValue)=>{ 
                if(nameValue.name==="numberOfJobContact"){
                    jobContact = nameValue.value
                }else if(nameValue.name==="programName"){
                    programName = nameValue.value
                }else if(nameValue.name==="contactName"){
                    contactName = nameValue.value
                }else if(nameValue.name==="receiveHelpJobSearch"){
                    receiveHelpJobSearch = nameValue.value
                }
            })
        }
    )
    let returnDisplayData =	    
        <div key={index} className='annualSummaryDiv '>
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.TYPE}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{lang.EEFDET0021}</p>
				</div>
			</div>
            <div className="blockUnderline"></div>
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.FROM_DATE}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{commonData.fromDateValue}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.TO_DATE}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{commonData.toDate}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.JOB_CONTACTS}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{jobContact}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.RECEIVED_HELP}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{receiveHelpJobSearch}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.PROGRAM_NAME}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{programName}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.CONTACT_NAME}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{contactName}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.ADDRESS}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{commonData.street1} {commonData.street2} {commonData.city} {commonData.state} {commonData.zip}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.PHONE_NUMBER}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
	                <p>{commonData.areaCode}-{commonData.phoneNumber}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.STATUS} </p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{lang.SUBMITTED}</p>
				</div>
			</div>                 
        </div>	
    return returnDisplayData;  
} 
}   

export function jobSearchTrainingDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{
    let  programName, contactName,index, hours, commonData

        evidenceList.map((evidenceDataList) => {
            commonData = getcommonData(evidenceDataList.evidenceDataList)
            evidenceDataList.evidenceDataList.map((nameValue)=>{ 
                if(nameValue.name==="programName"){
                    programName = nameValue.value
                }else if(nameValue.name==="contactName"){
                    contactName = nameValue.value
                }else if(nameValue.name==="hours"){
                    hours = nameValue.value
                }
            })
        }
    )
    let returnDisplayData =
    <div key={index} className='annualSummaryDiv'>
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.TYPE}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{lang.EEFDET0018}</p>
				</div>
			</div>
            <div className="blockUnderline"></div>
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.FROM_DATE}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{commonData.fromDateValue}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.TO_DATE}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{commonData.toDate}</p>
				</div>
			</div>

			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.PROGRAM_NAME}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{programName}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.CONTACT_NAME}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{contactName}</p>
				</div>
			</div>
								
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.HOURS}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{hours}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.ADDRESS}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{commonData.street1} {commonData.street2} {commonData.city} {commonData.state} {commonData.zip}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.PHONE_NUMBER}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{commonData.areaCode}-{commonData.phoneNumber}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.STATUS} </p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{lang.SUBMITTED}</p>
				</div>
			</div>                 
        </div>		
    return returnDisplayData;  
} 
}   

export function alcoholDrugDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{
    let programName, contactName,hours,index, commonData
        evidenceList.map((evidenceDataList) => {
            commonData = getcommonData(evidenceDataList.evidenceDataList)
            evidenceDataList.evidenceDataList.map((nameValue)=>{ 
                if(nameValue.name==="programFacilityName"){
                    programName = nameValue.value
                }else if(nameValue.name==="contactName"){
                    contactName = nameValue.value
                }else if(nameValue.name==="hours"){
                    hours = nameValue.value
                }
            })
        }
    )
    let returnDisplayData = 
	<div key={index} className='annualSummaryDiv '>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.EEFDET0016}</p>
			</div>
		</div>
		<div className="blockUnderline"></div>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.FROM_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.fromDateValue}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TO_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.toDate}</p>
			</div>
		</div>

		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.PROGRAM_FACILITY_NAME}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{programName}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.CONTACT_NAME}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{contactName}</p>
			</div>
		</div>
					
		<div className="row workActivityDetailsPadding ">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.ADDRESS}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.street1} {commonData.street2} {commonData.city} {commonData.state} {commonData.zip}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.PHONE_NUMBER}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.areaCode}-{commonData.phoneNumber}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.STATUS} </p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.SUBMITTED}</p>
			</div>
		</div>                 
	</div>
    return returnDisplayData;  
    } 
}

export function caringForIncapacitatedDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{ 
    let incapacitatedPersonName,index, commonData
        evidenceList.map((evidenceDataList) => {
            commonData = getcommonData(evidenceDataList.evidenceDataList)
            evidenceDataList.evidenceDataList.map((nameValue)=>{ 
                if(nameValue.name==="incapacitatedPersonName"){
                    incapacitatedPersonName = nameValue.value
                }
            })
        }
    )
    let returnDisplayData =
    <div key={index} className='annualSummaryDiv '>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.EEFDET0017}</p>
			</div>
		</div>
		<div className="blockUnderline"></div>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.FROM_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.fromDateValue}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TO_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.toDate}</p>
			</div>
		</div>

		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.INCAPACITATED_PERSON_NAME}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{incapacitatedPersonName}</p>
			</div>
		</div>
					
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.ADDRESS}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.street1} {commonData.street2} {commonData.city} {commonData.state} {commonData.zip}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.PHONE_NUMBER}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.areaCode}-{commonData.phoneNumber}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.STATUS} </p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.SUBMITTED}</p>
			</div>
		</div>                 
	</div>	
    return returnDisplayData;  
    } 
}

export function snapComplianceDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{ 
    let locationName, contactName,  hours, organizationName,index, attendanceType, commonData
        evidenceList.map((evidenceDataList) => {
            commonData = getcommonData(evidenceDataList.evidenceDataList)
            evidenceDataList.evidenceDataList.map((nameValue)=>{ 
                if(nameValue.name==="contactName"){
                    contactName = nameValue.value
                }else if(nameValue.name==="locationName"){
                    locationName = nameValue.value
                }else if(nameValue.name==="organizationName"){
                    organizationName = nameValue.value
                }else if(nameValue.name==="attendanceType"){
                    attendanceType = nameValue.value
                }
            })
        }
    )
    let returnDisplayData =
    <div key={index} className='annualSummaryDiv '>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.EEFDET0025}</p>
			</div>
		</div>
		<div className="blockUnderline"></div>
        <div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.ORGANIZATION_NAME}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{organizationName}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.CONTACT_NAME}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{contactName}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.ADDRESS}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.street1} {commonData.street2} {commonData.city} {commonData.state} {commonData.zip}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.PHONE_NUMBER}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.areaCode}-{commonData.phoneNumber}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.STATUS} </p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.SUBMITTED}</p>
			</div>
		</div>                 
	</div>	
    return returnDisplayData;  
    } 
}

export function volunteerDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{ 
    let contactName,  hours,index, organizationName,commonData
        evidenceList.map((evidenceDataList) => {
            commonData = getcommonData(evidenceDataList.evidenceDataList)
            evidenceDataList.evidenceDataList.map((nameValue)=>{ 
                if(nameValue.name==="contactName"){
                    contactName = nameValue.value
                }else if(nameValue.name==="organizationName"){
                    organizationName = nameValue.value
                }
            })
        }
    )
    let returnDisplayData =
    <div key={index} className='annualSummaryDiv '>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.EEFDET0019}</p>
			</div>
		</div>
		<div className="blockUnderline"></div>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.FROM_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.fromDateValue}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TO_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.toDate}</p>
			</div>
		</div>

		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.ORGANIZATION_NAME}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{organizationName}</p>
			</div>
		</div>
					
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.ADDRESS}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.street1} {commonData.street2} {commonData.city} {commonData.state} {commonData.zip}</p>
			</div>
		</div>

		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.PHONE_NUMBER}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.areaCode}-{commonData.phoneNumber}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.STATUS} </p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.SUBMITTED}</p>
			</div>
		</div>                 
	</div>	
    return returnDisplayData;  
    } 
}
export function healthEducationClassDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{ 
    let contactName, hours, className, attendanceType,index, commonData
        evidenceList.map((evidenceDataList) => {
            commonData = getcommonData(evidenceDataList.evidenceDataList)
            evidenceDataList.evidenceDataList.map((nameValue)=>{ 
                if(nameValue.name==="contactName"){
                    contactName = nameValue.value
                }else if(nameValue.name==="className"){
                    className = nameValue.value
                }else if(nameValue.name==="attendanceType"){
                    attendanceType = nameValue.value
                }
            })
        }
    )
    let returnDisplayData = 
	<div key={index} className='annualSummaryDiv '>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.EEFDET0020}</p>
			</div>
		</div>
		<div className="blockUnderline"></div>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.FROM_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.fromDateValue}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TO_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.toDate}</p>
			</div>
		</div>

		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.CLASS_NAME}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{className}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.ATTENDENCE_TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{attendanceType}</p>
			</div>
		</div>
					
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.ADDRESS}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.street1} {commonData.street2} {commonData.city} {commonData.state} {commonData.zip}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.PHONE_NUMBER}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.areaCode}-{commonData.phoneNumber}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.STATUS} </p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.SUBMITTED}</p>
			</div>
		</div>                 
	</div>
    return returnDisplayData;  
    } 
}
export function specialHealthNeedsDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{ 
    let title = getTitle(lang, subType), comments,index, competencyStatus, dateCompetencyDetermined, disabilityEndDate, disabilityStartDate, disabilityType, medFrailRecon, startDate, endDate, institutionType
        evidenceList.map((evidenceDataList) => {
            evidenceDataList.evidenceDataList.map((nameValue)=>{ 
                if(nameValue.name==="comments"){
                    comments = nameValue.value
                }else if(nameValue.name==="competencyStatus"){
                    competencyStatus = nameValue.value
                }else if(nameValue.name==="dateCompetencyDetermined"){
                    dateCompetencyDetermined = getFormattedDate(nameValue.value)
                }else if(nameValue.name==="disabilityEndDate"){
                    disabilityEndDate = getFormattedDate(nameValue.value)
                }else if(nameValue.name==="disabilityStartDate"){
                    disabilityStartDate = getFormattedDate(nameValue.value)
                }else if(nameValue.name==="disabilityType"){
                    disabilityType = nameValue.value
                }else if(nameValue.name==="medFrailRecon"){
                    medFrailRecon = nameValue.value
                }else if(nameValue.name==="startDate"){
                    startDate = getFormattedDate(nameValue.value)
                }else if(nameValue.name==="endDate"){
                    endDate = getFormattedDate(nameValue.value)
                }else if(nameValue.name==="institutionType"){
                    institutionType = nameValue.value
                }
            })
        }
    ) 
    if(subType === 'EEFDET0010'){
        let returnDisplayData =
        <div key={index} className='annualSummaryDiv '>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{title}</p>
			</div>
		</div>
		<div className="blockUnderline"></div>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.FROM_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{startDate}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TO_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{endDate}</p>
			</div>
		</div>

		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.INSTITUTION_TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{institutionType}</p>
			</div>
		</div>
        <div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.STATUS} </p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.SUBMITTED}</p>
			</div>
		</div> 
    </div>		
        return returnDisplayData;
    }else {
        let returnDisplayData = 
		<div key={index} className='annualSummaryDiv '>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{title}</p>
			</div>
		</div>
		<div className="blockUnderline"></div>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.DISABILITY_TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{disabilityType}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.COMPETENCY_STATUS}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{competencyStatus}</p>
			</div>
		</div>
					
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.DATE_OF_COMPETENCY}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{dateCompetencyDetermined}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.DISABILITY_START_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{disabilityStartDate}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.DISABILITY_END_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{disabilityEndDate}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.STATUS} </p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.SUBMITTED}</p>
			</div>
		</div>                 
	</div>
    return returnDisplayData;  
    }
    } 
}

export function studentEvidenceDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{ 
    let schoolType, hours, studentStartDate, studentEndDate,index, schoolOrganizationName, studentStatus,  commonData, title = getTitle(lang, subType)
        evidenceList.map((evidenceDataList) => {
            commonData = getcommonData(evidenceDataList.evidenceDataList)
            evidenceDataList.evidenceDataList.map((nameValue)=>{ 
                if(nameValue.name==="schoolType"){
                    schoolType = nameValue.value
                }else if(nameValue.name==="hours"){
                    hours = nameValue.value
                }else if(nameValue.name==="schoolOrganizationName"){
                    schoolOrganizationName = nameValue.value
                }else if(nameValue.name==="studentStatus"){
                    studentStatus = nameValue.value
                }
            })
        }
    )
    let returnDisplayData = 
	<div key={index} className='annualSummaryDiv '>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{title}</p>
			</div>
		</div>
		<div className="blockUnderline"></div>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.FROM_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.fromDateValue}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TO_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.toDate}</p>
			</div>
		</div>

		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.SCHOOL_TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{schoolType}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.HOURS}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{hours}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.SCHOOL_ORG_NAME}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{schoolOrganizationName}</p>
			</div>
		</div>
					
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.ADDRESS}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.street1} {commonData.street2} {commonData.city} {commonData.state} {commonData.zip}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.PHONE_NUMBER}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{commonData.areaCode}-{commonData.phoneNumber}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.STATUS} </p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.SUBMITTED}</p>
			</div>
		</div>                 
	</div>
    return returnDisplayData;  
    } 
}




export function incomeWSNSEFFDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{ 
    let returnDisplayData = [], incomeDetails, incomeHeadingDetails, incomeHeadingDisplay, totalData
    incomeHeadingDetails = evidenceList[0].evidenceDataList
    incomeHeadingDisplay = incomeDetailsHeadingDisplayContent(incomeHeadingDetails,subType, lang)
    returnDisplayData.push(incomeHeadingDisplay)
        evidenceList.map((evidenceList, index) => {
            incomeDetails = incomeDetailsEvidenceDisplayContent(evidenceList, index, subType, lang)
            returnDisplayData.push(incomeDetails)
        }
    )
    totalData = incomeDetailsTotalValuesDisplayContent(evidenceList, subType, lang);
    returnDisplayData.push(totalData)
    return returnDisplayData;  
    } 
}

function incomeDetailsEvidenceDisplayContent(evidenceList, index, subType, lang){
    let amount, dateIncomeReceived, hours, evidenceType, amountDisplay, hoursDisplay
        evidenceList.evidenceDataList.map((nameValue) => {
            if(nameValue.name==="amount"){
				amount = nameValue.value				
            }else if(nameValue.name==="dateIncomeReceived" || nameValue.name==="receivedDate"){
                dateIncomeReceived = getFormattedDate(nameValue.value)
            }else if(nameValue.name==="hours"){
				hours = nameValue.value
            }
        })
		evidenceType = evidenceList.evidenceType.value
		if(evidenceType === 'DET0026030'){
			amountDisplay = <p className="wrapText">${parseFloat(amount.replace(/,/g, '')).toFixed(2)} {lang.MONTHLY}</p>
		}else{
			amountDisplay = <p className="wrapText">${parseFloat(amount.replace(/,/g, '')).toFixed(2)}</p>
		}

		if(subType === 'IT26015'){
			hoursDisplay = ''
		}else {
			hoursDisplay = <div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.HOURS} </p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p className="wrapText">{hours}</p>
			</div>
		</div>
		}
		
    let returnDisplayData = 
		<div key={index} className='annualSummaryDiv '>
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.RECEIVED_DATE}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{dateIncomeReceived}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.AMOUNT} </p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					{amountDisplay}
				</div>
			</div>
			
			{hoursDisplay}
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.STATUS} </p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{lang.SUBMITTED}</p>
				</div>
			</div> 
		</div>
                
    return returnDisplayData;  
} 

function incomeDetailsHeadingDisplayContent(evidenceList, subType, lang){
    let employerName, title = getTitle(lang, subType), incomeType
    if(subType === 'IT26015'){
        title =  getTitle(lang, 'IT26001')
    }
        evidenceList.map((nameValue) => {
            if(nameValue.name==="incomeType"){
                incomeType = nameValue.value
            }else if(nameValue.name==="employerName"){
                employerName = nameValue.value
            }
        })
    let returnDisplayData = 
        
		<div className='annualSummaryDiv '>
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{title}</p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{incomeType}</p>
				</div>
			</div>
			
			<div className="row workActivityDetailsPadding">
				<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
					<p>{lang.EMPLOYER} </p>
				</div>
				<div className="col-md-8 col-sm-8 col-xs-8 ">
					<p>{employerName}</p>
				</div>
			</div>     
        </div>
    return returnDisplayData;  
}

function incomeDetailsTotalValuesDisplayContent(evidenceList, subType, lang){
    let totalAmount = 0, totalHours = 0, amount, hours, returnDisplayData, totalAmountWithDecimals, hoursDisplay, amountDisplay
    evidenceList.map((evidenceList) => {  
    evidenceList.evidenceDataList.map((nameValue) => {
        if(nameValue.name==="amount"){
            amount = nameValue.value
			totalAmount = ((parseFloat(totalAmount)+parseFloat(Number.parseFloat(amount.replace(/,/g, '')))).toFixed(2)); 
        }else if(nameValue.name==="hours"){
            hours = nameValue.value
            totalHours = totalHours+Number(hours)
        }
    })
})

if(subType === 'IT26015'){
	hoursDisplay = ''
}else{
	hoursDisplay = <div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 ">
						<h4>{lang.TOTAL_HOURS}</h4>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
						<h4>{totalHours}</h4>
			</div>
		</div>
}


totalAmountWithDecimals = Number(totalAmount).toFixed(2)
if(subType === 'IT26015'){
    returnDisplayData = 
    <div className="annualSummaryDiv " >
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 ">
				<h4>{lang.TOTAL_INCOME}</h4>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<h4>${totalAmountWithDecimals} {lang.MONTHLY}</h4>
			</div>
		</div>
		{hoursDisplay}
    </div>
} else {
    returnDisplayData = 
    <div className="annualSummaryDiv " >
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 ">
				<h4>{lang.TOTAL_INCOME}</h4>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<h4>${totalAmountWithDecimals} {lang.MONTHLY}</h4>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 ">
				<h4>{lang.TOTAL_HOURS}</h4>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<h4>{totalHours}</h4>
			</div>
		</div>
    </div>		
}
    return returnDisplayData;  
}

export function pregancyEvidenceDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{ 
    let noOfUnborn, enrolledOnMedicaidDuringPregnancy,index, pregnancyEndDate, dueDate, title = getTitle(lang, subType)
        evidenceList.map((evidenceDataList) => {
            evidenceDataList.evidenceDataList.map((nameValue)=>{ 
                if(nameValue.name==="noOfUnborn"){
                    noOfUnborn = nameValue.value
                }else if(nameValue.name==="enrolledOnMedicaidDuringPregnancy"){
                    enrolledOnMedicaidDuringPregnancy = nameValue.value
                }else if(nameValue.name==="schoolOrganizationName"){
                    schoolOrganizationName = nameValue.value
                }else if(nameValue.name==="pregnancyEndDate"){
                    pregnancyEndDate = getFormattedDate(nameValue.value)
                }else if(nameValue.name==="dueDate"){
                    dueDate = getFormattedDate(nameValue.value)
                }
            })
        }
    )
    let returnDisplayData =
    <div key={index} className='annualSummaryDiv '>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{title}</p>
			</div>
		</div>
		<div className="blockUnderline"></div>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 ">
				<h4>{lang.NO_UNBORN}</h4>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<h4>{noOfUnborn}</h4>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.DUE_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{dueDate}</p>
			</div>
		</div>
		
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.PREG_END_DATE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{dueDate}</p>
			</div>
		</div>

		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.ENROLLED_MEDICAID}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{enrolledOnMedicaidDuringPregnancy}</p>
			</div>
		</div>
				
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.STATUS}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.SUBMITTED}</p>
			</div>
		</div>                 
	</div>	
    return returnDisplayData;  
    } 
}

export function childUnderEighteenDisplayContent(evidenceList, subType, lang){
    return function(dispatch)
	{ 
    let concernRoleName,index, title = getTitle(lang, subType)
        evidenceList.map((evidenceDataList) => {
            evidenceDataList.evidenceDataList.map((nameValue)=>{ 
                if(nameValue.name==="concernRoleName"){
					if(nameValue.value === 'CHLD_EXEMP'){
						nameValue.value = lang.CHLD_EXEMP
					}
                    concernRoleName = nameValue.value
                }
            })
        }
    )
    let returnDisplayData = 
	<div key={index} className='annualSummaryDiv '>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.TYPE}</p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{title}</p>
			</div>
		</div>
		<div className="blockUnderline"></div>
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 ">
				<h4>{lang.NAME}</h4>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<h4>{concernRoleName}</h4>
			</div>
		</div>
				
		<div className="row workActivityDetailsPadding">
			<div className="col-md-3 col-sm-4 col-xs-4 rowbold ">
				<p>{lang.STATUS} </p>
			</div>
			<div className="col-md-8 col-sm-8 col-xs-8 ">
				<p>{lang.SUBMITTED}</p>
			</div>
		</div>                 
	</div>
    return returnDisplayData;  
    } 
}
