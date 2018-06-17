import React from 'react'
import '../../../CSS/App.css'
import '../../../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../../../ClickFunc/ButtonFunctionality'
import * as locales from '../../workActivityDetailsScreenProperties'


export default class TopComponent extends React.Component{
    constructor(props){        
        super(props);
        this.state={
            errorMessages:[],      
            IncapacitatedRedirectTo:"Incapacitated",
            AlcoholRedirectTo:'Alcohol',
            StudentPageRedirectTo:'StudentPage' ,
            IhaveChildRedirectTo:'HouseHoldInformation',
            disabled:false      
        }
    }        
    componentWillMount(){
        this.state={
            blindData:{
                evidenceName:"Special Health Needs",
                displayLine1 : 'Blind',
                displayLine3 : '',
                displayLine3 : '',
                evidenceType:"DET0026010",
                disabilityType:"DT1",
            },
            longTermCareData:{
                evidenceName:"Special Health Needs",
                displayLine1 : 'Need help with daily activities ',
                displayLine3 : '',
                displayLine3 : '',
                evidenceType:"DET0026010",
                disabilityType:"DT26301",
            }
        }
    }
    onMouseEnterHandlerPendingApp(event){ 
        let lang = locales.strings 
        let set = new Set();
        if (this.props.isPendingApp === 'Yes') {
            set.add({ key: 1, firstMessage: lang.pendingApplication, secondMessgae: lang.Blank })
        }
        let array = Array.from(set)
        let IncapacitatedredirectTo = array.length <= 0 ? 'Incapacitated' : 'ExemptionsWorkActivitiesPage'
        let AlcoholRedirectTo= array.length <= 0 ?'Alcohol': 'ExemptionsWorkActivitiesPage'
        let StudentPageRedirectTo =array.length <= 0 ?'StudentPage': 'ExemptionsWorkActivitiesPage'
        let IhaveChildRedirectTo =array.length <= 0 ?'HouseHoldInformation': 'ExemptionsWorkActivitiesPage'
        let disabled =array.length <= 0 ?false:true

        this.setState({ errorMessages: array, StudentPageRedirectTo: StudentPageRedirectTo,IhaveChildRedirectTo:IhaveChildRedirectTo,AlcoholRedirectTo:AlcoholRedirectTo,
            IncapacitatedredirectTo:IncapacitatedredirectTo,disabled:disabled})
            this.props.ErrorMessageTop(array)
    }


    render(){
        return(
            <div>
               <p className="pStyle" style={{textAlign:"center"}}>If you are enrolled in Arkansas Works and are between 30 and 49 years old, you are required to report work activities unless
                     you meet the requirements for one of the items below.</p>
                    <p style={{textAlign:"center"}}>Select the item(s) below that apply to you.</p>
                    <ButtonFunctionality ButtonName="I work and make more than $736 a month before taxes" displayText="IncomeDetailsPage" dstClassName="btn btn-block responsive-width"/>                 
                    <div onMouseEnter={this.onMouseEnterHandlerPendingApp.bind(this)} className="WorkComponent"> 
                    <ButtonFunctionality ButtonName="I have a child under 18 in my home"  displayText="" redirectTo={this.state.IhaveChildRedirectTo} disabled={this.state.disabled} dstClassName="btn btn-block responsive-width"/>
                    </div> 
                    <ButtonFunctionality ButtonName="I am pregnant or was pregnant within the last 60 days"  displayText="" redirectTo="PregnancyInformation" dstClassName="btn btn-block responsive-width"/>
                    <div onMouseEnter={this.onMouseEnterHandlerPendingApp.bind(this)} className="WorkComponent"> 
                    <ButtonFunctionality ButtonName="I go to school, vocational or job training full time" displayText="" redirectTo={this.state.StudentPageRedirectTo} disabled={this.state.disabled} dstClassName="btn btn-block responsive-width"/>               
                    <ButtonFunctionality ButtonName="I get unemployment benefits" displayText="IncomeDetailsPage" dstClassName="btn btn-block responsive-width"/>
                    <ButtonFunctionality ButtonName="I care for a person who cannot care for him/herself" displayText="" redirectTo={this.state.IncapacitatedredirectTo} disabled={this.state.disabled} dstClassName="btn btn-block responsive-width"/>
                    <ButtonFunctionality ButtonName="I am in an alcohol or drug treatment program" displayText="" redirectTo={this.state.AlcoholRedirectTo} disabled={this.state.disabled} dstClassName="btn btn-block responsive-width"/>
                    </div>
                    <ButtonFunctionality ButtonName="I can't work or look for work because of short-term disability" displayText="" redirectTo="SpecialHealthNeeds" dstClassName="btn btn-block responsive-width" data='Short Term Disability'/>
                    <ButtonFunctionality ButtonName="I am blind" displayText="" redirectTo="MonthlySummaryPage" dstClassName="btn btn-block responsive-width" data={this.state.blindData}/>
                    <ButtonFunctionality ButtonName="I have a disability" displayText="" redirectTo="SpecialHealthNeeds" dstClassName="btn btn-block responsive-width" data='disability'/>
                    <ButtonFunctionality ButtonName="I need help with daily living activities" displayText="" redirectTo="MonthlySummaryPage" dstClassName="btn btn-block responsive-width" data={this.state.longTermCareData}/>                    
                    <br/><p className="pStyle" style={{textAlign:"center"}}>If you do not meet the requirements for one of the items above, you must report at least 80 hours of work activity per month.</p>
                    <p className="pStyle1" style={{textAlign:"center"}}>Report your hours by selecting the work activities below that apply to you.</p>
            </div>
        );
    }
}
