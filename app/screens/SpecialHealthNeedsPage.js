import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import React from 'react'
import { connect } from 'react-redux'
import SecondaryHeader from './components/SecondaryHeader'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { specialHealthNeedsInformation } from '../actions/specialHealthNeedsAction'
import * as locales from './SpecialHealthNeedsProperties.js'
import * as monthlySummaryLocales from './MonthlySummaryPageProperties'
import moment from 'moment-es6';
import astrisk from '../assets/astrisk.png'
import ErrorMessage from './components/ErrorMessage'
import {getStatus} from '../actions/CommonActions'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'


class SpecialHealthNeeds extends React.Component{
    constructor (props){
        var today=new Date();
        var currMonth = today.getMonth()
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Special Health Needs page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        this.state = {
            redirectTo:'',
            errorMessages:[],
            disabilityType: props.location.data?props.location.data.data.disabilityType:'',
            institutionType:props.location.data?props.location.data.data.institutionType:'',
            isLiveInMedicalInst: props.location.data?props.location.data.data.isLiveInMedicalInst:'',
            disabled:'',
            index:this.props.location.data.data.index?this.props.location.data.data.index:this.props.location.data.data.index,
            month: currMonth
        }
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
       this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Special Health Needs page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
     }
    handleDisabilityTypeValues(){this.setState({disabilityType: this.refs.disabilityType.value})}
    handleisLiveInMedicalInst(){this.setState({isLiveInMedicalInst: this.refs.isLiveInMedicalInst.value})}
    handleMedicalInstitutionValues(){this.setState({institutionType: this.refs.institutionType.value})}
    handleSubmit(event){
        if(this.state.disabilityType !== ''){
            event.preventDefault();
            return this.props.specialHealthNeedsInformation(this.state)
        }
    }
    createData(evdData, monthlyLang){
        let isLiveInMedicalInstitution = this.state.isLiveInMedicalInst , displayLine1, displayLine2, displayLine2SecondRow, displayLine4, disablitityType = this.state.disabilityType
        if(isLiveInMedicalInstitution === 'YN1' && disablitityType === 'EEFDT2'){
            displayLine1 = monthlyLang.DISPLAY1_EEFDT2
            displayLine2 = monthlyLang.DISPLAY1_EEFDET0010
            displayLine2SecondRow = monthlyLang.INSTITUTION + '' + this.props.getStatus(monthlyLang, this.state.institutionType),
            displayLine4 = ''
            
        } else if(isLiveInMedicalInstitution === 'YN1' && disablitityType === 'DT2'){
            displayLine1 = monthlyLang.DISPLAY1_DT2
            displayLine2 = monthlyLang.DISPLAY1_EEFDET0010
            displayLine2SecondRow = monthlyLang.INSTITUTION + '' + this.props.getStatus(monthlyLang, this.state.institutionType),
            displayLine4 = ''
        } 
        else if(isLiveInMedicalInstitution === 'YN2' && disablitityType === 'EEFDT2'){
            displayLine1 = monthlyLang.DISPLAY1_EEFDT2
            displayLine2 = ''
            displayLine2SecondRow = '',
            displayLine4 = ''
        }else if(isLiveInMedicalInstitution === 'YN2' && disablitityType === 'DT2'){
            displayLine1 = monthlyLang.DISPLAY1_DT2
            displayLine2 = ''
            displayLine2SecondRow = '',
            displayLine4 = ''
        }
        let data={
            evidenceName: monthlyLang.TITLE_DT1,
            evidenceType:"DET0026010",
            disabilityType: this.state.disabilityType,
            institutionType: this.state.institutionType,
            isLiveInMedicalInst: this.state.isLiveInMedicalInst,
            message:this.props.location.data?this.props.location.data:undefined,
            index:this.state.index,
            //month : this.state.month
            displayLine1: displayLine1,
            displayLine2: displayLine2,
            displayLine2SecondRow: displayLine2SecondRow,
            displayLine4: displayLine4
        }
        return data;
    }

