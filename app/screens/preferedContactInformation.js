import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import '../CSS/App-extraSmallScreen.css'
import '../CSS/App-mediumScreen.css'
import '../CSS/App-smallScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React, { PropTypes } from 'react'
import UpdateInfoSecondaryHeader from './components/UpdateInfoSecondaryHeader'
import Moment from 'moment'
import { fetchMembers } from '../actions/HHMembersAction'
import { getHHMembers } from '../actions/CommonActions'
import { getFormattedDateOfBirth } from '../actions/CommonActions'
import { getCTDetails } from '../actions/CTAction'
import { connect } from 'react-redux'
import { SelectedPersonList } from '../actions/locationAction.js'
import * as locales from './PreferredContactChangeProperties'
import ErrorMessage from './components/ErrorMessage'
import astrisk from '../assets/astrisk.png'
import { addPageLoggingInfo1, setSessionTime, setRequestTime, setResponseTime, setStartSessionTime } from '../actions/LoggingCommonActions'
import moment from 'moment-es6';

class preferedContactInformation extends React.Component {

    constructor(props) {
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime);
        this.state = {
            errorMessages: [],
            preferedType: '',
            disable: ''
        }
    }

    componentWillUnmount() {
        let pageEndTime = moment();
        var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
        var PageTimeEnd = duration.asSeconds();
        this.props.setSessionTime(PageTimeEnd);
       // this.props.addPageLoggingInfo1(this.props.pageDetails.list, this.props.userName, 'HouseHold Address Change page', this.props.pageDetails.requestTime.toLocaleString(), this.props.pageDetails.requestTime.toLocaleString(), this.props.pageDetails.responseTime.toLocaleString(), PageTimeEnd.toLocaleString())
    }

    componentWillMount() {

    }
    componentDidMount() {
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)
    }


    handleFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();
    }
    onMouseEnterHandler(event) {
        let validationMsg = new Set();
        let lang = locales.strings;

        for (var key in this.state) {
            if (key === 'preferedType' && (this.state[key] === '' || this.state[key] === '--Please Select--')) {
                validationMsg.add({ key: key, firstMessage: lang.formatString(lang.individualMembersLabel), secondMessage: lang.formatString(lang.IsMandatory) })
            }
        }
        let array = Array.from(validationMsg)
        let redirectTo;
        let disabled;
        if (array.length <= 0) {
            disabled = false
            redirectTo = 'InformationPage'
        } else {
            disabled = true
            redirectTo = 'preferedContactInformation'
        }
        this.setState({ errorMessages: array, redirectTo: redirectTo, disabled: disabled })

    }


    handlePreferedContactTypeValues() {
       
        this.setState({
            preferedType: this.refs.preferedType.value
        })
    }

    render() {
        let lang = locales.strings, data = '', preferredcontactPageDisplay
        let codes = this.props.getCTDetails(this.props.CTReducer.CTList, 'CommunicationMethod')
        
        let old_val=this.props.location.data.data;
             
        

        let preferedContactData = {
            preferedType: this.state.preferedType,
            contactType: 'Preferred_Contact_Method'
        }
        
        return (

            <div className='container'>
                <UpdateInfoSecondaryHeader HeadingName={lang.heading} />
                <div className="blockUnderline"></div>
                <ErrorMessage errors={this.state.errorMessages} />
                <div>
                    <h2 className='infoAboutYou'>{lang.infoAbtYou}</h2>
                </div>
                <div className='annualSummaryDiv'>
                    <div style={{ marginBottom: "0px" }}>
                        <p>{lang.headerNote} {this.props.location.data.data}</p>
                    </div>
                    <div className="form_Border1">

                        <div className="row" style={{ margin: '20px' }}>
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{lang.individualMembersLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                            
                                <select name="preferedType" ref="preferedType" value={this.state.preferedType} type="select" title={lang.preferedContactType} className="form-control" id="preferedType" onChange={this.handlePreferedContactTypeValues.bind(this)} required>
                                    <option defaultValue>{lang.Select}</option>
                                    {codes}
                                </select>
                            </div>
                        </div>


                    </div>
                    <div className="row form-label-style" >
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <ButtonFunctionality ButtonName={locales.strings.ButtonCancel} redirectTo="InformationPage" dstClassName="btn button-text buttonBack1" />
                        </div>
                        
                                    <div className="col-md-6 col-sm-6 col-xs-6 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
                                    <ButtonFunctionality ButtonName={locales.strings.ButtonSave}  redirectTo="ProcessingContactInformation" dstClassName="btn button-text buttonBack1" disabled={this.state.disabled} data={preferedContactData}/>
                                </div>
                                
                    </div>

                </div>
            </div>
        )
    }

}


function mapStateToProps(store) {
    return {
        members: store.HHMembers,
        evidences: store.evidences,
        pageDetails: store.pageDetailsReducer,
        CTReducer: store.CTReducer,
    }
}

export default connect(mapStateToProps, { getHHMembers, getCTDetails, fetchMembers, getFormattedDateOfBirth, SelectedPersonList, addPageLoggingInfo1, setSessionTime, setRequestTime, setResponseTime, setStartSessionTime })(preferedContactInformation)
