import React from 'react';
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import SecondaryHeader from './components/SecondaryHeader';
import AnchorFunctionality from '../ClickFunc/AnchorFunctionality';
import {fetchMembers} from '../actions/HHMembersAction'
import {getHHMembers} from '../actions/CommonActions'
import {addEvidence} from '../actions/evidenceAction'
import {addEvd} from '../actions/CommonActions'
import {connect} from 'react-redux'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import ErrorMessage from './components/ErrorMessage'
import moment from 'moment-es6';
import * as locales from './HouseHoldInformationProperties'
import { getFormattedDateOfBirth } from '../actions/CommonActions.js'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'


class HouseHoldInformation extends React.Component{
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
    
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Household Information Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        this.state = {
            redirectTo:'HouseHoldInformation',
            addChildRedirectTo:'AddChild',
            addAdultRedirectTo:'AddAnAdult',
            errorMessages:[],
            flag : false
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Household Information Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
    componentWillMount() {    
        
        this.props.fetchMembers()
        this.props.evidences.list.length>0?this.props.addEvidence(this.props.evidences.list):undefined
        let removeMember       
        if(this.props.newPerson){
            if(this.props.newPerson && this.props.newPerson.page==='AddChild'){                          
                this.props.addEvd(this.props.evidences.list,this.props.newPerson,'EEFDET0023',this.props.newPerson.reportingPeriod)
            }
        }
        if( this.props.location && this.props.location.data){
            let removeMember=this.props.location.data.data
            let data=this.props.location.data.data
                if(data && data.page==='AddChild'){                          
                    this.props.addEvd(this.props.evidences.list,data,'EEFDET0023',data.reportingPeriod)
                }
                else if(data && data.page==='RemoveMember'){
                    this.props.addEvd(this.props.evidences.list,data,'EEFDET0024',new Date().getMonth())
                }              
        }
    }  

    getRMList(){
        let RMList=[];
        this.props.evidences.list.map((RM)=>{
            if(RM.evidenceType==='EEFDET0024'){
                RMList.push(RM.concernRoleID)
            }
        })
        return RMList
    }
    getAddedMembersList(){
        let membersList=[];
        this.props.evidences.list.map((member)=>{
            if(member.evidenceType==='EEFDET0023'){
                membersList.push(member.ssn)
            }
        })
        return membersList
    }
    
    renderPersons(HHMembers)
    {
        return HHMembers.map((member, index)=>{
            let memberDateOfBirth = this.props.getFormattedDateOfBirth(member.dateOfBirth)
            if(!this.getRMList().includes(member.concernRoleID))
            return (<div key={index} className="row buttonAtCenter">
                        <div className="col-md-4 col-sm-4 col-xs-4 paddingisLeft">
                            <p>{member.name}</p>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4 paddingisLeft">
                            <p>{memberDateOfBirth}</p>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4 paddingisLeft" >
                           <span display='inline-block' onMouseEnter={this.onMouseEnterHandler.bind(this,member)} onMouseLeave={this.onMouseLeaveHandler.bind(this,member)}> 
                            <AnchorFunctionality AnchorText="Remove" redirectTo={this.state.redirectTo} data={member} />
                            </span>
                        </div>
                    </div>)
            })    
    }
    removeRecentlyAddedPerson(removeMember){        
        this.props.evidences.list.map((member,index)=>{
            if(removeMember.firstName === member.firstName && removeMember.lastName === member.lastName && removeMember.dateOfBirth === member.dateOfBirth ){
                this.props.evidences.list.splice(index, 1)
            }
        })
        this.setState({redirectTo:this.state.redirectTo})
    }
    renderRecentlyAddedPerson(){
        return this.props.evidences.list.map((member,index)=>{
            if(member.evidenceType==='EEFDET0023')
                return (    
                    <div key={index} className="row buttonAtCenter">
                        <div className="col-md-4 col-sm-4 col-xs-4 paddingisLeft">
                            <p>{member.firstName} {member.lastName}</p>
                        </div>
                    <div className="col-md-4 col-sm-4 col-xs-4 paddingisLeft">
                        <p>{moment(member.dateOfBirth).format('MM/DD/YYYY')}</p>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4 paddingisLeft" >
                        <a onClick={this.removeRecentlyAddedPerson.bind(this,member)}>Remove</a>
                    </div>
        </div>)
        })
    }

    onMouseEnterHandler(member){     
                let lang = locales.strings     
                let set = new Set();                
                for (var key in member) {        
                    if(key==='isPrimary' && member[key]==='true'){                        
                        set.add({key:key,firstMessage:lang.formatString(lang.RemovePrimPerson) ,secondMessgae:lang.formatString(lang.Blank)})                         
                    }                   
                }
                if (this.props.isPendingApp === 'Yes') {
                    set.add({ key: 1, firstMessage: lang.pendingApplication, secondMessgae: lang.Blank })
                }
                    let array = Array.from(set)
                    let redirectTo = array.length<=0?'RemoveMember':'HouseHoldInformation'                    
                    this.setState({errorMessages:array,redirectTo:redirectTo,flag:true})                            
            }

            onMouseLeaveHandler(member){
                  const { loading } = this.state 
                  if(loading){
                    let array = Array    
                    let redirectTo = array.length<=0?'RemoveMember':'HouseHoldInformation'                    
                    this.setState({errorMessages:array(0),redirectTo:redirectTo})
                  }
                  setTimeout(() => this.setState({ flag: false }), 1000)                  
            }
            onMouseEnterHandlerPendingApp(event) {
                let lang = locales.strings
                let set = new Set();
                if (this.props.isPendingApp === 'Yes') {
                    set.add({ key: 1, firstMessage: lang.pendingApplication, secondMessgae: lang.Blank })
                }
                let array = Array.from(set)
                let addChildRedirectTo = array.length <= 0 ? 'AddChild' : 'HouseHoldInformation'
                let addAdultRedirectTo = array.length <= 0 ? 'AddAnAdult' : 'HouseHoldInformation'

                this.setState({ errorMessages: array, addChildRedirectTo: addChildRedirectTo, addAdultRedirectTo: addAdultRedirectTo, flag: true })
            }


    render(){
        let lang=locales.strings
        let redirectTo=this.getRMList().length>0 || this.getAddedMembersList().length>0 ?'Acknowledgement':'ARWorksHomePage'
        let housHoldInfoDisplay, data, data2
        let currentHHMembers;
        if(this.props.members.members !== '' && this.props.members.members !== null && this.props.members.members !== undefined){
            currentHHMembers=this.props.getHHMembers(this.props.members.members)
            data=<div>{this.renderPersons(currentHHMembers)}{this.renderRecentlyAddedPerson()}</div>
            housHoldInfoDisplay = <div className="container" >
            <SecondaryHeader HeadingName={lang.HeadingName} homeLink = 'No'/>
            <div className="blockUnderline"></div>
			{this.state.flag?<ErrorMessage errors={this.state.errorMessages}/>:null}
            <div className="annualSummaryDiv">
                <h4 className="subScreenHeaderforHouseHoldInformationPage">{lang.Heading}</h4>
                <div className="row buttonAtCenter">
                    <div className="col-md-4 col-sm-4 col-xs-4 paddingisLeft">
                        <h4>{lang.Name}</h4>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4 paddingisLeft">
                        <h4>{lang.DOB}</h4>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4 paddingisLeft">
                        <h4>{lang.Action}</h4>
                    </div>                        
                </div>
                <div className="row buttonAtCenter">
                    {data}
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-12 col-xs-12 buttonAtCenter" style={{marginLeft:'1.5px'}} onMouseEnter={this.onMouseEnterHandlerPendingApp.bind(this)}>                    
                        <ButtonFunctionality ButtonName={lang.AddChild} redirectTo={this.state.addChildRedirectTo} dstClassName="btn button-text buttonBack1"/>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12 buttonAtCenter" onMouseEnter={this.onMouseEnterHandlerPendingApp.bind(this)}>
                    <ButtonFunctionality ButtonName="Add an Adult" redirectTo={this.state.addAdultRedirectTo} dstClassName="btn button-text buttonBack1"/>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12 buttonAtCenter" style={{marginLeft:'1.5px'}}>
                        <ButtonFunctionality ButtonName={lang.confirmContinue} redirectTo={redirectTo} dstClassName="btn button-text buttonBack1"/>                            
                    </div>
                </div>
            </div>
        </div>
        }else{
            <div><h4>Processing your request....</h4></div>
        }
        return(
            <div>
            {housHoldInfoDisplay}
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
export default connect(mapStateToProps, {getHHMembers,fetchMembers,addEvidence,addEvd, getFormattedDateOfBirth,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(HouseHoldInformation)
