import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import React from 'react'
import { connect } from 'react-redux'
import SecondaryHeader from './components/SecondaryHeader'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { pregnancyInformation } from '../actions/pregnancyAction'
import  * as locales from './PregnancyInformationPageProperties'
import ErrorMessage from './components/ErrorMessage'
import CustomDateRange from '../utilities/CustomDateRange'
import PhoneNumberComponent from '././components/PhoneNumberComponent'
import EvidenceAddressComponent from './components/EvidenceAddressComponent.js'
import moment from 'moment-es6';
import {dateToYYYYMMDD,getFormattedDateOfBirth} from '../actions/CommonActions'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class PregnancyInformation extends React.Component{
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Pregnancy Information Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        let dueDate;
        let pregnancyEndDate;
        if(props.location.data) {
            dueDate = props.location.data.data.dueDate!==''?moment(props.location.data.data.dueDate).format('YYYY-MM-DD'):undefined
            pregnancyEndDate = props.location.data.data.pregnancyEndDate!==''?moment(props.location.data.data.pregnancyEndDate).format('YYYY-MM-DD'):undefined
        }            
        this.state = {
            redirectTo:'',
            noOfUnborn: props.location.data?props.location.data.data.noOfUnborn:'',
            errorMessages:[],
            dueDate: dueDate,
            disabled:'',
            pregnancyEndDate: pregnancyEndDate,
            enrolledOnMedicaidDuringPregnancy: props.location.data?props.location.data.data.enrolledOnMedicaidDuringPregnancy:undefined,
            index:this.props.location.data?this.props.location.data.data.index:undefined
        }
    }
    componentWillUnmount(){
        let pageEndTime =moment();
        var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
        var PageTimeEnd = duration.asSeconds();  
        this.props.setSessionTime(PageTimeEnd)
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Pregnancy Information Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
      componentDidMount(){
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)
     }
    handlePregnancyValues(){
        this.setState({
            noOfUnborn: this.refs.noOfUnborn.value,
            dueDate:  this.refs.dueDate.value!=='' ?this.refs.dueDate.value:'',
            pregnancyEndDate: this.refs.pregnancyEndDate.value!=='' ? this.refs.pregnancyEndDate.value:'',
            enrolledOnMedicaidDuringPregnancy: this.refs.enrolledOnMedicaidDuringPregnancy.value
        })
        
    }
    handleSubmit(event){
        event.preventDefault();
        return this.props.pregnancyInformation(this.state)
    }
    onMouseEnterHandler(event){
        let lang=locales.strings;
        let validationMsg = new Set();
        // Temporal variables used for validations
        let curamServerDate = moment(this.props.serverDate).add(1, 'days').format('YYYY-MM-DD')
        let emptyDate = moment('0001-01-01','YYYY-MM-DD');
        let currentDate = moment(new Date(curamServerDate),'YYYY-MM-DD');
        let limitDueDate = moment(new Date(curamServerDate),'YYYY-MM-DD').add(279, 'days');
        let limitEndDate = moment(new Date(curamServerDate),'YYYY-MM-DD').add(-182, 'days');
        let tmpUnbornBabies = this.refs.noOfUnborn.value !== '' ? this.refs.noOfUnborn.value : '0';
        let tmpDueDate = this.refs.dueDate.value !== '' ? moment(this.refs.dueDate.value, 'YYYY-MM-DD') : emptyDate;
        let tmpEndDate = this.refs.pregnancyEndDate.value !== '' ? moment(this.refs.pregnancyEndDate.value, 'YYYY-MM-DD') : emptyDate;

        if (!(tmpDueDate === emptyDate) === !(tmpEndDate === emptyDate)){
            validationMsg.add({firstMessage:lang.formatString(lang.PregDueOrEndDateAreMandatory)})
        }

        if (isNaN(tmpUnbornBabies)==='true'){
            validationMsg.add({firstMessage:lang.formatString(lang.ChildExpectedNumeric)});
        } else if (tmpUnbornBabies%1 !== 0){
            validationMsg.add({firstMessage:lang.formatString(lang.ChildExpectedNumeric)});
        } 
        
        if (tmpDueDate !== emptyDate){
            if (tmpDueDate.isAfter(limitDueDate)){
                validationMsg.add({firstMessage:lang.formatString(lang.DueDateOutOfRange)});
            }
            if (tmpDueDate.isBefore(currentDate)){
                validationMsg.add({firstMessage:lang.formatString(lang.PregDueDate),secondMessage:lang.formatString(lang.NotInPast)})
            }
            if (tmpUnbornBabies === "0"){
                validationMsg.add({firstMessage:lang.formatString(lang.ChildExpected),secondMessage:lang.formatString(lang.IsMandatory)});
            }
            if (tmpUnbornBabies > 10 ){
                validationMsg.add({firstMessage:lang.formatString(lang.ChildisExpectedNumeric)});
            }
            
        }

        if (tmpEndDate !== emptyDate){
            if (tmpEndDate.isBefore(limitEndDate)){
                validationMsg.add({firstMessage:lang.formatString(lang.PregnancyEndDate),secondMessage:lang.formatString(lang.LastSixMonth)});
            }
            if (tmpEndDate.isAfter(currentDate)){
                validationMsg.add({firstMessage:lang.formatString(lang.PregnancyEndDate),secondMessage:lang.formatString(lang.NotInFuture)})   
            }
        }

        let array = Array.from(validationMsg);
        let redirectTo;
        let disabled;
        if (array.length<=0){
            disabled = false;
            redirectTo = 'MonthlySummaryPage';
        } else{
            disabled= true;
            redirectTo = 'PregnancyInformation';
        }
        this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled});
    }
    createData(evdData){
        let displayLine2
        let displayLine1
        if(this.state.pregnancyEndDate === '0001-01-01'){
            displayLine2 = ''
        }else{
            displayLine2 = this.props.getFormattedDateOfBirth(this.state.pregnancyEndDate)
        } 
        if(this.state.dueDate === '0001-01-01'){
            displayLine1 = ''
        }else{
            displayLine1 = this.props.getFormattedDateOfBirth(this.state.dueDate)
        } 
        
        let data={
            evidenceName:"Pregnancy",
            evidenceType:"DET0026008",
            noOfUnborn: this.state.noOfUnborn === '' ? '0' : this.state.noOfUnborn,
            dueDate: this.state.dueDate ? moment(this.state.dueDate).format('YYYYMMDD') :'',
            pregnancyEndDate: this.state.pregnancyEndDate ? moment(this.state.pregnancyEndDate).format('YYYYMMDD') :'',
            enrolledOnMedicaidDuringPregnancy: this.state.enrolledOnMedicaidDuringPregnancy,
            index:this.state.index,
            displayLine1: 'Due date : ' +''+ displayLine1,
            displayLine2: 'End of post-partum: '+''+ displayLine2,
            displayLine2SecondRow: '',
            displayLine4: ''
        }
        return data;
    }
    render() {
        let lang=locales.strings;
        let data=this.createData(this.state)
        return (
            <div className="container">
                <SecondaryHeader HeadingName="Pregnancy Information"/>
                <div className="blockUnderline "></div>
				 <ErrorMessage errors={this.state.errorMessages}/>
				<span className="required">* Indicates a required field</span>
                <div style={{paddingBottom: '2%'}}>
				    <p>{lang.formTitle}</p>								
				</div>
                    <form ref='pregnancy_form' onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row addIncomeFormDivStyle">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <label>{lang.noOfUnborn}</label>
                        </div>
                        <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle ">
                            <input name="noOfUnborn" ref="noOfUnborn" value={this.state.noOfUnborn} type="number" min="0" max="9" title={lang.noOfUnborn} className="form-control" id="noOfUnborn" onChange={this.handlePregnancyValues.bind(this)} onkeydown="return false"/>
                        </div>
                    </div>
                    <div className="row addIncomeFormDivStyle">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <label>{lang.dueDate}</label>
                        </div>
                        <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                            <input name="dueDate" value={this.state.dueDate} ref="dueDate" type="date" min="0001-01-01" max="2999-12-31" title={lang.dueDate} className="form-control" id="dueDate" onChange={this.handlePregnancyValues.bind(this)} onkeydown="return false"/>
                        </div> 
                    </div>
                    <div className="row addIncomeFormDivStyle">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <label>{lang.pregnancyEndDate}</label>
                        </div>
                        <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                            <input name="pregnancyEndDate" value={this.state.pregnancyEndDate} ref="pregnancyEndDate" type="date" min="0001-01-01" max="2999-12-31" title={lang.pregnancyEndDate} className="form-control" id="pregnancyEndDate" onChange={this.handlePregnancyValues.bind(this)} onkeydown="return false"/>
                        </div>
                    </div>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{lang.enrolledOnMedicaidDuringPregnancy}</label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle selectDropDownArrowStyle">
                                <select name="enrolledOnMedicaidDuringPregnancy" ref="enrolledOnMedicaidDuringPregnancy" value= {this.state.enrolledOnMedicaidDuringPregnancy} type="select" title={lang.enrolledOnMedicaidDuringPregnancy} className="form-control" id="enrolledOnMedicaidDuringPregnancy" onChange={this.handlePregnancyValues.bind(this)} >
                                    <option defaultValue>--Please Select--</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-11 col-sm-7 col-xs-7">
                                <ButtonFunctionality ButtonName={lang.cancel} redirectTo="AddExemptionWorkActivity" dstClassName="btn buttonBack1"/>
                            </div>
                            <div className="col-md-1 col-sm-5 col-xs-5 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)} >
                                <ButtonFunctionality ButtonName={lang.save} disabled={this.state.disabled} redirectTo={this.state.redirectTo} dstClassName="btn buttonBack1 marginLeftForButtons" data={data}/>
                            </div>
                        </div>
                    </form>
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
    specialHealthNeedsResponse: store.pregnancy,
    pageDetails: store.pageDetailsReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        pregnancyInformation:pregnancyInformation
    };
}

export default connect(mapStateToProps,{pregnancyInformation,dateToYYYYMMDD,getFormattedDateOfBirth,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(PregnancyInformation);