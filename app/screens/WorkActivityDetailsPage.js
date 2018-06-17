import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import SecondaryHeader from './components/SecondaryHeader'
import {connect} from 'react-redux'
import { workActivitDetailsPost } from '../actions/workDetailsAction.js'
import {jobSearchDisplayContent, jobSearchTrainingDisplayContent, alcoholDrugDisplayContent, caringForIncapacitatedDisplayContent, snapComplianceDisplayContent,volunteerDisplayContent, 
        healthEducationClassDisplayContent, specialHealthNeedsDisplayContent, studentEvidenceDisplayContent, incomeWSNSEFFDisplayContent,pregancyEvidenceDisplayContent,childUnderEighteenDisplayContent} from '../actions/workActivityCommonActions.js'
import  * as locales from './workActivityDetailsScreenProperties.js'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class WorkActivityDetails extends React.Component {
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Work Activity Details page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
       
    }
    componentDidMount(){
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)
     }
     
     componentWillUnmount(){
       let pageEndTime =moment();
       var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
       var PageTimeEnd = duration.asSeconds();  
       this.props.setSessionTime(PageTimeEnd)
       this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Work Activity Details page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
     }
    componentWillMount(){
        let evidenceDesID = this.props.location.data.data ? this.props.location.data.data.evidenceDescriptorID : undefined
        let formattedWorkActivityDetails = this.formattedWorkActivity(evidenceDesID)
        this.props.workActivitDetailsPost(formattedWorkActivityDetails)
    }
    formattedWorkActivity(evidenceDesID){
        let formattedValue = {
            EEFARwoksCommonDataDetails:{
                    commonDataList:[
                        {
                            name:"operationType",
                            value:"workAcitivity"
                        },
                        {
                            name:"evidenceDescriptorID",
                            value: evidenceDesID
                        }
                    ]
                }
            }
            return formattedValue
        }

    render() {
        let lang = locales.strings
        let storeMonthAndYearData = this.props.monthAndYear.montlyAndYearData
        let subType = this.props.location.data.data.subtype
        let displayWorkActivityDetails, dataAvailable, evidenceList
        let commonDataList = this.props.workActivityDetails.workActivityDetails ? this.props.workActivityDetails.workActivityDetails.commondatadtls: undefined
        if(commonDataList !== undefined){
            commonDataList.commonDataList.map((nameValue) => {
                if(nameValue.name === 'dataAvailable'){
                    dataAvailable = nameValue.value
                }
            })
        }
        if(dataAvailable === 'true'){
            evidenceList = this.props.workActivityDetails.workActivityDetails.evidencedtls.evidenceList
            if(subType === 'EEFDET0021'){
                displayWorkActivityDetails = this.props.jobSearchDisplayContent(evidenceList,subType, lang)
            }else if(subType === 'EEFDET0018'){
                displayWorkActivityDetails = this.props.jobSearchTrainingDisplayContent(evidenceList,subType, lang)
            }else if(subType === 'EEFDET0016'){
                displayWorkActivityDetails = this.props.alcoholDrugDisplayContent(evidenceList,subType, lang)
            }else if(subType === 'EEFDET0017'){
                displayWorkActivityDetails = this.props.caringForIncapacitatedDisplayContent(evidenceList,subType, lang)
            }else if(subType === 'EEFDET0025'){
                displayWorkActivityDetails = this.props.snapComplianceDisplayContent(evidenceList,subType, lang)
            }else if(subType === 'EEFDET0019'){
                displayWorkActivityDetails = this.props.volunteerDisplayContent(evidenceList,subType, lang)
            }else if(subType === 'EEFDET0020'){
                displayWorkActivityDetails = this.props.healthEducationClassDisplayContent(evidenceList,subType, lang)
            }else if(subType === 'DT1' || subType === 'DT2' || subType === 'EEFDT2' || subType === 'DT26301' || subType === 'EEFDET0010'){
                displayWorkActivityDetails = this.props.specialHealthNeedsDisplayContent(evidenceList,subType, lang)
            }else if(subType === 'EEF01' || subType === 'ST3' || subType === 'EEF02' || subType === 'EEF03' || subType === 'ST12' || subType === 'ST5' || subType === 'ST7'){
                displayWorkActivityDetails = this.props.studentEvidenceDisplayContent(evidenceList,subType, lang)
            }else if(subType === 'IT26001' || subType === 'IT26008' || subType === 'IT26017' || subType === 'IT26015'){
                displayWorkActivityDetails = this.props.incomeWSNSEFFDisplayContent(evidenceList,subType, lang)
            }else if(subType === 'DET0026008'){
                displayWorkActivityDetails = this.props.pregancyEvidenceDisplayContent(evidenceList,subType, lang)
            }else if(subType === 'EEFDET0027'){
                displayWorkActivityDetails = this.props.childUnderEighteenDisplayContent(evidenceList,subType, lang)
            }
        }
        
        return (
            <div className="container">
                <SecondaryHeader HeadingName="Work Activity Details"/>
                    <div className="blockUnderline"></div>
                        <div className='annualSummaryDiv '>
                            <div className="row">    
                                <div className="col-md-12 col-sm-12 col-xs-12 centerAlignStyle">
                                    <h4>Reporting Period: {storeMonthAndYearData}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">    
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                {displayWorkActivityDetails}
                            </div>
                        </div>    
						<div style={{marginBottom: 20}}></div>
                        <div className='centerAlignStyle'>
                            <ButtonFunctionality ButtonName="Back" redirectTo="MonthlySummaryPage" dstClassName="btn button-text buttonBack1  overflow-visible" />
                        </div>
            </div>
        )
    }
}
function mapStateToProps(store) {
    return {
    monthlySummaryData: store.montlySummaryData,
    monthAndYear: store.montlySummaryData,
    workActivityDetails: store.workActivityDetails,
    pageDetails: store.pageDetailsReducer
    };
}



export default connect(mapStateToProps,{workActivitDetailsPost, jobSearchDisplayContent, jobSearchTrainingDisplayContent, alcoholDrugDisplayContent, caringForIncapacitatedDisplayContent, snapComplianceDisplayContent,volunteerDisplayContent, 
    healthEducationClassDisplayContent, specialHealthNeedsDisplayContent, studentEvidenceDisplayContent, incomeWSNSEFFDisplayContent,pregancyEvidenceDisplayContent,childUnderEighteenDisplayContent,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(WorkActivityDetails);
