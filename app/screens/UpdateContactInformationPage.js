import React from 'react'
import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import '../CSS/App-extraSmallScreen.css'
import '../CSS/App-mediumScreen.css'
import '../CSS/App-smallScreen.css'
import { connect } from 'react-redux'
import * as locales from './UpdateContactInformationPageProperties'
import { fetchContact, updateAddress, updateEmailAddress, updatePhoneNumber,clearAddressOperation, clearEmailAddressOperation, clearPhoneNumberOperation,clearPrefferedContact } from '../actions/informationAction'
import { searchValueForName } from '../actions/CommonActions'
import {getCTList, getCTDetails, getCTDescription} from '../actions/CTAction'
import { getInfoInList, getPreferedList} from '../actions/CommonActions'
import { contactInfo} from '../actions/CommonActions'
import AnchorFunctionality from '../ClickFunc/AnchorFunctionality'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import UnsubmittedInformation from './UnsubmittedInformationPage.js'
import UpdateInfoSecondaryHeader from './components/UpdateInfoSecondaryHeader'
import ErrorMessage from './components/ErrorMessage'
import {fetchMembers} from '../actions/HHMembersAction'
import {getHHMembers} from '../actions/CommonActions'
import {addPageLoggingInfo} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class UpdateContactInformationPage extends React.Component{

  constructor(props){
    super(props);
    this.props.getCTList()
    this.props.fetchContact()  
    this.props.fetchMembers()
    this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Information page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
      this.state = {
        loading : true,
        isUpdated : false,
        errorMessages:[],
        pAddressChangeRedirectTo:'UpdateContactHHAdressChangePage',
        pAddressRemoveRedirectTo:'UpdateContactHHAddressRemove',
        mAddressChangeRedirectTo:'UpdateContactHHAdressChangePage',
        mAddressRemoveRedirectTo:'UpdateRemoveContactInfoErrorPage',
        pPhoneChangeRedirectTo:'UpdateContactInfoPhonenumber',
        pPhoneRemoveRedirectTo:'UpdateRemoveCIConfirmation',
        mPhoneChangeRedirectTo:'UpdateContactInfoPhonenumber',
        mPhoneRemoveRedirectTo:'UpdateRemoveCIConfirmation',
        emailAddressChangeRedirectTo:'UpdateContactInfoEmailAddress',
        emailAddressRemoveRedirectTo:'UpdateRemoveContactInfoErrorPage',
    }
    this.props.clearAddressOperation();
    this.props.clearEmailAddressOperation();
    this.props.clearPhoneNumberOperation();
    this.props.clearPrefferedContact();
  }

  componentWillMount() {
    setTimeout(() => this.setState({ loading: false }), 1500)
}


ClickLogoutHandler()
{
  var jspcall = `../EEFSSOLogoutWrapperPage.do`
  window.location = jspcall;
}

ClickHomePage()
{
  var jspcall = `../application.do`
  window.location = jspcall;
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
        reDirectTo: 'UpdateHomeAddress',
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
        reDirectTo: 'UpdateMailingAddress',
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
      let homeaddressValue=renPrivateAddress.ADD2
    /*  if(emailAddressValue !== '' && emailAddressValue !== null && emailAddressValue !== undefined && mailingAddressValue !== '' && mailingAddressValue !== null && mailingAddressValue !== undefined){
        //buttonFunc = <ButtonFunctionality ButtonName="save" id="save" onClick={this.ClickLogoutHandler.bind(this)} dstClassName="btn button-text buttonBack1  overflow-visible" disabled ={!disabled}/>
        buttonFunc = <button id="save" onClick={this.ClickLogoutHandler.bind(this)}  className="btn button-text buttonBack1  overflow-visible" disabled ={!disabled}>Save</button> 
      }else {
        infoUpdate = lang.emailMailingValidMsg
        //buttonFunc = <ButtonFunctionality ButtonName="save"  id="save" onClick={this.ClickLogoutHandler.bind(this)}  dstClassName="btn button-text buttonBack1  overflow-visible" disabled ={disabled} />
        buttonFunc = <button id="save" onClick={this.ClickLogoutHandler.bind(this)}  className="btn button-text buttonBack1  overflow-visible" disabled ={disabled}>Save</button> 
      }*/
      
      if(preferedContactMethod !=='' && preferedContactMethod!==null && preferedContactMethod!== undefined && mailingAddressValue !== '' && mailingAddressValue !== null && mailingAddressValue !== undefined && homeaddressValue !== '' && homeaddressValue !== null && homeaddressValue !== undefined){
        //buttonFunc = <ButtonFunctionality ButtonName="save" id="save" onClick={this.ClickLogoutHandler.bind(this)} dstClassName="btn button-text buttonBack1  overflow-visible" disabled ={!disabled}/>
        if((preferedContactMethod==='Paperless') && (emailAddressValue===null || emailAddressValue===undefined))
            {
              infoUpdate = lang.preferredcontactEmailValidMsg
              buttonFunc = <button id="save" onClick={this.ClickHomePage.bind(this)}  className="btn button-text buttonBack1  overflow-visible" disabled ={disabled}>Save</button>  
            }
          else{
                buttonFunc = <button id="save" onClick={this.ClickHomePage.bind(this)}  className="btn button-text buttonBack1  overflow-visible" disabled ={!disabled}>Save</button> 
             }
      }
      else {
        infoUpdate = lang.preferredcontactMailValidMsg
        //buttonFunc = <ButtonFunctionality ButtonName="save"  id="save" onClick={this.ClickLogoutHandler.bind(this)}  dstClassName="btn button-text buttonBack1  overflow-visible" disabled ={disabled} />
        buttonFunc = <button id="save" onClick={this.ClickHomePage.bind(this)}  className="btn button-text buttonBack1  overflow-visible" disabled ={disabled}>Save</button> 
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
            mailingAddressRemoveField = <AnchorFunctionality AnchorText={lang.remove} redirectTo={this.state.mAddressRemoveRedirectTo} dstClassName='' data='Mailing address'/>
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
        mobilePhoneNumberRemoveField = <AnchorFunctionality AnchorText={lang.remove} redirectTo={this.state.mPhoneRemoveRedirectTo} dstClassName='' data={renMobilePhoneNumber}/>
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
      HomeAddressDisplay =       
      <div className='container'>  
      <UpdateInfoSecondaryHeader HeadingName={headingName} headerStyleType = 'MainHeading' homeLink = 'No' />
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
            <div className="col-md-6 col-sm-6 col-xs-8">              
              <AnchorFunctionality AnchorText={lang.change} redirectTo={this.state.pAddressChangeRedirectTo} dstClassName='' data={renPrivateAddress}/>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-2">
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
          <div className="col-md-6 col-sm-6 col-xs-8">              
            <AnchorFunctionality AnchorText={lang.change} redirectTo={this.state.mAddressChangeRedirectTo} dstClassName='' data={renMailingAddress}/>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-2">
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
            <AnchorFunctionality AnchorText={lang.change} redirectTo = 'UpdatePreferredContactInformationPage' dstClassName='' data={displayPreferedContactMethod}/>
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
            <div className="col-md-6 col-sm-6 col-xs-8">
            <AnchorFunctionality AnchorText={lang.change} redirectTo={this.state.pPhoneChangeRedirectTo} dstClassName='' data={renHomePhoneNumber}/>        
            </div>
            <div className="col-md-6 col-sm-6 col-xs-2">
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
            <div className="col-md-6 col-sm-6 col-xs-8">              
            <AnchorFunctionality AnchorText={lang.change} redirectTo={this.state.mPhoneChangeRedirectTo} dstClassName='' data={renMobilePhoneNumber}/>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-2">
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
          <div className="col-md-6 col-sm-6 col-xs-8">              
            <AnchorFunctionality AnchorText={lang.change} redirectTo={this.state.emailAddressChangeRedirectTo} dstClassName='' data= {renEmailAddress}/>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-2">
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
      {HomeAddressDisplay}
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



export default connect(mapStateToProps, {fetchContact,getHHMembers,fetchMembers, updateAddress, updateEmailAddress, updatePhoneNumber,clearPhoneNumberOperation,clearEmailAddressOperation, searchValueForName,getInfoInList, getPreferedList, contactInfo, getCTList, getCTDetails, getCTDescription,clearAddressOperation,addPageLoggingInfo,clearPrefferedContact})(UpdateContactInformationPage)

