import React from 'react'
import '../CSS/App-DesktopsScreen.css'
import { connect } from 'react-redux'
import { updateAddress, updateEmailAddress, updatePhoneNumber,clearContact , updatePreferredContact} from '../actions/informationAction'
import InformationPage from './InformationPage.js'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import SecondaryHeader from './components/SecondaryHeader'
import ContactInfoFailurePage from './ContactInformationFailurePage'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class ProcessingContactInformation extends React.Component {
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Processing Contact Information page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        this.state = {
          loading : true
      }
      this.props.clearContact();
    }
    componentWillUnmount(){
      let pageEndTime =moment();
      var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
      var PageTimeEnd = duration.asSeconds();  
      this.props.setSessionTime(PageTimeEnd)
      this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Processing Contact Information page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString()) 
   }
   componentDidMount(){
    var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
    this.props.setResponseTime(responseTime)
  }
    componentWillMount() {
      setTimeout(() => this.setState({ loading: false }), 10000); 
        let contactDetails = this.props.location.data ? this.props.location.data.data : undefined
        if(contactDetails !== undefined  ){
          if(contactDetails.contactType === 'ADDRESS'){
            let formattedAddres=this.formatUpdateContact(contactDetails,'PDC0000261','address','create')
            this.props.updateAddress(formattedAddres)
          } else if(contactDetails.contactType === 'EMAIL'){
            let formattedEmailAddress=this.formatUpdateContact(contactDetails,'PDC0000260','email','create')
            this.props.updateEmailAddress(formattedEmailAddress)
          } else if(contactDetails.contactType === 'PHONE'){
            let formattedPhoneNumber=this.formatUpdateContact(contactDetails,'PDC0000256','phoneNumber','create')
            this.props.updatePhoneNumber(formattedPhoneNumber)
          }else if(contactDetails.page === 'RemoveContactPage'){
            if(contactDetails.addressDetails !== undefined){
            this.props.updateAddress(contactDetails.addressDetails);
            }
            else if(contactDetails.phoneNumber !== undefined){
              this.props.updateAddress(contactDetails.phoneNumber);
            }
            
          }
          else if(contactDetails.contactType === 'Preferred_Contact_Method')
            {
          
              let formattedPreferredContact=this.formatUpdateContact(contactDetails,'PDC0000263','PreferredCommunicationMethod','create')
              this.props.updatePreferredContact(formattedPreferredContact)
            }
        }else{
          }
      } 

      render(){
        let operationDetails, operationStatus, informationPageDisplay
        operationDetails = undefined
        
        //////////////////// Address /////////////////////////////

        if(this.props.addressOperationStatus.addressOperationStatus !== "error"){
          if(this.props.addressOperationStatus !== undefined){
            if(this.props.addressOperationStatus.addressOperationStatus.commondatadtls !== '' && this.props.addressOperationStatus.addressOperationStatus.commondatadtls!== null && this.props.addressOperationStatus.addressOperationStatus.commondatadtls !== undefined){
              operationDetails = this.props.addressOperationStatus.addressOperationStatus.commondatadtls.commonDataList
              operationDetails.map((nameValue) => {
                if(nameValue.name === 'operationStatus'){
                  operationStatus = nameValue.value
                }
              })
            }
          }
        } else if(this.props.addressOperationStatus.addressOperationStatus === "error"){
          operationStatus = false
        }
        

        //////////////////// Email /////////////////////////////
        if(this.props.emailAddress.email !== "error"){
        if(this.props.emailAddress !== undefined){
          if(this.props.emailAddress.email.commondatadtls !== '' && this.props.emailAddress.email.commondatadtls !== null && this.props.emailAddress.email.commondatadtls !== undefined){
            operationDetails = this.props.emailAddress.email.commondatadtls.commonDataList
            operationDetails.map((nameValue) => {
              if(nameValue.name === 'operationStatus'){
                operationStatus = nameValue.value
              }
            })
          }
        }
      } else if(this.props.emailAddress.email === "error"){
          operationStatus = false
        }
        

        //////////////////// Phone /////////////////////////////
        if(this.props.phoneNumber.phoneNumber !== "error"){
        if(this.props.phoneNumber !== undefined ){
          if(this.props.phoneNumber.phoneNumber.commondatadtls !== '' && this.props.phoneNumber.phoneNumber.commondatadtls !== null && this.props.phoneNumber.phoneNumber.commondatadtls !== undefined){
            operationDetails = this.props.phoneNumber.phoneNumber.commondatadtls.commonDataList
            operationDetails.map((nameValue) => {
              if(nameValue.name === 'operationStatus'){
                operationStatus = nameValue.value
              }
            })
          }
        }
      } else if(this.props.phoneNumber.phoneNumber === "error"){
        operationStatus = false
      }


       //////////////////// Preferred Contact Method /////////////////////////////
       if(this.props.preferredContact.preferredContact !== "error"){
        if(this.props.preferredContact !== undefined ){
          if(this.props.preferredContact.preferredContact.commondatadtls !== '' && this.props.preferredContact.preferredContact.commondatadtls !== null && this.props.preferredContact.preferredContact.commondatadtls !== undefined){
           
            operationDetails = this.props.preferredContact.preferredContact.commondatadtls.commonDataList
            operationDetails.map((nameValue) => {
              if(nameValue.name === 'operationStatus'){
                operationStatus = nameValue.value
              }
            })
          }
        }
      } else if(this.props.preferredContact.preferredContact === "error"){
        operationStatus = false
      }





        let informationButtonDisplay = <div><h4>Processing your request....</h4></div>
        const { loading } = this.state
        if(operationDetails !== undefined && operationStatus === 'true'){
          if(loading) {
            informationButtonDisplay = <div><h4>Processing your request....</h4></div>
            return informationButtonDisplay
          }
            informationButtonDisplay =  <div className="container">
                <SecondaryHeader HeadingName=''/>
                <div className="blockUnderline"></div>
                <div className = 'annualSummaryDiv welcomeUserGreeting'>
                <h4>Your Information has been Updated.</h4>
                <ButtonFunctionality ButtonName='Ok' redirectTo="InformationPage" dstClassName="btn button-text buttonBack1  overflow-visible" />
              </div>
            </div>
        }else if(operationStatus === false){
          informationButtonDisplay = <ContactInfoFailurePage/>
        }
        return(
            <div>
              {informationButtonDisplay}
            </div>
        )   
      }



    
    formatUpdateContact(updatedAddressAndPersons,evidenceType,contactType,operationType){
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
        for (var key in updatedAddressAndPersons)
          {   
            if(key==='address'){
              let evidenceList={
                evidenceType:evidenceType,
                evidenceDataList:[]
              }
              for (var key in updatedAddressAndPersons.address)
                {
                  let nameValue = {
                    name:'',
                    value:''
                  }            
                  nameValue.name=key
                  nameValue.value=updatedAddressAndPersons.address[key]
                  evidenceList.evidenceDataList.push(nameValue)
                }
                personsEvidenceDetails.evidencesdtls.evidenceList.clear
                personsEvidenceDetails.evidencesdtls.evidenceList.push(evidenceList)
            }
            if(key==='members'){
              updatedAddressAndPersons.members.map((person)=>{
                let personDataList={personDataList:[]}
                for (var key in person)
                  {
                    let nameValue = {
                      name:'',
                      value:''
                    }            
                    nameValue.name=key
                    nameValue.value=person[key]
                    personDataList.personDataList.push(nameValue);
                    
                  }
                  personsEvidenceDetails.personsdtls.personList.push(personDataList)
              } )
            }
            if(key==='emailAddress' && key !=='contactType'){
              let evidenceList={
                evidenceType:evidenceType,
                evidenceDataList:[]
              } 
              for(var key in updatedAddressAndPersons){
                if(key !=='contactType'){
                  let nameValue = {
                    name:'',
                    value:''
                  }            
                  nameValue.name=key
                  nameValue.value=updatedAddressAndPersons[key]
                  evidenceList.evidenceDataList.push(nameValue)
                }
              }
              personsEvidenceDetails.evidencesdtls.evidenceList.push(evidenceList)
            }
            if(key==='PersonalPhoneData' && key !=='contactType'){
                let evidenceList={
                evidenceType:evidenceType,
                evidenceDataList:[]
              } 
              for(var key in updatedAddressAndPersons.PersonalPhoneData){
                if(key !=='contactType'){
                  let nameValue = {
                    name:'',
                    value:''
                  }            
                  nameValue.name=key
                  nameValue.value=updatedAddressAndPersons.PersonalPhoneData[key]
                  evidenceList.evidenceDataList.push(nameValue)
                }
              }
              personsEvidenceDetails.evidencesdtls.evidenceList.push(evidenceList)
            }        
            if(key==='MobilePhoneData' && key !=='contactType'){
                let evidenceList={
                evidenceType:evidenceType,
                evidenceDataList:[]
              } 
              for(var key in updatedAddressAndPersons.MobilePhoneData){
                if(key !=='contactType'){
                  let nameValue = {
                    name:'',
                    value:''
                  }            
                  nameValue.name=key
                  nameValue.value=updatedAddressAndPersons.MobilePhoneData[key]
                  evidenceList.evidenceDataList.push(nameValue)
                }
              }
              personsEvidenceDetails.evidencesdtls.evidenceList.push(evidenceList)
            }




            if(key==='preferedType') // && key !=='contactType' 
              {
                
                let evidenceList={
                  evidenceType:evidenceType,
                  evidenceDataList:[]
                } 
                
                
                  if(key !=='contactType'){
                    let nameValue = {
                      name:'',
                      value:''
                    }            
                    nameValue.name='PreferredCommunicationMethod'
                    nameValue.value=updatedAddressAndPersons.preferedType
                    evidenceList.evidenceDataList.push(nameValue)
                  }
                
                personsEvidenceDetails.evidencesdtls.evidenceList.push(evidenceList)


              }

          }
        return personsEvidenceDetails;
      }
}

function mapStateToProps (store) {
  return{
    addressOperationStatus: store.addressOperationStatus,
    phoneNumber : store.phoneNumber,
    emailAddress: store.emailAddress,
    pageDetails: store.pageDetailsReducer,
    preferredContact : store.preferredContact
  }
}


export default connect(mapStateToProps, { updateAddress, updateEmailAddress, updatePhoneNumber,clearContact,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime,updatePreferredContact})(ProcessingContactInformation)