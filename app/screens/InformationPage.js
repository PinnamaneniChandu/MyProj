import React from 'react'
import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import { connect } from 'react-redux'
import * as locales from './InformationPageProperties'
import { fetchContact, updateAddress, updateEmailAddress, updatePhoneNumber,clearAddressOperation, clearEmailAddressOperation, clearPhoneNumberOperation } from '../actions/informationAction'
import { searchValueForName } from '../actions/CommonActions'
import {getCTList, getCTDetails, getCTDescription} from '../actions/CTAction'
import { getInfoInList,getPreferedList} from '../actions/CommonActions'
import { contactInfo} from '../actions/CommonActions'
import AnchorFunctionality from '../ClickFunc/AnchorFunctionality'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import UnsubmittedInformation from './UnsubmittedInformationPage.js'
import SecondaryHeader from './components/SecondaryHeader'
import ErrorMessage from './components/ErrorMessage'
import {fetchMembers} from '../actions/HHMembersAction'
import {getHHMembers} from '../actions/CommonActions'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class InformationPage extends React.Component{

  constructor(props){
    
    super(props);
    
    var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
    this.props.setRequestTime(reqeustTime)
    var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
    this.props.setStartSessionTime(startSessionTime)
	this.props.getCTList()
    this.props.fetchContact()  
    this.props.fetchMembers()
      this.state = {
        loading : true,
        isUpdated : false,
        errorMessages:[],
        pAddressChangeRedirectTo:'HHAddressChange',
        pAddressRemoveRedirectTo:'HHAddressRemove',
        mAddressChangeRedirectTo:'HHAddressChange',
        mAddressRemoveRedirectTo:'RemoveContactInfoErrorPage',
        pPhoneChangeRedirectTo:'PhoneNumber',
        pPhoneRemoveRedirectTo:'RemoveCIConfirmation',
        mPhoneChangeRedirectTo:'PhoneNumber',
        mPhoneRemoveRedirectTo:'RemoveCIConfirmation',
        emailAddressChangeRedirectTo:'EmailAddress',
        emailAddressRemoveRedirectTo:'RemoveContactInfoErrorPage',
    }
    this.props.clearAddressOperation();
    this.props.clearEmailAddressOperation();
    this.props.clearPhoneNumberOperation();
   
  }

  componentWillMount() {
    setTimeout(() => this.setState({ loading: false }), 1500)

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
    this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Information page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
  }
  
  onMouseEnterHandler(event) {
    let lang = locales.strings
    let set = new Set();
    if (this.props.isPendingApp === 'Yes') {
      set.add({ key: 1, firstMessage: lang.pendingApplication, secondMessgae: lang.Blank })
    }
    let array = Array.from(set)

    let pAddressChangeRedirectTo = array.length <= 0 ? 'HHAddressChange' : 'InformationPage'
    let pAddressRemoveRedirectTo = array.length <= 0 ? 'HHAddressRemove' : 'InformationPage'
    let mAddressChangeRedirectTo = array.length <= 0 ? 'HHAddressChange' : 'InformationPage'
    let mAddressRemoveRedirectTo = array.length <= 0 ? 'RemoveContactInfoErrorPage' : 'InformationPage'
    let pPhoneChangeRedirectTo = array.length <= 0 ? 'PhoneNumber' : 'InformationPage'
    let pPhoneRemoveRedirectTo = array.length <= 0 ? 'RemoveCIConfirmation' : 'InformationPage'
    let mPhoneChangeRedirectTo = array.length <= 0 ? 'PhoneNumber' : 'InformationPage'
    let mPhoneRemoveRedirectTo = array.length <= 0 ? 'RemoveCIConfirmation' : 'InformationPage'
    let emailAddressChangeRedirectTo = array.length <= 0 ? 'EmailAddress' : 'InformationPage'
    let emailAddressRemoveRedirectTo = array.length <= 0 ? 'RemoveContactInfoErrorPage' : 'InformationPage'

    this.setState({
      errorMessages: array, pAddressChangeRedirectTo: pAddressChangeRedirectTo,
      pAddressRemoveRedirectTo: pAddressRemoveRedirectTo,
      mAddressChangeRedirectTo: mAddressChangeRedirectTo,
      mAddressRemoveRedirectTo: mAddressRemoveRedirectTo,
      pPhoneChangeRedirectTo: pPhoneChangeRedirectTo,
      pPhoneRemoveRedirectTo: pPhoneRemoveRedirectTo,
      mPhoneChangeRedirectTo: mPhoneChangeRedirectTo,
      mPhoneRemoveRedirectTo: mPhoneRemoveRedirectTo,
      emailAddressChangeRedirectTo: emailAddressChangeRedirectTo,
      emailAddressRemoveRedirectTo: emailAddressRemoveRedirectTo
    })
  }
  
  render(){
    let lang=locales.strings, result, infoUpdate = ''
    let HomeAddressDisplay
    if(this.props.contact.contact !== '' && this.props.contact.contact !== null && this.props.contact.contact !== undefined ){
      let privateAddress=this.props.getInfoInList(this.props.contact.contact,'PDC0000261','addressType','AT1')
      let mailingAddress=this.props.getInfoInList(this.props.contact.contact,'PDC0000261','addressType','AT4')
      let emailAddress=this.props.getInfoInList(this.props.contact.contact,'PDC0000260','emailAddressType','ET2')
      let homePhoneNumber=this.props.getInfoInList(this.props.contact.contact,'PDC0000256','phoneType','PH1')
      let mobilePhoneNumber=this.props.getInfoInList(this.props.contact.contact,'PDC0000256','phoneType','PH3')
      let preferedContactMethod =  this.props.getPreferedList(this.props.contact.contact, 'PDC0000263')
  
      let privateCountyCode = this.props.searchValueForName(privateAddress,'USCOUNTY'), privateCountyDescription, codeTablesListData, mailingCountyDescription
      let mailingCountyCode = this.props.searchValueForName(mailingAddress,'USCOUNTY')
      let headingName = lang.welcome +','+ ' ' +this.props.userName
      if(this.props.codeTableValue.CTList.codeTableDetails !== '' && this.props.codeTableValue.CTList.codeTableDetails !== null && this.props.codeTableValue.CTList.codeTableDetails !== undefined){
        codeTablesListData = this.props.codeTableValue.CTList
        if(privateCountyCode !== null && privateCountyCode !== '' && privateCountyCode !== undefined){
          privateCountyDescription = this.props.getCTDescription(codeTablesListData, 'AddressUSCounty', privateCountyCode)
        }
        if(mailingCountyCode !== null && mailingCountyCode !== '' && mailingCountyCode !== undefined){
          mailingCountyDescription = this.props.getCTDescription(codeTablesListData, 'AddressUSCounty', mailingCountyCode)
        }
      }

      var renPrivateAddress={
        ADD2: this.props.searchValueForName(privateAddress,'ADD2') , 
        ADD3: this.props.searchValueForName(privateAddress,'ADD3') ,
        CITY: this.props.searchValueForName(privateAddress,'CITY') , 
        USCOUNTY: this.props.searchValueForName(privateAddress,'USCOUNTY'), 
        STATE: this.props.searchValueForName(privateAddress,'STATE'), 
        ZIP: this.props.searchValueForName(privateAddress,'ZIP'),
        addressType: 'AT1',
        reDirectTo: 'HomeAddress',
        evidenceType:'PDC0000261'
      }
      var renMailingAddress={
        ADD2: this.props.searchValueForName(mailingAddress,'ADD2') ,
        ADD3: this.props.searchValueForName(mailingAddress,'ADD3') ,
        CITY: this.props.searchValueForName(mailingAddress,'CITY') , 
        USCOUNTY: this.props.searchValueForName(mailingAddress,'USCOUNTY') , 
        STATE: this.props.searchValueForName(mailingAddress,'STATE'), 
        ZIP: this.props.searchValueForName(mailingAddress,'ZIP'),
        addressType: 'AT4',
        reDirectTo: 'MailingAddress',
        evidenceType:'PDC0000261'
      }
      var remHomePhoneNumber={
        phoneAreaCode:this.props.searchValueForName(homePhoneNumber,'phoneAreaCode'),
        phoneNumber:this.props.searchValueForName(homePhoneNumber,'phoneNumber'),
        phoneType:'PH1'
      }
      var remMobilePhoneNumber={
        phoneAreaCode:this.props.searchValueForName(mobilePhoneNumber,'phoneAreaCode'),
        phoneNumber:this.props.searchValueForName(mobilePhoneNumber,'phoneNumber'),
        phoneType:'PH3'
      }
      var renHomePhoneNumber={
        phoneAreaCode:this.props.searchValueForName(homePhoneNumber,'phoneAreaCode'),
        phoneNumber:this.props.searchValueForName(homePhoneNumber,'phoneNumber'),
        MphoneAreaCode:this.props.searchValueForName(mobilePhoneNumber,'phoneAreaCode'),
        MphoneNumber:this.props.searchValueForName(mobilePhoneNumber,'phoneNumber'),
        phoneType:'PH1'
  
      }
      var renMobilePhoneNumber={
        MphoneAreaCode:this.props.searchValueForName(mobilePhoneNumber,'phoneAreaCode'),
        MphoneNumber:this.props.searchValueForName(mobilePhoneNumber,'phoneNumber'),
        phoneAreaCode:this.props.searchValueForName(homePhoneNumber,'phoneAreaCode'),
        phoneNumber:this.props.searchValueForName(homePhoneNumber,'phoneNumber'),
        phoneType:'PH3'
      }
      var renEmailAddress={
        emailAddress:this.props.searchValueForName(emailAddress,'emailAddress')
      }

      let displayMailingAddress, displayPrivateAddress, displayPersonalNumber, displayMobileNumber

      if(renMailingAddress.ADD2 !== undefined && renMailingAddress.ADD3 !== undefined && renMailingAddress.CITY !== undefined && renMailingAddress.USCOUNTY !== undefined && renMailingAddress.STATE !== undefined && renMailingAddress.ZIP !== undefined){
        displayMailingAddress = <p>{renMailingAddress.ADD2}, {renMailingAddress.CITY}, {renMailingAddress.STATE} {renMailingAddress.ZIP}</p>
      }else{
        displayMailingAddress = ''
      }

      if(renPrivateAddress.ADD2 !== undefined && renPrivateAddress.ADD3 !== undefined && renPrivateAddress.CITY !== undefined && renPrivateAddress.USCOUNTY !== undefined && renPrivateAddress.STATE !== undefined && renPrivateAddress.ZIP !== undefined){
        displayPrivateAddress = <p>{renPrivateAddress.ADD2}, {renPrivateAddress.CITY}, {renPrivateAddress.STATE} {renPrivateAddress.ZIP}</p>
      }else{
        displayPrivateAddress = ''
      }

      if(renHomePhoneNumber.phoneAreaCode !== undefined && renHomePhoneNumber.phoneNumber !== undefined ){
        displayPersonalNumber = <p>{renHomePhoneNumber.phoneAreaCode}-{renHomePhoneNumber.phoneNumber}</p>
      }else{
        displayPersonalNumber = ''
      }

      if(renMobilePhoneNumber.MphoneAreaCode !== undefined && renMobilePhoneNumber.MphoneNumber !== undefined ){
        displayMobileNumber = <p>{renMobilePhoneNumber.MphoneAreaCode}-{renMobilePhoneNumber.MphoneNumber}</p>
      }else{
        displayMobileNumber = ''
      }
      
      
      let emailAddressValue = renEmailAddress.emailAddress, buttonFunc = '', disabled = true, mailingAddressValue = renMailingAddress.ADD2
      if(emailAddressValue !== '' && emailAddressValue !== null && emailAddressValue !== undefined && mailingAddressValue !== '' && mailingAddressValue !== null && mailingAddressValue !== undefined){
        buttonFunc = <ButtonFunctionality ButtonName={lang.confirmContinue} redirectTo="HouseHoldInformation" dstClassName="btn button-text buttonBack1  overflow-visible" disabled ={!disabled}/>
      }else {
        infoUpdate = lang.emailMailingValidMsg
        buttonFunc = <ButtonFunctionality ButtonName={lang.confirmContinue} redirectTo="HouseHoldInformation" dstClassName="btn button-text buttonBack1  overflow-visible" disabled ={disabled} />
      }
      
      
      let privateAddressRemoveField;
      if( (this.displayPrivateAddress !== null || this.displayPrivateAddress !== '') &&
          (displayPrivateAddress.props !== null &&  displayPrivateAddress.props !== '')){
            if(displayPrivateAddress !== '') {
              privateAddressRemoveField = <AnchorFunctionality AnchorText={lang.remove} redirectTo={this.state.pAddressRemoveRedirectTo} dstClassName='' data={renPrivateAddress}/>
            }
            
      }


      let mailingAddressRemoveField;
      if( (this.displayMailingAddress !== null || this.displayMailingAddress !== '') &&
          (displayMailingAddress.props !== null &&  displayMailingAddress.props !== '')){
            if(displayMailingAddress!==''){
            mailingAddressRemoveField = <AnchorFunctionality AnchorText={lang.remove} redirectTo={this.state.mAddressRemoveRedirectTo} dstClassName='' data='Mailing address'/>
      }
    }

      let phoneNumberRemoveField;
      if( (this.remHomePhoneNumber !== null || this.remHomePhoneNumber !== '') && 
        (remHomePhoneNumber.phoneAreaCode !== undefined && remHomePhoneNumber.phoneAreaCode !== '' 
          && remHomePhoneNumber.phoneNumber !== undefined && remHomePhoneNumber.phoneNumber !== ''  ) ){
        phoneNumberRemoveField = <AnchorFunctionality AnchorText={lang.remove} redirectTo={this.state.pPhoneRemoveRedirectTo} dstClassName='' data={renHomePhoneNumber}/>
      }

      let mobilePhoneNumberRemoveField;
      if( (this.renMobilePhoneNumber !== null || this.renMobilePhoneNumber !== '') && 
          (renMobilePhoneNumber.phoneAreaCode !== undefined && renMobilePhoneNumber.phoneAreaCode !== ''
          &&  renMobilePhoneNumber.phoneNumber !== undefined && renMobilePhoneNumber.phoneNumber !== '' )){
        mobilePhoneNumberRemoveField = <AnchorFunctionality AnchorText={lang.remove} redirectTo={this.state.mPhoneRemoveRedirectTo} dstClassName='' data={remMobilePhoneNumber}/>
      }

      let emailAddressRemoveField;
      if( (this.renEmailAddress !== null || this.renEmailAddress !== '') &&
          (renEmailAddress.emailAddress !== undefined && renEmailAddress.emailAddress !== '')){
            emailAddressRemoveField =  <AnchorFunctionality AnchorText={lang.remove} redirectTo={this.state.emailAddressRemoveRedirectTo} dstClassName='' data='Email address'/>
      }

      let displayPreferedContactMethod
      displayPreferedContactMethod = preferedContactMethod === 'NoPreferredMethod'? '' : preferedContactMethod

      const { loading } = this.state
      
      if(loading) {
        HomeAddressDisplay = <div><h4>Processing your request....</h4></div>
        return HomeAddressDisplay
    }else{
      /*var x = this.props.pageDetails.responseTime
      var duration = moment.duration(moment(x).diff(this.props.pageDetails.requestTime));
      var PageTimeEnd = duration.asSeconds();  
      console.log('Request difference time out ',PageTimeEnd)
      */HomeAddressDisplay =       
      <div className='container'>  
      <SecondaryHeader HeadingName={headingName} headerStyleType = 'MainHeading' homeLink = 'No' />
      <div className="blockUnderline"></div>
      <ErrorMessage errors={this.state.errorMessages}/>
      <div>
      <h2 className='infoAboutYou'>{lang.infoAbtYou}</h2>
      </div>
      <div className="InfAcboYou">
        <p className="contactInformation-Paragraph">
          {lang.curCurrentInfo}
        </p>
      </div>
      <div className="annualSummaryDiv paddingForInformationPage">
        <div className="row">
          <div className="col-md-3 col-sm-3 col-xs-5 leftAlignStyle">
            <b><p>{lang.homeAddress}:</p></b>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-7">
          {displayPrivateAddress}
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12">
            <div className="col-md-6 col-sm-6 col-xs-8" onMouseEnter={this.onMouseEnterHandler.bind(this)}>              
              <AnchorFunctionality AnchorText={lang.change} redirectTo={this.state.pAddressChangeRedirectTo} dstClassName='' data={renPrivateAddress}/>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-2" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
            {privateAddressRemoveField}
            </div>
          </div>         
        </div>
      </div>
  
      <div className="annualSummaryDiv paddingForInformationPage">
      <div className="row">
        <div className="col-md-3 col-sm-3 col-xs-5 leftAlignStyle">
          <b><p>{lang.mailingAddress}:</p></b>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-7">
          {displayMailingAddress}
        </div>
        <div className="col-md-3 col-sm-3 col-xs-12">
          <div className="col-md-6 col-sm-6 col-xs-8" onMouseEnter={this.onMouseEnterHandler.bind(this)}>              
            <AnchorFunctionality AnchorText={lang.change} redirectTo={this.state.mAddressChangeRedirectTo} dstClassName='' data={renMailingAddress}/>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-2" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
            {mailingAddressRemoveField}
          </div>
        </div>         
      </div>
    </div>
  

      <div className="annualSummaryDiv paddingForInformationPage">
    
        <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-8 leftAlignStyle">
        <p>{lang.preferredcontacttext}</p>
        </div>
          </div>
    
          <div className="row">
          
    
          <div className="col-md-3 col-sm-3 col-xs-5 leftAlignStyle">
            <b><p>{lang.preferredcontact}:</p></b>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-7">
              {displayPreferedContactMethod}
            </div>
            <div className="col-md-3 col-sm-3 col-xs-12">
              <div className="col-md-6 col-sm-6 col-xs-8">              
                <AnchorFunctionality AnchorText={lang.change} redirectTo = 'preferedContactInformation' dstClassName='' data={displayPreferedContactMethod}/>
              </div>
              
            </div>         
          </div>
        </div>

  
      <div className="annualSummaryDiv paddingForInformationPage">
        <div className="row">
          <div className="col-md-3 col-sm-3 col-xs-5 leftAlignStyle">
            <b><p>{lang.homePhoneNumber}:</p></b>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-7">
            {displayPersonalNumber}
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12">
            <div className="col-md-6 col-sm-6 col-xs-8" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
            <AnchorFunctionality AnchorText={lang.change} redirectTo={this.state.pPhoneChangeRedirectTo} dstClassName='' data={renHomePhoneNumber}/>        
            </div>
            <div className="col-md-6 col-sm-6 col-xs-2" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
              {phoneNumberRemoveField}
            </div>
          </div>         
        </div>
  
        <div className="row">
          <div className="col-md-3 col-sm-3 col-xs-5 leftAlignStyle">
            <b><p>{lang.mobilePhoneNumber}:</p></b>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-7">
            {displayMobileNumber}
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12">
            <div className="col-md-6 col-sm-6 col-xs-8" onMouseEnter={this.onMouseEnterHandler.bind(this)}>              
            <AnchorFunctionality AnchorText={lang.change} redirectTo={this.state.mPhoneChangeRedirectTo} dstClassName='' data={renMobilePhoneNumber}/>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-2" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
            {mobilePhoneNumberRemoveField}
            </div>
          </div>         
        </div>
      </div>
  
      <div className="annualSummaryDiv paddingForInformationPage">
      <div className="row">
        <div className="col-md-3 col-sm-3 col-xs-5 leftAlignStyle">
          <b><p>{lang.emailAddress}:</p></b>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-7">
          <p>{renEmailAddress.emailAddress}</p>
        </div>
        <div className="col-md-3 col-sm-3 col-xs-12">
          <div className="col-md-6 col-sm-6 col-xs-8" onMouseEnter={this.onMouseEnterHandler.bind(this)}>              
            <AnchorFunctionality AnchorText={lang.change} redirectTo={this.state.emailAddressChangeRedirectTo} dstClassName='' data= {renEmailAddress}/>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-2" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
            {emailAddressRemoveField}
          </div>
        </div>         
      </div>
    </div>
      <div className="annualSummaryDiv centerAlignStyle">
        <h5 style={{color:"red"}}>{infoUpdate}</h5>
        {buttonFunc}
      </div>
    </div>
    }
    }else{  
      HomeAddressDisplay = <div><h4>Processing your request....</h4></div>
    }
    return(
      <div>
      {HomeAddressDisplay }
      </div>
      
    )
    
  }
}

function mapStateToProps (state) {
  return{
    contact : state.contact,
    addressAndpersons: state.addressAndpersons,
    emailAddress: state.emailAddress,
    phone: state.phoneNumber,
    codeTableValue:state.CTReducer,
    members : state.HHMembers,
    pageDetails: state.pageDetailsReducer
  }
}


export default connect(mapStateToProps, {fetchContact,getHHMembers,fetchMembers, getPreferedList, updateAddress, updateEmailAddress, updatePhoneNumber,clearPhoneNumberOperation,clearEmailAddressOperation, searchValueForName,getInfoInList,contactInfo, getCTList, getCTDetails, getCTDescription,clearAddressOperation,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(InformationPage)

