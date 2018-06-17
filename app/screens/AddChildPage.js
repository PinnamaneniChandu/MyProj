import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import React from 'react'
import ReactDOM from 'react-dom';
import astrisk from '../assets/astrisk.png'
import SecondaryHeader from './components/SecondaryHeader'
import * as locales from './AddChildProperties'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { connect } from 'react-redux'
import moment from 'moment-es6';
import { addAChildInformation,formatPerson,applyPersonMatch,formatPersonMatchData,clearPersonMatchData } from '../actions/addAChildAction'
import { getCTDetails } from '../actions/CTAction'
import { getHHMembers } from '../actions/CommonActions'
import ErrorMessage from './components/ErrorMessage'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class AddChildPage extends React.Component {
    constructor(props) {
        super(props);

        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list, this.props.userName, 'AddChild Page', moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(), this.props.pageDetails.ipAddress)

        this.state = {
            redirectTo: 'HouseHoldInformation',
            errorMessages: [],
            disabled: '',
            reportingPeriod: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: '',
            DoYouHaveSSN: '',
            ssn: '',
            appliedForSSN: '',
            whyNoSsn: '',
            year: '',
            page: 'AddChild'
        }
        this.props.clearPersonMatchData();
    }
    componentWillUnmount(){
        let pageEndTime =moment();
        var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
        var PageTimeEnd = duration.asSeconds();  
        this.props.setSessionTime(PageTimeEnd)
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'AddChild Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
      componentDidMount(){
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)
     }
    renderMonths() {

        let reportingPeriodList = [];
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var currentDate = new Date(moment(this.props.serverDate).add(1, 'days').format('YYYY-MM-DD'));
        var date = currentDate.getDate();
        var currentMonthName = currentDate.getMonth()
        reportingPeriodList.push({ monthName: currentDate.getMonth(), description: monthNames[currentDate.getMonth()] });
        if (date >= 1 && date <= 5 && currentMonthName === 0) {
            reportingPeriodList.push({ monthName: currentDate.getMonth() + 11, description: monthNames[currentDate.getMonth() + 11] });
        }else if(date >= 1 && date <= 5){
            reportingPeriodList.push({ monthName: currentDate.getMonth() - 1, description: monthNames[currentDate.getMonth() - 1] });
        }
        return reportingPeriodList.map((month, id) => {
            return (<option key={id} value={month.monthName}>{month.description}</option>)
        });
    }
    handleAddChildValues() {
        let year = moment(this.props.serverDate).format('YYYY')
        let currentMonth = moment(this.props.serverDate).format('MM')
        if (currentMonth === '1' && this.refs.reportingPeriod.value === '11') {
            year = year - 1;
        }
        this.setState({
            reportingPeriod: this.refs.reportingPeriod.value, firstName: this.refs.firstName.value, lastName: this.refs.lastName.value,
            dateOfBirth: moment(this.refs.dateOfBirth.value).format('YYYYMMDD'), gender: this.refs.gender.value, DoYouHaveSSN: this.refs.DoYouHaveSSN.value, year: year
        })
    }
    SSNValue() {
        this.setState({ ssn: this.refs.ssn.value })      
    }
    appliedForSSN() { this.setState({ appliedForSSN: this.refs.appliedForSSN.value }) }
    whyNoSSN() { this.setState({ whyNoSsn: this.refs.whyNoSsn.value }) }
    handleSubmit(event) {
        if (this.state.reportingPeriod !== '') {
            event.preventDefault();
            return this.props.addAChildInformation(this.state)
        }
    }

    genderTest(gender) {
        if (gender === 'Male') {
            return 'SX1'
        }
        else if (gender === 'Female') {
            return 'SX2'
        }
    }
    onMouseEnterHandler(event) {
        let set = new Set();
        let lang = locales.strings;
        let DoYouHaveSSN
        this.props.getHHMembers(this.props.members.members).map((member, index) => {
            if (member.gender.trim() === this.genderTest(this.state.gender.trim()) && member.name === this.state.firstName.concat(' ').concat(this.state.lastName) && moment(member.dateOfBirth).format('YYYYMMDD').trim() === this.state.dateOfBirth) {
                set.add({ key: key, firstMessage: lang.formatString(lang.DuplicateChildValidation), secondMessage: lang.formatString('') })
            }
        })
        this.props.evidences.list.map((member) => {
            if (member.evidenceType === 'EEFDET0023') {
                if (member.gender.trim() === this.state.gender.trim() && member.firstName === this.state.firstName && member.lastName === this.state.lastName && member.dateOfBirth === this.state.dateOfBirth && member.ssn.trim() === this.state.ssn.trim()) {
                    set.add({ key: key, firstMessage: lang.formatString(lang.DuplicateChildValidation), secondMessage: lang.formatString('') })
                }
                else if (member.gender.trim() === this.state.gender.trim() && member.lastName === this.state.lastName && member.dateOfBirth === this.state.dateOfBirth && member.ssn.trim() === this.state.ssn.trim()) {
                    set.add({ key: key, firstMessage: lang.formatString(lang.DuplicateChildValidation), secondMessage: lang.formatString('') })
                }
                else if (member.gender.trim() === this.state.gender.trim() && member.firstName === this.state.firstName && member.dateOfBirth === this.state.dateOfBirth && member.ssn.trim() === this.state.ssn.trim()) {
                    set.add({ key: key, firstMessage: lang.formatString(lang.DuplicateChildValidation), secondMessage: lang.formatString('') })
                }
            }
        })

        for (var key in this.state) {
            if (key === 'reportingPeriod' && this.state[key] === '') {
                set.add({ key: key, firstMessage: lang.formatString(lang.ReportingPeriodMessage), secondMessage: lang.formatString(lang.IsMandatory) })
            }
            else if (key === 'firstName' && this.state[key] === '') {
                set.add({ key: key, firstMessage: lang.formatString(lang.FirstNameValidation), secondMessage: lang.formatString(lang.IsMandatory) })
            }
            else if (key === 'lastName' && this.state[key] === '') {
                set.add({ key: key, firstMessage: lang.formatString(lang.LastNameValidation), secondMessage: lang.formatString(lang.IsMandatory) })
            }
            else if (key === 'dateOfBirth' && (this.state[key] === '' || this.state[key] === 'Invalid date' || this.state[key] === null || (!moment(this.state[key], 'YYYYMMDD', true).isValid()))) {
                set.add({ key: key, firstMessage: lang.formatString(lang.DOBLabel), secondMessage: lang.formatString(lang.IsMandatory) })
                this.refs.dateOfBirth.value = ''
            }
            else if (key === 'dateOfBirth' && this.state[key] !== '' && this.state[key] !== 'Invalid date') {
                let age = moment(this.props.serverDate).diff(this.state[key], 'years')
                if (age > 18) {
                    set.add({
                        key: key,
                        firstMessage: lang.formatString(lang.ChildGreaterThan18Message)
                        , secondMessage: lang.formatString(lang.Blank)
                    })
                }
                else if (moment(this.state[key]).format('YYYYMMDD') > moment(this.props.serverDate).format('YYYYMMDD')) {
                    set.add({ key: key, firstMessage: lang.formatString(lang.DOBLabel), secondMessage: lang.formatString(lang.CannotBeInFuture) })
                }
            }

            else if (key === 'gender' && (this.state[key] === '' || this.state[key] === '--Please Select--')) {
                set.add({ key: key, firstMessage: lang.formatString(lang.Gender), secondMessage: lang.formatString(lang.IsMandatory) })
            }
            else if (key === 'DoYouHaveSSN' && (this.state[key] === '' || this.state[key] === '--Please Select--')) {
                set.add({ key: key, firstMessage: lang.formatString(lang.ChildHaveSsnLabel), secondMessage: lang.formatString(lang.IsMandatory) })
            }
            else if (key === 'DoYouHaveSSN' && this.state[key] === 'Yes') {
                if (this.state['ssn'] === '') {
                    set.add({ key: key, firstMessage: lang.formatString(lang.SSN), secondMessage: lang.formatString(lang.IsMandatory) })
                }
                else {
                    let ssn = this.state['ssn']
                    let flag = this.validateSSN(ssn)
                    if (!flag) {
                        set.add({ key: key, firstMessage: lang.formatString(lang.SSN), secondMessage: lang.formatString(lang.IsNotValid) })
                    }
                }
            }
            else if (key === 'DoYouHaveSSN' && this.state[key] === 'No') {
                if (this.state['appliedForSSN'] === '' || this.state['appliedForSSN'] === '--Please Select--') {
                    set.add({ key: key, firstMessage: lang.formatString(lang.HaveAppliedForChildSSN), secondMessage: lang.formatString(lang.IsMandatory) })
                }
                if (this.state['appliedForSSN'] === 'No' && (this.state['whyNoSsn'] === '' || this.state['whyNoSsn'] === '--Please Select--')) {
                    set.add({ key: key, firstMessage: lang.formatString(lang.ChildDoesNotHaveSSN), secondMessage: lang.formatString(lang.IsMandatory) })
                }
            }
        }

        let array = Array.from(set)
        let redirectTo
        let disabled
        if (array.length <= 0) {
            redirectTo = 'ValidatingPersonDetails'
            disabled = false
        }
        else {
            redirectTo = 'AddChildPage'
            disabled = true
        }
        this.setState({ errorMessages: array, redirectTo: redirectTo, disabled: disabled })
    }

    validateSSN(ssn) {
        if (ssn.length !== 9) {
            return false;
        }
        if (ssn[0] === '9') {
            return false;
        }
        for (var index in ssn) {
            let isNotANumber = isNaN(ssn[index])
            if (isNotANumber !== false) {
                return false;
            }
        }
        return 5 < 7;
    }

    render() {
        let lang = locales.strings;
        let haveSSN, haveAppliedForSSN, ReasonForNoSSN;
        let codes = this.props.getCTDetails(this.props.CTReducer.CTList, 'SSNNotAppliedReason')
        let repotingCode = this.renderMonths();
        if (this.state.DoYouHaveSSN === 'Yes') {
            haveSSN = <div>
                <div className="addIncomeFormDivStyle"></div>
                <div className="row">
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <label>{lang.SsnLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
                    </div>
                    <div className="col-md-8 col-sm-12 col-xs-12"> {/*  onBlur={this.callPersonMatch.bind(this)} */}
                        <input name="ssn" maxLength='9' ref="ssn" type="text" className="form-control" id="ssn"  onMouseOut={this.SSNValue.bind(this)} onChange={this.SSNValue.bind(this)} required />
                    </div>
                </div>
            </div>
        } else if (this.state.DoYouHaveSSN === 'No') {
            haveAppliedForSSN = <div>
                <div className="row addIncomeFormDivStyle">
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <label>{lang.AppliedSsnLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
                    </div>
                    <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                        <select name="appliedForSSN" ref="appliedForSSN" type="select" className="form-control" id="appliedForSSN" onMouseOut={this.appliedForSSN.bind(this)} onChange={this.appliedForSSN.bind(this)} required>
                            <option defaultValue>--Please Select--</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
            </div>
        }
        if (this.state.appliedForSSN === 'No' && this.state.DoYouHaveSSN === 'No') {
            ReasonForNoSSN = <div>
                <div className="addIncomeFormDivStyle"></div>
                <div className="row addIncomeFormDivStyle">
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <label>{lang.ReasonSsnLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
                    </div>
                    <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                        <select name="whyNoSsn" ref="whyNoSsn" type="select" className="form-control" id="whyNoSsn" onMouseOut={this.whyNoSSN.bind(this)} onChange={this.whyNoSSN.bind(this)} required>
                            <option default>--Please Select--</option>
                            {codes}
                        </select>
                    </div>
                </div>
            </div>
        }
        return (
            <div className="container">
                <SecondaryHeader HeadingName={lang.AddChild} homeLink='No' />
                <div className="blockUnderline"></div>
                <div>
                    <ErrorMessage errors={this.state.errorMessages} />
                    <span className="required col-md-12 col-sm-12 col-xs-12">* Indicates a required field</span>
                    <div style={{ paddingBottom: '2%' }}>
                        <p>{lang.AddChildHeading1}</p>
                    </div>
                    <form ref='addAChild_form' onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{lang.ReportingPeriodLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                                <select name="reportingPeriod" ref="reportingPeriod" type="select" className="form-control" id="reportingPeriod" onChange={this.handleAddChildValues.bind(this)} onMouseOut={this.handleAddChildValues.bind(this)} required>
                                    {repotingCode}
                                </select>
                            </div>
                        </div>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{lang.FirstNameLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                                <input name="firstName" ref="firstName" type="text" maxLength="131" className="form-control" id="firstName" onChange={this.handleAddChildValues.bind(this)} onMouseOut={this.handleAddChildValues.bind(this)} required />
                            </div>
                        </div>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{lang.LastNameLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                                <input name="lastName" ref="lastName" type="text" maxLength="131" className="form-control" id="lastName" onChange={this.handleAddChildValues.bind(this)} onMouseOut={this.handleAddChildValues.bind(this)} required />
                            </div>
                        </div>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{lang.DOBLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12">
                                <input name="dateOfBirth" ref="dateOfBirth" type="date" placeholder='mm/dd/yyyy' className="form-control" id="dateOfBirth" onChange={this.handleAddChildValues.bind(this)} onMouseOut={this.handleAddChildValues.bind(this)} required />
                            </div>
                        </div>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{lang.GenderLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                                <select name="gender" ref="gender" type="select" className="form-control" id="gender" onChange={this.handleAddChildValues.bind(this)} onMouseOut={this.handleAddChildValues.bind(this)} required style={{ width: "100%" }}>
                                    <option defaultValue>--Please Select--</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <label>{lang.ChildHaveSsnLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{ verticalAlign: 'top' }}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle selectDropDownArrowStyle">
                                <select name="DoYouHaveSSN" ref="DoYouHaveSSN" type="select" className="form-control" id="DoYouHaveSSN" onChange={this.handleAddChildValues.bind(this)} onMouseOut={this.handleAddChildValues.bind(this)} required style={{ width: "100%" }}>
                                    <option defaultValue>--Please Select--</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        {haveSSN}
                        {haveAppliedForSSN}
                        {ReasonForNoSSN}
                        <div style={{ marginBottom: "20px" }}></div>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-11 col-sm-7 col-xs-7">
                                <ButtonFunctionality ButtonName={lang.ButtonCancel} redirectTo="HouseHoldInformation" dstClassName="btn buttonBack1" />
                            </div>
                            <div className="col-md-1 col-sm-5 col-xs-5 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
                           
                                <ButtonFunctionality ButtonName={lang.ButtonSave} redirectTo={this.state.redirectTo} dstClassName="btn buttonBack1 marginLeftForButtons" data={this.state} disabled={this.state.disabled} />
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
        addAChildResponse: store.addAChild,
        CTReducer: store.CTReducer,
        members: store.HHMembers,
        evidences: store.evidences,
        pageDetails: store.pageDetailsReducer,
        personMatch: store.personMatch
    };
}


export default connect(mapStateToProps, { addAChildInformation,formatPerson, applyPersonMatch, getCTDetails, getHHMembers, addPageLoggingInfo1, formatPersonMatchData,clearPersonMatchData,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime })(AddChildPage);

