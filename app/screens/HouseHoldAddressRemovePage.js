import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React, {PropTypes} from 'react'
import SecondaryHeader from './components/SecondaryHeader'
import Moment from 'moment'
import {fetchMembers} from '../actions/HHMembersAction'
import {getHHMembers} from '../actions/CommonActions'
import {connect} from 'react-redux'
import  * as locales from './HouseHoldAddressRemoveProperties'
import astrisk from '../assets/astrisk.png'
import ErrorMessage from './components/ErrorMessage'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class HouseHoldAddressRemovePage extends React.Component{


    constructor(props){
        super(props);
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'HouseHold Address Remove page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        
        this.state={
            contactData:this.props.location.data.data,
            homeless:'',
            stateResident:'',
            tempAbs:'',            
            redirectTo:'',
            errorMessage:'You cannot remove a home address if you are not homeless',
            errorMessages:[],
            disabled:''
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'HouseHold Address Remove page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
        handleRemoveAddressValues(e){
            this.setState({homeless: this.refs.HOMELESS.value})
        }
        handleStateResidentValues(e){
            this.setState({stateResident: this.refs.STATERESIDENT.value})
        }
        handleTempAbsValues(e){
            this.setState({tempAbs: this.refs.TEMPABS.value})
        }
        componentWillMount(){
        }
		
        
        createData(){
            let data = {
                homeless:this.state.homeless,
                stateResident:this.state.stateResident,
                tempAbs:this.state.tempAbs,
                errorMessage:this.state.errorMessage,
                contactData:this.state.contactData
        } 
        return data;
        }
		onMouseEnterHandler(event){  
            let set = new Set();
            let lang=locales.strings;
            if(this.state.homeless === '--Please Select--' || this.state.homeless === ''){
                set.add({key:1,firstMessage:lang.formatString(lang.homelessMessage),secondMessage:lang.formatString(lang.IsMandatory)})   
            }
            if(this.state.homeless === 'Yes' && this.state.homeless !== '' && (this.state.stateResident === '--Please Select--' || this.state.stateResident === '') ){
                set.add({key:2,firstMessage:lang.formatString(lang.stateResidentMessage),secondMessage:lang.formatString(lang.IsMandatory)})   
            }
            if(this.state.stateResident === 'No' && this.state.stateResident !== '' && (this.state.tempAbs === '--Please Select--' || this.state.tempAbs === '') ){
                set.add({key:3,firstMessage:lang.formatString(lang.tempAbsMessage),secondMessage:lang.formatString(lang.IsMandatory)})   
            }
            
                let array = Array.from(set)
                let redirectTo
                let disabled 
                if(array.length<=0){
                    redirectTo =this.state.homeless==="No"?'RemoveContactInfoErrorPage' :'RemoveCIConfirmation' 
                    disabled=false
                }
                else{
                    redirectTo ='HHAddressRemove'
                    disabled=true
                }
                this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})
        }

		
		
render(){
    let lang=locales.strings;
    let headerName='';
    let data=this.createData();
    let redirectTo= this.state.homeless==="No"?'RemoveContactInfoErrorPage' :'RemoveCIConfirmation'
    if(this.props.location){
        if(this.props.location.data.data.addressType === 'AT1' && this.props.location.data.data.evidenceType==='PDC0000261')
            {
                headerName='Home Address'
            }
        else if(this.props.location.data.data.addressType === 'AT4' && this.props.location.data.data.evidenceType==='PDC0000261')
            {
                headerName='Mailing Address'
            }
        else if(this.props.location.data.data.addressType === 'AT1' && this.props.location.data.data.evidenceType==='PDC0000261')
            {
                headerName='Mailing Address'
            }
        else if(this.props.location.data.data.addressType === 'AT1' && this.props.location.data.data.evidenceType==='PDC0000261')
            {
                headerName='Mailing Address'
            }
            headerName='Remove '.concat(headerName)
    }

    let stateResidence
    if(this.state.homeless==="Yes"){
        stateResidence =<div>
        <div className="row addIncomeFormDivStyle">
        <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="col-md-4 col-sm-12 col-xs-12">
            <label>{lang.STATERESIDENT}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
        </div>
        <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
          <select name="STATERESIDENT" ref="STATERESIDENT" type="select" className="form-control" id="*"  onMouseOut={this.handleStateResidentValues.bind(this)} onChange={this.handleStateResidentValues.bind(this)} required>
            <option defaultValue>--Please Select--</option>
            
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </select> 
        </div>
        </div>
    </div>
    </div>
    }

    let homeless
    if(this.state.stateResident==="No"){
        homeless =<div>
        <div className="row addIncomeFormDivStyle">
        <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="col-md-4 col-sm-12 col-xs-12">
            <label>{lang.TEMPABS}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
        </div>
        <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
        <select name="TEMPABS" ref="TEMPABS" type="select" className="form-control" id="TEMPABS" onChange={this.handleTempAbsValues.bind(this)}  onMouseOut={this.handleTempAbsValues.bind(this)} required>
            <option defaultValue>--Please Select--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </select> 
        </div>
        </div>
    </div>
    </div>
    }

        return(
            <div className="container">
                <SecondaryHeader HeadingName={headerName} homeLink = 'No'/>
                <div className="blockUnderline"></div>
                <ErrorMessage errors={this.state.errorMessages}/>
                <span className="required">* Indicates a required field</span>
                    <div>
                        <p className="volunteerForm-enterInformation-Paragraph">
                            {lang.headerNote}
                        </p>
                                
                        <form ref='RemoveHomeAddress_form' style={{padding:"30px"}}>
                            <div style={{paddingLeft: "15%"}}>
                            </div> 
            <div className="row addIncomeFormDivStyle">
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <label>{lang.HOMELESS}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
              <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
              <select name="HOMELESS" ref="HOMELESS" type="select" className="form-control" id="HOMELESS" onChange={this.handleRemoveAddressValues.bind(this)} onMouseOut={this.handleRemoveAddressValues.bind(this)} onChange={this.handleRemoveAddressValues.bind(this)} required>
              <option defaultValue>--Please Select--</option>
                
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                </select> 
              </div>
            </div>
          </div>

          {stateResidence}          
          {homeless}

          <div className="row addIncomeFormDivStyle">
          <div className="col-md-12 col-sm-6 col-xs-6">
          <div className="col-md-10 col-sm-10 col-xs-10">
              <ButtonFunctionality ButtonName={lang.ButtonCancel} redirectTo="InformationPage" dstClassName="btn btn-lg-md btn-lg-sm btn-lg-xs buttonBack1"/>            
            </div>
          
            <div className="col-md-2 col-sm-2 col-xs-2 buttonAlignRight" onMouseOver={this.onMouseEnterHandler.bind(this)}>
              <ButtonFunctionality ButtonName={lang.ButtonNext} redirectTo={redirectTo} dstClassName="btn btn-lg-md btn-lg-sm btn-lg-xs buttonBack1" data={data} disabled={this.state.disabled}/>
            </div>
           </div>
             </div>
        </form>    
                                
          </div>

          </div>
                
        );
    }
}

function mapStateToProps(store) {
    return {
    pageDetails: store.pageDetailsReducer
    };
}

export default connect(mapStateToProps, {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(HouseHoldAddressRemovePage)

