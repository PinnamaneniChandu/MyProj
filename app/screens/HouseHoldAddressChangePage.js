import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React, {PropTypes} from 'react'
import SecondaryHeader from './components/SecondaryHeader'
import Moment from 'moment'
import {fetchMembers} from '../actions/HHMembersAction'
import {getHHMembers} from '../actions/CommonActions'
import {getFormattedDateOfBirth} from '../actions/CommonActions'
import {connect} from 'react-redux'
import {SelectedPersonList} from '../actions/locationAction.js'
import  * as locales from './HouseHoldAddressChangeProperties'
import ErrorMessage from './components/ErrorMessage'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class HouseHoldAddressChangePage extends React.Component{
    
    constructor (props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'HouseHold Address Change page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        this.state={
            memberList:[],
            disabled:[],
            errorMessages:[]
        }               
    }
    
     
     componentWillUnmount(){
        let pageEndTime =moment();
        var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
        var PageTimeEnd = duration.asSeconds();  
        this.props.setSessionTime(PageTimeEnd)
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'HouseHold Address Change page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString()) 
     }
componentWillMount ()  {
    this.props.fetchMembers()
} 
componentDidMount(){
    this.props.SelectedPersonList(this.state.memberList)
    var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
    this.props.setResponseTime(responseTime)
}
toggleCheckbox(member) {
    let isChecked = document.getElementById(''.concat(member.concernRoleID)).checked
    let curMembers=this.state.memberList
    if(isChecked === true){
        curMembers.push(member);
    }else if(isChecked === false){       
        let index = curMembers.findIndex(memberData => memberData.concernRoleID==member.concernRoleID);
        curMembers.splice(index,1)
    } 
    this.setState({memberList:curMembers})
} 
getRMList(){
    let RMList=[];
        this.props.evidences.list.map((RM)=>{
            if(RM.evidenceType==='ET44'){
                RMList.push(RM.concernRoleID)
            }
        })
    return RMList
}
renderPersons(HHMembers){
        return HHMembers.map((member, index)=>{
            let memberDateOfBirth = member.dateOfBirth
            let dateOfBirth = this.props.getFormattedDateOfBirth(memberDateOfBirth)
            if(!this.getRMList().includes(member.concernRoleID))
            return (<div key={index}>
                        <label>
                            <input type="checkbox" value={member.name} key={member.concernRoleID} onChange={this.toggleCheckbox.bind(this,member)} id={member.concernRoleID}  />      
                            { '        ' } { '        ' } { '        ' } {member.name}  -  {dateOfBirth}
                        </label>
                    </div>)
        })
        
}

handleFormSubmit (formSubmitEvent) {
    formSubmitEvent.preventDefault();
}
onMouseEnterHandler(event){  
    let validationMsg = new Set();
    let memebers = this.state.memberList
        if(memebers.length<1){
            validationMsg.add({firstMessage:'Please make a selection'})   
        }
    let array = Array.from(validationMsg)
    let redirectTo;
    this.setState({errorMessages:array,redirectTo:redirectTo})
    }
render(){
    let lang=locales.strings, data = '', houseHoldPageDisplay
    let redirectTo=this.getRMList().length>0?'Acknowledgement':'InformationPage'
    let disabled= true
    if(this.state.memberList.length<1){
        disabled=false
    }

    let addressData =  this.props.location.data?this.props.location.data.data:''
    let HHInfodata = {
        members: this.state.memberList,
        addressData: addressData
    }
    let reDirectTo=this.props.location.data?this.props.location.data.data.reDirectTo:''
    if(this.props.members.members !== '' && this.props.members.members !== null && this.props.members.members !== undefined){
        data=this.renderPersons(this.props.getHHMembers(this.props.members.members))
        houseHoldPageDisplay =  <div className="container">
        <SecondaryHeader HeadingName={lang.heading} homeLink = 'No'/>
        <div className="blockUnderline"></div>
            <div>
                <p>
                    {lang.headerNote}
                </p>
                <form onSubmit={this.handleFormSubmit.bind(this)} >
                <ErrorMessage errors={this.state.errorMessages}/>
                    <div>
                        <p style={{fontWeight:'Bold'}}>{lang.individualMembersLabel}</p>
                        <div>{data}</div>
                    </div> 
                    <div className="buttonAlignRight"  onMouseOver={this.onMouseEnterHandler.bind(this)}>
                        <ButtonFunctionality ButtonName={lang.ButtonNext} redirectTo= {reDirectTo} dstClassName="btn button-text buttonBack1" data={HHInfodata} disabled={!disabled}/>            
                    </div>    
                </form>           
            </div>
    </div>
    }else{
        houseHoldPageDisplay=<div><h4>Processing your request....</h4></div>
    }
    
        return(
            <div>
            {houseHoldPageDisplay}
            </div>
        )
    }
}
function mapStateToProps (store) {
    return{
        members : store.HHMembers,
        evidences:store.evidences,
        pageDetails: store.pageDetailsReducer
    }
}

export default connect(mapStateToProps, {getHHMembers,fetchMembers,getFormattedDateOfBirth,SelectedPersonList,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(HouseHoldAddressChangePage)
