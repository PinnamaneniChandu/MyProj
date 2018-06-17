import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import * as locales from './SubmissionProperties.js'
import {getEvidenceList, searchValueForName, getStatus} from '../actions/CommonActions'
import {connect} from 'react-redux'
import moment from 'moment-es6'
import SecondaryHeader from './components/SecondaryHeader'
import warning from '../assets/tick.png'
import {clearEvidence} from '../actions/evidenceAction'
import {submitEvidence,clearResponse} from '../actions/evidenceSubmitAction'
import {clearPageDetailsResponse} from '../actions/LoggingCommonActions'

class SubmissionPage extends React.Component {
    componentWillMount()
    {
        this.props.clearEvidence()
        this.props.clearPageDetailsResponse()
    }

    statusResponse(statusData, lang){
        let display1Required, display2Required, display3Required, display1Value, display2Value, display3Value, statusExplanationText, display1, display2, display3, statusExplanation
        let storeMonthAndYearData = this.props.monthAndYear.montlyAndYearData
        const monthName = [ 'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let montNumber = Number(this.props.monthlySummaryData.montlySummaryData.month), nextMonth = montNumber + 1

        statusData.map((nameValue) => {
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
            }else if(nameValue.name === 'statusExplanationText'){
                statusExplanationText = nameValue.value
            }
        })

        if(display1Required === 'true'){
            let display1Status = this.props.getStatus(lang,display1Value )
            display1 = lang.status + '' +   display1Status
        }
        if(display2Required === 'true'){
            if(display1Value === 'EXMT'){
                display2 = lang.exemptionReason + '' + this.props.getStatus(lang,display2Value )
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

        if(statusExplanationText === 'notSubjectToWorkRequirement'){
            statusExplanation = lang.notSubjectToWorkRequirement
        }else if(statusExplanationText === 'interimImplementationPeriod' || statusExplanationText === 'interimApplicationPeriod' || statusExplanationText === 'interimRenewPeriod' || statusExplanationText === 'interimAdversePeriod'){
            statusExplanation = lang.interimImplementationPeriod
        }else if(statusExplanationText === 'exempt'){
            statusExplanation = lang.exempt
        }else if(statusExplanationText === 'requiredToReportWorkActivities'){
            statusExplanation = lang.requiredToReportWorkActivities
        }else if(statusExplanationText === 'compliant'){
            statusExplanation = lang.compliant +''+ storeMonthAndYearData +''+ lang.compliant1 +''+ monthName[nextMonth] +'' + lang.compliant2 
        }else if(statusExplanationText === 'nonARWorksAddChild'){
            statusExplanation = lang.nonARWorksAddChild
        }

        var localTime  = moment.utc(this.props.serverDate).toDate();
        localTime = moment(this.props.curamServerDate).format('MM/DD/YYYY hh:mm A')

        let statusRender = 
        <div>
            <div>
                <div>
                    <div className='annualSummaryDiv2'>
                        <p>{display1}</p>
                        <p>{display2}</p>
                        <p>{display3}</p>    
                    </div>
                    <p>{statusExplanation}</p>
                    <div style={{float: 'right'}}> <small>{localTime}</small> </div>
                </div>
            </div> 
        </div>
    return statusRender
    }

    render() {
        let lang = locales.strings, statusDisplay, statusInfoData, statusInfo
        statusInfo =  this.props.getEvidenceList(this.props.submitedEvidence.evidenceResponse, "EEFDET0026" )
        statusInfo.map((statusRes) =>{
            statusInfoData = statusRes
            statusDisplay = this.statusResponse(statusInfoData, lang)
            }) 


        return (
        <div className="container">
                <SecondaryHeader HeadingName= {lang.Title}/>
                <div className="blockUnderline summaryPageInfo1"></div>
            <div className='annualSummaryDiv'>
            <div className="row summaryPageInfo1">
                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2">
                    <img src={warning} className=" img-responsive-status"  alt='SubmissionAcknowledgment'/>
                </div>
                <div className="col-lg-11 col-md-11 col-sm-11 col-xs-9 systemfailureTextStyle">
                    <p> {lang.receivedInformation} </p>
                </div>
            </div>
                {statusDisplay}
				<small style={{ float: "right", fontWeight: "BOLD" }}></small>
                <div className="centerAlignStyle summaryPageInfo1">
                    <ButtonFunctionality ButtonName={lang.home} redirectTo="ARWorksHomePage" dstClassName="btn button-text buttonBack1  overflow-visible" />

                </div>
            </div>
        </div>
			
        )
    }
}
function mapStateToProps(store) {
    return {
    submitedEvidence: store.submitedEvidence,
    monthAndYear: store.montlySummaryData,
    monthlySummaryData: store.montlySummaryData,
    evidences:store.evidences,
    submitedEvidence: store.submitedEvidence,
    };
}

export default connect(mapStateToProps,{getEvidenceList, searchValueForName, getStatus, submitEvidence,clearEvidence,clearResponse, clearPageDetailsResponse})(SubmissionPage);