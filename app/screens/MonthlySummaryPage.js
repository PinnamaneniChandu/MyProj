import '../CSS/App.css';
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import heroImage from '../assets/hero.jpg';
import MonthlySummaryComponent from './components/MonthlySummary/MonthlySummaryComponent'
import {addEvd, getEvidenceList, searchValueForName, getStatus, getSubEvidenceList, getFormattedDate ,updateEvd} from '../actions/CommonActions'
import { MonthlySummaryInformation, MonthAndYearInformation} from '../actions/locationAction.js'
import { fetchMontlySummary } from '../actions/monthlySummaryAction.js'
import { connect } from 'react-redux'
import  * as locales from './MonthlySummaryPageProperties'
import AnchorFunctionality from '../ClickFunc/AnchorFunctionality'
import SecondaryHeader from './components/SecondaryHeader'
import {getHHMembers} from '../actions/CommonActions'
import {setDOB} from '../actions/HHMembersAction'
import moment from 'moment-es6';
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import { clearWorkActivityDetailsList } from '../actions/workDetailsAction.js'

class MonthlySummaryPage extends React.Component{
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Monthly Summary Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        let currentHHMembers=this.props.getHHMembers(this.props.members.members)
        let dateOfBirth;
        currentHHMembers.map((member)=>{
            if(member.name === this.props.userName){
                dateOfBirth= moment(member.dateOfBirth).format('YYYYDDMM')
            }
        })
        this.props.setDOB(dateOfBirth)
		 this.state={
            actionDone: false
        }
    }
    componentWillUnmount(){
        let pageEndTime =moment();
        var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
        var PageTimeEnd = duration.asSeconds();  
        this.props.setSessionTime(PageTimeEnd)
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Monthly Summary Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
    componentWillMount(){
        this.props.clearWorkActivityDetailsList() // This Action is used to clear workActivity Details 'POST' operation response.

        if(this.props.location.data && !isNaN(this.props.location.data.data)){
            this.props.evidences.list.splice(this.props.location.data.data, 1)
            this.setState({actionDone:true})
        }
        if(this.props.location.evidenceDate.evidenceDate !== undefined){
            let presentMonth = {
            month: this.props.location.evidenceDate.evidenceDate.month.toString()
            }
            this.props.MonthlySummaryInformation(presentMonth)
        }
        if(this.props.location.state.displayText != "" && this.props.location.state.displayText != null){
            let monthName = this.props.location.state.displayText            
            this.props.MonthAndYearInformation(monthName)

            let monthAndYearValues = monthName.split(" ");
            var myDate = new Date(monthAndYearValues[0] + " 1, 2014");
            var monthDigit = myDate.getMonth() ;
            var currentMonth = monthDigit+1;
            if (currentMonth < 10) { 
                currentMonth = '0' + currentMonth; 
            }
            isNaN(currentMonth) ? 0 : (monthAndYearValues[0]); 
            var formattedMonthAndYear = monthAndYearValues[1] +''+ currentMonth 

        }
        let storeMonthAndYearData = this.props.monthAndYear.montlyAndYearData
        let storemonthAndYearValues = storeMonthAndYearData.split(" ");
        var storeMyDate = new Date(storemonthAndYearValues[0] + " 1, 2014");
        var storeMonthDigit = storeMyDate.getMonth() ;
        var storeCurrentMonth = storeMonthDigit + 1;
        if (storeCurrentMonth < 10) { 
            storeCurrentMonth = '0' + storeCurrentMonth; 
        }
        isNaN(storeCurrentMonth) ? 0 : (storemonthAndYearValues[0]); 
        var storeFormattedMonthAndYear = storemonthAndYearValues[1] +''+ storeCurrentMonth  

        this.props.location.state.displayText  ? this.props.fetchMontlySummary(formattedMonthAndYear) : this.props.fetchMontlySummary(storeFormattedMonthAndYear)

    }
    componentDidMount(){ 
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)  
        let flag=true;     
        if(this.props.location.data.data && !this.state.actionDone){
            if(this.props.location.data.data.index>=0){
                this.props.updateEvd(this.props.evidences.list, this.props.location.data.data, this.props.location.data.data.evidenceType, this.props.monthlySummaryData.montlySummaryData.month,this.props.location.data.data.index)
                flag=false
            } 
        }
         if(flag && !this.state.actionDone){
                this.props.location.data.data ? this.props.addEvd(this.props.evidences.list, this.props.location.data.data, this.props.location.data.data.evidenceType, this.props.monthlySummaryData.montlySummaryData.month) : undefined
        }
        
    }
    getMonthInNumberFormate(monthName){
        var myDate = new Date(monthName + " 1, 2014");
        var monthDigit = myDate.getMonth() ;
        var currentMonth = monthDigit+1;
        if (currentMonth < 10) { 
            currentMonth = '0' + currentMonth; 
        }
        return isNaN(currentMonth) ? 0 : (currentMonth); 
    }

    /* It will give FORMATTED SUMMARY DATA
    */
    summaryEvidence(summaryData, lang){
        let display1Required, display2Required, display3Required, display1Value, display2Value, display3Value
        summaryData.map((nameValue) => {
            if(nameValue.name === 'display1Required'){
                display1Required = nameValue.value
            }else if(nameValue.name === 'display2Required'){
                display2Required = nameValue.value
            }else if(nameValue.name === 'display3Required'){
                display3Required = nameValue.value
            }
            else if(nameValue.name === 'display1Value'){
                display1Value = nameValue.value
            }
            else if(nameValue.name === 'display2Value'){
                display2Value = nameValue.value
            }
            else if(nameValue.name === 'display3Value'){
                display3Value = nameValue.value
            }
        })

        let display1, display2, display3
        if(display1Required === 'true'){
            let display1Status = this.props.getStatus(lang,display1Value )
            display1 = lang.status + '' +   display1Status
        }
        if(display2Required === 'true'){
            if(display1Value === 'EXMT'){
                display2 = lang.exemption + '' + this.props.getStatus(lang,display2Value )
            }else if(display1Value === 'RTW' || display1Value === 'COMP' || display1Value === 'NCM1' || display1Value === 'NCM2' || display1Value === 'NCM3') {
                display2 = lang.totalHours + '' + display2Value
            } else if(display1Value === 'IIP' || display1Value === 'IAP' || display1Value === 'IRP' || display1Value === 'IAAP') {
                display2 = display2Value
            }     
        }
        if(display3Required === 'true'){
            if(display1Value === 'EXMT'){
                display3 = lang.exemptionPeriod + '' + display3Value
            }else if(display1Value === 'RTW' || display1Value === 'COMP' || display1Value === 'NCM1' || display1Value === 'NCM2' || display1Value === 'NCM3'){
                display3 = lang.totalRemainingHours + '' +  display3Value
            }
        }

        let summaryRender = 
            <div className="monthly-Summary-SummaryStyle">
                <p>{display1}</p>
                <p>{display2}</p>
                <p>{display3}</p>
            </div> 
            return summaryRender
        }
        // End of summaryEvidence

            /* It will give FORMATTED OTHEREVIDENCE DATA
    */
    otherEvidence(evidenceData, lang){
        let titleValue, display1Required, display2Required, display3Required, display4Required,display5Required, display1Value, display2Value, display3Value, display4Value, display5Value, subType, evidenceDesID, evidenceTypeValue, organizationName, totalHoursValue,
        schoolOrganizationName, className
        evidenceData.map((nameValue) => {
            if(nameValue.name === 'Title'){
                titleValue = nameValue.value
            }else if(nameValue.name === 'display1Required'){
                display1Required = nameValue.value
            }else if(nameValue.name === 'display2Required'){
                display2Required = nameValue.value
            }else if(nameValue.name === 'display3Required'){
                display3Required = nameValue.value
            }else if(nameValue.name === 'display4Required'){
                display4Required = nameValue.value
            }else if(nameValue.name === 'display5Required'){
                display5Required = nameValue.value
            }else if(nameValue.name === 'display1Value'){
                display1Value = nameValue.value
            }
            else if(nameValue.name === 'display2Value'){
                display2Value = nameValue.value
            }
            else if(nameValue.name === 'display3Value'){
                display3Value = nameValue.value
            }else if(nameValue.name === 'display4Value'){
                display4Value = nameValue.value
            }else if(nameValue.name === 'display5Value'){
                display5Value = nameValue.value
            }else if(nameValue.name === 'subType'){
                subType = nameValue.value
            }else if(nameValue.name === 'evidenceDescriptorID'){
                evidenceDesID = nameValue.value
            }else if(nameValue.name === 'evidenceType'){
                evidenceTypeValue = nameValue.value
            }else if(nameValue.name === 'schoolOrganizationName'){
                schoolOrganizationName = nameValue.value
            }else if(nameValue.name === 'TOTALHOURS'){
                totalHoursValue = nameValue.value
            }else if(nameValue.name === 'organizationName'){
                organizationName = nameValue.value
            }else if(nameValue.name === 'className'){
                className = nameValue.value
            }
        })
        let displayTitle, display1, display2, display3, display4, display5
        displayTitle = this.props.getStatus(lang,titleValue)
        if(display1Required === 'true'){
            if(titleValue === 'TITLE_END_INCOME'){
                if(subType === 'IT26001'){
                    display1 = this.props.getStatus(lang, display1Value)
                }else{
                    display1 = this.props.getStatus(lang, display1Value)                    
                }                
            }
            else{
            if(subType === 'DET0026008'){
                display1 = lang.DUE_DATE + '' + this.props.getFormattedDate (display1Value)
            }else if(subType === 'EEF01' || subType === 'ST3' || subType === 'EEF02' || subType === 'EEF03' || subType === 'ST12' || subType === 'ST5' || subType === 'ST7') {
                display1 = lang.SCHOOL_ORGANIZATION + '' + display1Value
            } else if(subType === 'IT26015') {
                if(evidenceTypeValue === 'EEFDET0022'){
                display1 = lang.AMOUNT + '' + display1Value
                }
                else if(evidenceTypeValue === 'DET0026030'){
                    display1 = lang.AMOUNT + '' + display1Value +' '+ lang.MONTHLY
                }
            } else if(subType === 'EEFDET0017'){
                display1 = lang.PERSON_CARE_FOR + '' + display1Value
            }else if(subType === 'EEFDET0016'){
                display1 = lang.PROGRAM_FACILITY_NAME + '' + display1Value
            }else if(subType === 'EEFDET0025'){
                display1 = lang.status + '' + this.props.getStatus(lang,display1Value)
            }else if(subType === 'EEFDET0027'){
                if(display1Value === 'CHLD_EXEMP'){
                    display1Value = this.props.getStatus(lang,display1Value)
                }
                display1 = lang.CHILD + '' + display1Value
            }else if(subType === 'EEFDET0010'){
                display1 = this.props.getStatus(lang,display1Value)
            }else {
                display1 = this.props.getStatus(lang,display1Value )
            }
        }
        }
        if(display2Required === 'true'){
            if(titleValue === 'TITLE_END_INCOME')
                {
            if(subType === 'IT26001'){
                display2 = lang.EMPLOYER + '' + display2Value
                }else if(subType === 'IT26008' || subType === 'IT26017' || subType === 'IT26015') {
                    display2 = lang.TYPE + '' + this.props.getStatus(lang,display2Value)
                }
            }
            else {
                if (subType === 'IT26001') {
                    display2 = lang.EMPLOYER + '' + display2Value
                } else if (subType === 'IT26008' || subType === 'IT26017') {
                    if (evidenceTypeValue === 'EEFDET0022') {
                        display2 = lang.AMOUNT + '' + display2Value
                    }
                    else if (evidenceTypeValue === 'DET0026030') {
                        display2 = lang.AMOUNT + '' + display2Value + ' ' + lang.MONTHLY
                    }
                }

                else if (subType === 'EEFDET0021' || subType === 'EEFDET0018') {
                display2 = lang.HOURS + '' + display2Value
            } else if(subType === 'EEFDET0010') {
                 display2 = lang.INSTITUTION + '' + this.props.getStatus(lang,display2Value)
            } else if(subType === 'DET0026008'){
                display2 = lang.END_OF_POSTPARTUM + '' + this.props.getFormattedDate(display2Value)
            }else if(subType === 'DT1' || subType === 'DT2' || subType === 'DT26301' || subType === 'EEFDT2' || subType === 'IT26015' || subType === 'EEFDET0017' || subType === 'EEFDET0016' || subType === 'EEFDET0027'){
                display2 = lang.status + '' + this.props.getStatus(lang,display2Value)
            }else if(subType === 'EEFDET0019'){
                display2 = <div><p>{lang.ORGANIZATION + '' + organizationName}</p>
                <p> {lang.HOURS + '' + totalHoursValue}</p></div>
            }else if(subType === 'EEFDET0020'){
                display2 = <div><p>{lang.CLASS_NAME + '' + className}</p>
                <p>{lang.HOURS + '' + totalHoursValue}</p></div>
            }else {
                display2 = this.props.getStatus(lang,display2Value)
            }  
        }
    }
        if(display3Required === 'true'){
            if (titleValue === 'TITLE_END_INCOME') {
                display3 = lang.END_DATE + '' + this.props.getFormattedDate (display3Value) 
            }
            else {
                if (subType === 'IT26001') {
                    if (evidenceTypeValue === 'EEFDET0022') {
                        display3 = lang.AMOUNT + '' + display3Value
                    }
                    else if (evidenceTypeValue === 'DET0026030') {
                        display3 = lang.AMOUNT + '' + display3Value + ' ' + lang.MONTHLY
                    }
                } else if (subType === 'IT26008' || subType === 'IT26017' || subType === 'EEF01' || subType === 'ST3' || subType === 'EEF02' || subType === 'EEF03' || subType === 'ST12' || subType === 'ST5' || subType === 'ST7') {
                display3 = lang.HOURS + '' + display3Value
                }
                else if (subType === 'EEFDET0010' || subType === 'DET0026008' || subType === 'EEFDET0021' || subType === 'EEFDET0018' || subType === 'EEFDET0019' || subType === 'EEFDET0020') {
                display3 = lang.status + '' + this.props.getStatus(lang, display3Value)
            }  
        }
        }
        if(display4Required === 'true'){
            if (titleValue === 'TITLE_END_INCOME') {
            display4 = lang.status + '' + this.props.getStatus(lang, display4Value)
        }
            else {
                if (subType === 'IT26001') {
                    display4 = lang.HOURS + '' + display4Value
                } else {
                    display4 = lang.status + '' + this.props.getStatus(lang, display4Value)
                }
            }
        }

        if(display5Required === 'true'){
            if(subType === 'IT26001'){
                display5 = lang.status + '' + this.props.getStatus(lang, display5Value)
            }
        }
            let subEvd = {
                display1 : display1,
                display2: display2,
                display3: display3,
                display4 : display4,
                display5 : display5,
                displayTitle: displayTitle,
                subType: subType, 
                evidenceDescriptorID: evidenceDesID
            }
        return subEvd
    }
        // End of otherEvidence


    render(){
        let month=this.props.monthAndYear.montlyAndYearData? this.props.monthAndYear.montlyAndYearData.toString():this.props.location.state.displayText
        let lang = locales.strings
        let eefARWorksEvidencesAndCommonData = this.props.eefARWorksEvidencesAndCommonInfo, isDataAvailable, data, summaryList, summaryData, summaryEvidenceData, workActivityIncomeList, workActivityIncomeWSList, workActivityIncomeNSEList, workActivityIncomeFFList, 
            workActivityIncomeUEIList, incomeList, incomeWSList, incomeNSEList, incomeFFList, incomeUEIList, otherEvidenceData, otherEvidenceDisplayData = [], disabilityList, blindDisabledList, disabledDisableList, longTermDisableList, shortTermDisableList, livingMedicalDisableList,childUnderEighteenList,
            preganancyList, studentList, eslList, gedList, unpaidList, occupationalList, cuList, hsList, vocationalList,
            caringForIncapList, alcoholDrugList, jobSearchList, jobSearchTrainingList, volunteerList, snapList, healthEducationList
        let headingName = lang.welcome +','+ ' ' +this.props.userName

        if(eefARWorksEvidencesAndCommonData.eefARWorksEvidencesAndCommonInfo !== "" && eefARWorksEvidencesAndCommonData.eefARWorksEvidencesAndCommonInfo !== null){
                data = eefARWorksEvidencesAndCommonData.eefARWorksEvidencesAndCommonInfo
                data.commondatadtls.commonDataList.map((eefEvidnceData) => {
                if(eefEvidnceData.name === 'dataAvailable'){
                    isDataAvailable = eefEvidnceData.value
                }
            })
        }
        if(isDataAvailable){
            summaryList =  this.props.getEvidenceList(data, "EEFDET0026" )
            summaryList.map((evidenceData) =>{
                summaryData = evidenceData
                summaryEvidenceData = this.summaryEvidence(summaryData, lang)
                }) 
            
            workActivityIncomeList = this.props.getEvidenceList(data, "EEFDET0022")   

            /* Income Sub Type Evidence */
            workActivityIncomeWSList = this.props.getSubEvidenceList(workActivityIncomeList, 'IT26001')
            workActivityIncomeWSList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                }) 

            workActivityIncomeNSEList = this.props.getSubEvidenceList(workActivityIncomeList, 'IT26008')
            workActivityIncomeNSEList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                }) 

            workActivityIncomeFFList = this.props.getSubEvidenceList(workActivityIncomeList, 'IT26017')
            workActivityIncomeFFList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                }) 

            workActivityIncomeUEIList = this.props.getSubEvidenceList(workActivityIncomeList, 'IT26015')
            workActivityIncomeUEIList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                }) 
            


            incomeList = this.props.getEvidenceList(data, "DET0026030") 
            incomeWSList = this.props.getSubEvidenceList(incomeList, 'IT26001')
            incomeWSList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                }) 

            incomeNSEList = this.props.getSubEvidenceList(incomeList, 'IT26008')
            incomeNSEList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                }) 

            incomeFFList = this.props.getSubEvidenceList(incomeList, 'IT26017')
            incomeFFList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                }) 


            incomeUEIList = this.props.getSubEvidenceList(incomeList, 'IT26015')
            incomeUEIList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                }) 

                disabilityList = this.props.getEvidenceList(data, "DET0026010")  
            blindDisabledList = this.props.getSubEvidenceList(disabilityList, 'DT1')
                blindDisabledList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                }) 

            disabledDisableList = this.props.getSubEvidenceList(disabilityList, 'DT2')
                disabledDisableList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                }) 

            longTermDisableList = this.props.getSubEvidenceList(disabilityList, 'DT26301')
                longTermDisableList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                })

            shortTermDisableList = this.props.getSubEvidenceList(disabilityList, 'EEFDT2')
                shortTermDisableList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                })


            /* LiVING IN MEDICAL INSTUTION  */
            livingMedicalDisableList = this.props.getEvidenceList(data, 'EEFDET0010')
                livingMedicalDisableList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                })
            /* END OF MEDICAL INSTUTION  */  

            /* CHILD UNDER EIGHTEEN  */
            childUnderEighteenList = this.props.getEvidenceList(data, 'EEFDET0027')
                childUnderEighteenList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                })
            /* END OF CHILD UNDER EIGHTEEN  */  
            
            
            /* LiVING IN PREGNANCY  */
            preganancyList = this.props.getEvidenceList(data, 'DET0026008')
                preganancyList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })
            /* END OF MEDICAL PREGNANCY  */  

            /* LiVING IN STUDENT  */
            studentList = this.props.getEvidenceList(data, 'DET0026007')

            eslList = this.props.getSubEvidenceList(studentList, 'EEF01')
                eslList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })
            gedList = this.props.getSubEvidenceList(studentList, 'ST3')
                gedList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            }) 
            unpaidList = this.props.getSubEvidenceList(studentList, 'EEF02')
                unpaidList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })
            occupationalList = this.props.getSubEvidenceList(studentList, 'EEF03')
                occupationalList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })
            cuList = this.props.getSubEvidenceList(studentList, 'ST12')
                cuList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })
            hsList = this.props.getSubEvidenceList(studentList, 'ST5')
                hsList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })
            vocationalList = this.props.getSubEvidenceList(studentList, 'ST7')
                vocationalList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })
            /* END OF MEDICAL STUDENT  */  


            /* CARING FOR INCAPAITATED */

            caringForIncapList = this.props.getEvidenceList(data, 'EEFDET0017')
                caringForIncapList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })

            /* ALCOHOL and DRUG*/

            alcoholDrugList = this.props.getEvidenceList(data, 'EEFDET0016')
                alcoholDrugList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })

            /* JOB SEARCH */

            jobSearchList = this.props.getEvidenceList(data, 'EEFDET0021')
                jobSearchList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })   
            
            

            jobSearchTrainingList = this.props.getEvidenceList(data, 'EEFDET0018')
                jobSearchTrainingList.map((evidenceData) =>{
                otherEvidenceData = evidenceData
                otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })



        volunteerList = this.props.getEvidenceList(data, 'EEFDET0019')
            volunteerList.map((evidenceData) =>{
            otherEvidenceData = evidenceData
            otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
        })



        snapList = this.props.getEvidenceList(data, 'EEFDET0025')
            snapList.map((evidenceData) =>{
                    otherEvidenceData = evidenceData
                    otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
            })

        healthEducationList = this.props.getEvidenceList(data, 'EEFDET0020')
            healthEducationList.map((evidenceData) =>{
                        otherEvidenceData = evidenceData
                        otherEvidenceDisplayData.push(this.otherEvidence(otherEvidenceData, lang))
                    })
    }  
    let disabled = false, currentYYYYcurrentMM, currentYYYYpreviousMM, previousYYYYpreviousMM
    if(this.props.location.yearAndMonthInfo.yearAndMonthInfo !== '' && this.props.location.yearAndMonthInfo.yearAndMonthInfo !== null && this.props.location.yearAndMonthInfo.yearAndMonthInfo !== undefined){
        currentYYYYcurrentMM = this.props.location.yearAndMonthInfo.yearAndMonthInfo.currentYYYYcurrentMM
        currentYYYYpreviousMM = this.props.location.yearAndMonthInfo.yearAndMonthInfo.currentYYYYpreviousMM
        previousYYYYpreviousMM = this.props.location.yearAndMonthInfo.yearAndMonthInfo.previousYYYYpreviousMM
    }else if(this.props.location.yearAndMonthInfo.yearAndMonthInfo !== ''){
        disabled = false
    }
    else{
        currentYYYYcurrentMM = ''
        currentYYYYpreviousMM = ''
        previousYYYYpreviousMM = ''
    }

    if(currentYYYYcurrentMM !== '' && currentYYYYpreviousMM !== '' && previousYYYYpreviousMM !== ''){
        disabled = false
    }else{
        disabled = true
    }
    let isSubmitButtonDisabled = false
    if(this.props.evidences !== undefined && this.props.evidences !== null && this.props.evidences !== ''){
        if(disabled || this.props.evidences.list.length <= 0){
            isSubmitButtonDisabled = true
        }
    }
        return(
            <div className="container">
            {/*<div className="row">
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <img src={heroImage} className="heroImageStyle img-responsive" width='' height='' alt='' style={{marginBottom: "3%"}} />
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12 welcomeUserGreeting">
                    <h1 className="titleP">Welcome, {this.props.userName}</h1>
                </div>
                <div className='col-md-4 col-sm-12 col-xs-12 welcomeNote'>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <AnchorFunctionality AnchorText={lang.home} redirectTo="Summary"/>
                    </div>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <AnchorFunctionality AnchorText={lang.info} redirectTo="InformationPage"/>
                    </div>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <a href="https://eligibilityenrollment.arkansas.gov/CitizenPortal/application.do">{lang.logout}</a>
                    </div>
                </div>
            </div>*/}
            <SecondaryHeader HeadingName={headingName} headerStyleType = 'MainHeading' />
                    <div className="monthlySummary-divStyle">
                        <h3 className="MontlySummary-TitleStyle ">Monthly Summary - {month.toString()}  </h3>
                        {summaryEvidenceData}
                    </div>
                <MonthlySummaryComponent unSubmittedEvidences={this.props.evidences} submittedEvidences={this.props.evidences} otherEvidenceDisplay = {otherEvidenceDisplayData}/>
                <div className="monthlySummary-divStyle">
                <div className="row">
                    <div className="col-md-3 col-sm-12 col-xs-12" style={{textAlign:"center",paddingBottom:"5px"}}>
                        <ButtonFunctionality ButtonName={lang.ButtonHome} displayText="MonthlyBack" dstClassName="btn btn-secoundary button-text buttonBack1"/>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12" style={{textAlign:"center",paddingBottom:"5px"}}>
                        <ButtonFunctionality ButtonName={lang.ButtonReportExemptionWorkActivity} displayText="AddExemptionWorkActivity" dstClassName="btn btn-secoundary button-text buttonBack1" disabled={disabled}/>
                    </div>
                    <div className="col-md-3 col-sm-12 col-xs-12" style={{textAlign:"center"}}>
                        <ButtonFunctionality ButtonName={lang.ButtonSubmit} redirectTo="Acknowledgement" dstClassName="btn btn-secoundary button-text buttonBack1" data={this.props.monthlySummaryData}  disabled={isSubmitButtonDisabled}/>
                    </div>      
                </div>
                </div>
                
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
    evidences:store.evidences,
    monthlySummaryData: store.montlySummaryData,
    monthAndYear: store.montlySummaryData,
    eefARWorksEvidencesAndCommonInfo: store.eefARWorksEvidencesAndCommonInfo,
    members:store.HHMembers,
    pageDetails: store.pageDetailsReducer

    };
}



export default connect(mapStateToProps,{addEvd, clearWorkActivityDetailsList, getHHMembers, MonthlySummaryInformation, MonthAndYearInformation, fetchMontlySummary, getEvidenceList, searchValueForName, getStatus, getSubEvidenceList, getFormattedDate,updateEvd,setDOB,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(MonthlySummaryPage);