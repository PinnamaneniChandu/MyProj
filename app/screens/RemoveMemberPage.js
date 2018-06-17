import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import astrisk from '../assets/astrisk.png'
import React from 'react';
import { connect } from 'react-redux'
import SecondaryHeader from './components/SecondaryHeader'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { removeMemberInformation } from '../actions/removePersonAction'
import {addEvd, getFormattedDateOfBirth,dateToYYYYMMDD} from '../actions/CommonActions'
import {addEvidence} from '../actions/evidenceAction'
import moment from 'moment-es6';
import ErrorMessage from './components/ErrorMessage'
import * as locales from './RemoveMemberPageProperties'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class RemoveMember extends React.Component {
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Remove Member Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        this.state = {
            reason:"",
            dateOfDeath:'00010101',
            name:"",
            concernRoleID:"",
            dateOfBirth:"",
            evidenceType:"",
            redirectTo:'',
            page:'RemoveMember',
            errorMessages:[],
            redirectTo:'',
            disabled:'',
            year:''
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
       this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Remove Member Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
     }
    onMouseEnterHandler(event){     
                let lang=locales.strings;     
                let set = new Set();
                let DoYouHaveSSN
                for (var key in this.state) {
                    if(key==='reason' && (this.state[key]==='' || this.state[key]==='-Select-')){
                        set.add({key:key,firstMessage:lang.formatString(lang.Reason),secondMessage:lang.formatString(lang.IsMandatory)})   
                    }
                    else if(key==='reason' && this.state[key]==='MemberDeceased'){
                            if(this.state['dateOfDeath']==='' || this.state['dateOfDeath']===undefined || this.state['dateOfDeath']==='Invalid Date' ){
                                set.add({key:key,firstMessage:lang.formatString(lang.DOD),secondMessage:lang.formatString(lang.IsMandatory)})   
                            }
                            else if(!moment(this.state['dateOfDeath'], 'YYYYMMDD', true).isValid()){
                                set.add({key:key,
                                    firstMessage:lang.formatString(lang.DODFormat)
                                    ,secondMessage:lang.formatString(lang.Blank)
                                }) 
                            }
                            else if(this.state['dateOfDeath']>moment(this.props.serverDate).format('YYYYMMDD')){
                                set.add({key:key,firstMessage:lang.formatString(lang.DOD),secondMessage:lang.formatString(lang.NotInFuture)}) 
                            }                           
                    }                    
                    let array = Array.from(set)
                    let redirectTo
                    let disabled
                    if(array.length<=0){
                        redirectTo = 'HouseHoldInformation'
                        disabled=false
                    }
                    else{
                        redirectTo = 'RemoveMember'
                        disabled=true
                    }
                    this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})                                        
                }
        
            }

    handleRemoveMember(member){ 
        this.setState({reason: this.refs.reasonForRemoveMember.value,
            dateOfBirth:moment(member.dateOfBirth).format('YYYYMMDD') ,
            concernRoleID:member.concernRoleID,
            name:member.name,
            evidenceType:'EEFDET0024'
        });
    }
    removeMemberValues(member){      
        let year=moment(this.props.serverDate).format('YYYY')  
        let dateOfDeath=this.refs.dateOfDeath?this.props.dateToYYYYMMDD(this.refs.dateOfDeath.value):this.state.dateOfDeath
        this.setState({dateOfDeath: dateOfDeath,
            dateOfBirth:moment(member.dateOfBirth).format('YYYYMMDD') ,
            concernRoleID:member.concernRoleID,
            name:member.name,
            evidenceType:'EEFDET0024',
            year:year
        })        
    }
    render() {
    let lang=locales.strings;
    let member=this.props.location.state?this.props.location.state.data:''
    let memberDateOfBirth = this.props.getFormattedDateOfBirth(member.dateOfBirth)
    let reasonForDeath;
    if(this.state.reason === 'MemberDeceased'){
        reasonForDeath = <div className="row addIncomeFormDivStyle">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.DOD}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span> </label>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12">
                                    <input name="dateOfDeath" ref="dateOfDeath" type="date" className="form-control" id="dateOfDeath" onMouseOut={this.removeMemberValues.bind(this,member)} onChange={this.removeMemberValues.bind(this,member)} required/>
                                </div>
                            </div>
    } // End of If-Statement
        return (
            <div className="container">
                <SecondaryHeader HeadingName={lang.RemoveMember}/>
                <div className="blockUnderline"></div>
                
                <div className="annualSummaryDiv ">
                <ErrorMessage errors={this.state.errorMessages}/>
                <span className="required col-md-12 col-sm-12 col-xs-12">* Indicates a required field</span>
                    <div className="RemoveMemberPage-divStyle" style={{paddingLeft: '10px'}}>
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <span ><b>{lang.MemberName}</b></span>
                                <span >{member.name}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <span ><b>{lang.DOB}</b></span>
                                <span >{memberDateOfBirth}</span>
                            </div>
                        </div>
                    </div>
                   
                    <div style={{paddingBottom: '1%'}}>
                    <p>{lang.ReasonRemoval}</p>                    
                    </div>
                    
                        
                        <form ref='removeMember_form'>
                        
                        <div className="row addIncomeFormDivStyle">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <label>{lang.Reason}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12 selectDropDownArrowStyle">
                                    <select name="reasonForRemoveMember" ref="reasonForRemoveMember" type="select" className="form-control" id="reasonForRemoveMember" onMouseOut={this.removeMemberValues.bind(this,member)} onChange={this.handleRemoveMember.bind(this,member)} required>
                                        <option default>{lang.Select}</option>
                                        <option value="MemberDeceased">{lang.MemberDeceased}</option>
                                        <option value="NoLongerInHome">{lang.NotHome}</option>
                                    </select>
                                </div>
                        </div>        
                            {reasonForDeath}
                            <div className="row addIncomeFormDivStyle" >                            
                                    <div className="col-md-6 col-sm-6 col-xs-6" >
                                        <ButtonFunctionality ButtonName="Cancel" redirectTo="HouseHoldInformation" dstClassName="btn button-text buttonBack1"/>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6 buttonAlignRight"  onMouseOver={this.onMouseEnterHandler.bind(this)}>
                                        <ButtonFunctionality ButtonName="Save" redirectTo={this.state.redirectTo} dstClassName="btn button-text buttonBack1" data={this.state} disabled={this.state.disabled}/>
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
    evidences:store.evidences,
    pageDetails: store.pageDetailsReducer
    };
}
export default connect(mapStateToProps,{removeMemberInformation,addEvd,addEvidence, getFormattedDateOfBirth,dateToYYYYMMDD,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(RemoveMember);