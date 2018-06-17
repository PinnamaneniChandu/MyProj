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
import { updateAddress } from '../actions/informationAction'
import  * as locales from './RemoveContactInfoConfirmationProperties'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';

class RemoveContactInfoConfirmationPage extends React.Component{
  constructor(props){
    super(props);
    var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
    this.props.setRequestTime(reqeustTime)
    var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
    this.props.setStartSessionTime(startSessionTime)
    //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Remove ContactInfo Confirmation page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
    let address = this.props.location.data.data.contactData?this.formatRemoveContact(this.props.location.data.data,this.props.location.data.data.contactData.evidenceType,'address' ,'remove'):undefined
    let phoneNumber = this.props.location.data.data.phoneAreaCode?this.formatRemoveContact(this.props.location.data.data,'PDC0000256','phoneNumber' ,'remove'):undefined
    this.state={
      addressDetails:address,
      phoneNumber: phoneNumber,
      page:'RemoveContactPage'      
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
   this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Remove ContactInfo Confirmation page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
 }
componentWillMount(){
    //let formattedDetails = this.formatRemoveContact(this.props.location.data.data,this.props.location.data.data.contactData.evidenceType,'address' ,'remove')
    //this.props.updateAddress(formattedDetails)
}

formatRemoveContact(updatedAddressAndPersons,evidenceType,contactType,operationType){
    let personsEvidenceDetails= {
      evidencesdtls:{
        evidenceList:[
        ]
      },
      commonDatasdtls:{
        commonDataList:[
          {
            name:"operationType",
            value:operationType,
          },
          {
            name:"contactType",
            value:contactType,
          }
        ]
      },
      infoDtlsList:{},
      personsdtls:{
        personList:[]
      }
    }

    let evidenceList={
        evidenceType:evidenceType,
        evidenceDataList:[]
      }
    
    for(var key in updatedAddressAndPersons){
        let nameValue={
            name:'',
            value:''
        } 
        nameValue.name=key
        nameValue.value=updatedAddressAndPersons[key];
        if(key!== 'contactData'){
        evidenceList.evidenceDataList.push(nameValue)
        }
    }

    for(var key in updatedAddressAndPersons.contactData){
        let nameValue={
            name:'',
            value:''
        } 
        nameValue.name=key
        nameValue.value=updatedAddressAndPersons[key];
        evidenceList.evidenceDataList.push(nameValue)
    }
    personsEvidenceDetails.evidencesdtls.evidenceList.push(evidenceList)
    return personsEvidenceDetails;
}

render(){
    let lang=locales.strings;
    let text 
    let header = lang.Heading
    if(this.props.location.data.data.phoneNumber !== undefined){
      if(this.props.location.data.data.phoneType === 'PH1'){
        text= 'Home Phone Number'
      }
      else if(this.props.location.data.data.phoneType === 'PH3'){      
        text= 'Mobile Phone Number'
      }      
     }
     else{
      text= 'Home Address'
    }
   
    header= 'Remove '.concat(text)
    text = 'You are removing your '.concat(text).concat('. Are you sure?')
        return(
            <div className="container">
                <SecondaryHeader HeadingName={header} homeLink = 'No'/>
                    <div className="annualSummaryDiv sideHeaders" >
                      <p style={{textAlign: "center", padding: "10px 10px 10px 10px"}}>{text}</p>
                      <form ref='RemoveConfirmation_form'>
                          <div className="row" style={{padding: "10px 10px 10px 10px"}}>
                            <div className="col-md-6 col-sm-6 col-xs-6" style={{textAlign: "center"}}>
                              <ButtonFunctionality ButtonName={lang.ButtonCancel} redirectTo="InformationPage" dstClassName="btn btn-lg-md btn-lg-sm btn-lg-xs buttonBack1"/>            
                          </div>
                          <div className="col-md-6 col-sm-6 col-xs-6" style={{textAlign: "center"}}>
                            <ButtonFunctionality ButtonName={lang.ButtonNext} redirectTo="ProcessingContactInformation" dstClassName="btn btn-lg-md btn-lg-sm btn-lg-xs buttonBack1" data={this.state} />
                          </div>
                        </div>
                      </form>    
                    </div>
            </div>
                
        );
    }
}


function mapStateToProps (state) {
    return{
      contact : state.contact,
      addressAndpersons: state.addressAndpersons,
      emailAddress: state.emailAddress,
      phone: state.phoneNumber,
      pageDetails: state.pageDetailsReducer
    }
  }
  
  
  export default connect(mapStateToProps, { updateAddress,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(RemoveContactInfoConfirmationPage)