    onMouseEnterHandler(event){ 
        let lang = locales.strings;
        let validationErrorMsg =new Set();
        for (var key in this.state) {   
            if(key==='disabilityType' && (this.state[key]==='' || this.state[key]=== undefined || this.state[key]=== '--Please Select--' ) ){
                validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.disability),secondMessage:lang.formatString(lang.IsMandatory)})   
            }
            if(key==='isLiveInMedicalInst' && (this.state[key]==='' || this.state[key]=== undefined || this.state[key]=== '--Please Select--' ) ){
                validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.liveInMedicalInst),secondMessage:lang.formatString(lang.IsMandatory)})   
            }
            if( ( this.state['isLiveInMedicalInst']==='YN1') && (key==='institutionType' && (this.state[key]==='' || this.state[key]=== undefined || this.state[key]=== '--Please Select--' ))){
                validationErrorMsg.add({key:key,firstMessage:lang.formatString(lang.medicalInstitution),secondMessage:lang.formatString(lang.IsMandatory)})            
            }
        }
        let array = Array.from(validationErrorMsg)
        let redirectTo;
        let disabled;
        if (array.length<=0){
            disabled = false
            redirectTo = 'MonthlySummaryPage'
        } else{
            disabled= true 
            redirectTo = 'SpecialHealthNeedsPage'
        }
        this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})
    }
    render() {
        
        let lang=locales.strings;
        let monthlyLang =  monthlySummaryLocales.strings
        let data=this.createData(this.state, monthlyLang);
        let typeOfMedicalInstitution; 
        if(this.state.isLiveInMedicalInst === "YN1"){
            typeOfMedicalInstitution = <div>
            <div style={{marginBottom: 20}}></div>
            <div className="row">
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <label>{lang.medicalInstitution}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                    <select name="institutionType" value= {this.state.institutionType} ref="institutionType" type="select" title={lang.medicalInstitution} className="form-control" id="institutionType" onChange={this.handleMedicalInstitutionValues.bind(this)} required>
                            <option defaultValue>--Please Select--</option>
                            <option value="HMIT1">{lang.nursingHome}</option>
                            <option value="HMIT2">{lang.intermediateCareFacility}</option>
                            <option value="HMIT3">{lang.arkStateHospital}</option>
                            <option value="HMIT4">{lang.arkHealthCenter}</option>
                            <option value="HMIT5">{lang.HumanDevCenter}</option>
                    </select>
                </div>
            </div>
        </div>
        }
        return (
            <div className="container">
                <SecondaryHeader HeadingName={lang.HeadingName}/>
                <div className="blockUnderline"></div>
                <ErrorMessage errors={this.state.errorMessages}/>
                <div style={{paddingBottom: '2%'}}>
                    <span className="required">* Indicates a required field</span>
                    < p>{lang.SubHeadingName}</p>
                </div>
                <form ref='specialHealthNeed_form' onSubmit={this.handleSubmit.bind(this)}  >
                    <div className="row addIncomeFormDivStyle">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <label>{lang.disability}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                        </div>   
                        <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                            <select name="disabilityType" value= {this.state.disabilityType} ref="disabilityType" type="select" title={lang.disability} className="form-control" id="disabilityType" onChange={this.handleDisabilityTypeValues.bind(this)} required>
                                <option defaultValue>--Please Select--</option>
                                <option value="DT2">{lang.permanentDisable}</option>
                                <option value="EEFDT2">{lang.temporaryDisability}</option>
                            </select>
                        </div>
                    </div>
                    <div className="row addIncomeFormDivStyle">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <label>{lang.liveInMedicalInst}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                        </div>   
                        <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                            <select name="isLiveInMedicalInst" value= {this.state.isLiveInMedicalInst} ref="isLiveInMedicalInst" type="select" title={lang.liveInMedicalInst} className="form-control" id="isLiveInMedicalInst" onChange={this.handleisLiveInMedicalInst.bind(this)} required>
                                <option defaultValue>--Please Select--</option>
                                <option value="YN1">Yes</option>
                                <option value="YN2">No</option>
                            </select>
                        </div>  
                    </div>
                    {typeOfMedicalInstitution}
                    <div style={{marginBottom: 20}}></div>
                    <div className="row addIncomeFormDivStyle" >
                        <div className="col-md-11 col-sm-7 col-xs-6">
                            <ButtonFunctionality ButtonName={lang.cancel} redirectTo="AddExemptionWorkActivity" dstClassName="btn buttonBack1"/>            
                        </div> 
                        <div className="col-md-1 col-sm-5 col-xs-6 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
                                <ButtonFunctionality ButtonName="Save" redirectTo={this.state.redirectTo} disabled={this.state.disabled} dstClassName="btn buttonBack1 marginLeftForButtons" data={data}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
    specialHealthNeedsResponse: store.specialHealthNeeds,
    evidences:store.evidences,
    pageDetails: store.pageDetailsReducer
    };
}

export default connect(mapStateToProps,{specialHealthNeedsInformation,getStatus,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(SpecialHealthNeeds);