import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import '../CSS/App-extraSmallScreen.css'
import '../CSS/App-mediumScreen.css'
import '../CSS/App-smallScreen.css'
import React from 'react';
import SecondaryHeader from './components/SecondaryHeader';
import AnchorFunctionality from '../ClickFunc/AnchorFunctionality'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import {addEvd,updateEvd} from '../actions/CommonActions'
import { searchValueForName, isDatesInSeperateMonths } from '../actions/CommonActions'
import { displayIncome } from '../actions/IncomeActions'
import { connect } from 'react-redux'
import { MonthlySummaryInformation, MonthAndYearInformation} from '../actions/locationAction.js'
import ErrorMessage from './components/ErrorMessage'
import moment from 'moment-es6';
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import * as locales from './AddIncomePageProperties'

class IncomeDetailsPage extends React.Component{
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
    
        let locale = "en-us",
        today = new Date(moment(this.props.serverDate).add(1,'days').format('YYYY-MM-DD')),
        date = today.toLocaleString(locale, { month: "long" })+" "+ today.getFullYear();
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Income Details Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        this.state = {
            date: date,
            redirectTo: '',
            errorMessages:[],
            newIncomeDetails:[],
            newIncomeSourceDetails:[],
            disabled:'',
            reportYearMonthDate:''
        };
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Income Details Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
    handleChangeEnd(e){
        this.setState({dateIncomeReceived:e})
    }
    dateIncomeReceived(dateIncomeReceived){
        this.setState({dateIncomeReceived: dateIncomeReceived})
    }
    componentWillMount(){
        let monthName = this.props.monthAndYear.montlyAndYearData
        let monthAndYearValues = monthName.split(" ");
        var myDate = new Date(monthAndYearValues[0] + " 1, 2014");
        var monthDigit = myDate.getMonth() ;
        var currentMonth = monthDigit+1;
        if (currentMonth < 10) { 
            currentMonth = '0' + currentMonth; 
        }
        isNaN(currentMonth) ? 0 : (monthAndYearValues[0]); 
        var formattedMonthAndYear = monthAndYearValues[1] +''+ currentMonth
        var reportYearMonthDate =  moment(formattedMonthAndYear+''+currentMonth).format('YYYYMMDD')
        this.setState({reportYearMonthDate: reportYearMonthDate})
     
        this.props.displayIncome(formattedMonthAndYear);
        let flag=true
        if(this.props.location.data && this.props.location.data.data.index !== '' && this.props.location.data.data.updateFlag){        
        this.props.updateEvd(this.props.evidences.list, this.props.location.data.data, this.props.location.data.data.evidenceType, this.props.monthAndYear.montlySummaryData.month,this.props.location.data.data.index)
        flag=false
        } 
        else if(this.props.location.data && (this.props.location.data.data.page === 'AddNewIncomeSource' || this.props.location.data.data.page === 'AddIncome' || this.props.location.data.data.page === 'EndIncome')){     
        if(this.props.location.data.data.page === 'AddNewIncomeSource'){
            this.renderNewIncomeSource(this.props.location.data.data);
        }
        if(this.props.location.data.data.page === 'AddIncome'){
            this.renderNewIncome(this.props.location.data.data);
        }
        if(this.props.location.data.data.page === 'EndIncome'){
            let flag=5<7
            this.props.evidences.list.map((evidence,id)=>{
                evidence.updateFlag=false
                if(evidence.evidenceType==='DET0026030' && this.props.location.data.data.parentEvidenceDescriptorID === evidence.parentEvidenceDescriptorID)
                    {
                        let newEndDate= this.props.location.data.data.endDate;
                        let newEvidence=evidence;                    
                        newEvidence.endDate = newEndDate;                    
                        this.props.evidences.list[id]=newEvidence;
                        flag=false;
                    }                    
            })
            if(flag){
            this.props.addEvd(this.props.evidences.list,this.props.location.data.data,this.props.location.data.data.evidenceType, this.props.monthName.montlySummaryData.month)                    
            }
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

        this.setState({ errorMessages: array})
    }

    renderIncome(incomeData)
    {
        let incomes=[];
        let employmentWorkActivitys=[];        
        incomeData.evidencedtls.evidenceList.map((income)=>{
            if(income.evidenceType.value==='DET0026030'){
                    let newIncome={
                        evidenceType:income.evidenceType.value,
                        startDate: moment(this.props.searchValueForName(income.evidenceDataList,'startDate')).format('YYYYMMDD'),
                        endDate: this.props.searchValueForName(income.evidenceDataList,'endDate'),                        
                        incomeTypeName: this.props.searchValueForName(income.evidenceDataList,'incomeType') , 
                        incomeType: this.props.searchValueForName(income.evidenceDataList,'incomeTypeCode') ,
                        employerName:this.props.searchValueForName(income.evidenceDataList,'employerName') ,
                        amount:this.props.searchValueForName(income.evidenceDataList,'amount'),
                        dateIncomeReceived:moment(this.props.searchValueForName(income.evidenceDataList,'dateIncomeReceived')).format('YYYYMMDD'),
                        cntHours:this.props.searchValueForName(income.evidenceDataList,'hours'),
                        status:this.props.searchValueForName(income.evidenceDataList,'status'),
                        parentEvidenceDescriptorID:this.props.searchValueForName(income.evidenceDataList,'evidenceDescriptorID')
                    }                
                    incomes.push(newIncome)                  
            }
            if(income.evidenceType.value==='EEFDET0022'){
                let newIncome={
                    evidenceType:income.evidenceType.value,
                    incomeTypeName: this.props.searchValueForName(income.evidenceDataList,'incomeType') , 
                    incomeType: this.props.searchValueForName(income.evidenceDataList,'incomeTypeCode') ,
                    employerName:this.props.searchValueForName(income.evidenceDataList,'employerName') ,
                    amount:this.props.searchValueForName(income.evidenceDataList,'amount'),
                    dateIncomeReceived:moment(this.props.searchValueForName(income.evidenceDataList,'dateIncomeReceived')).format('YYYYMMDD'),
                    cntHours:this.props.searchValueForName(income.evidenceDataList,'hours'),
                    status:this.props.searchValueForName(income.evidenceDataList,'status'),
                    evidenceDescriptorID:this.props.searchValueForName(income.evidenceDataList,'evidenceDescriptorID')             
                }
                employmentWorkActivitys.push(newIncome)
        }
        })
        let newEMPActivityList = new Set();
        this.props.evidences.list.map((evidence)=>{
            if(evidence.evidenceType==='DET0026030' && evidence.page === 'AddNewIncomeSource'){
               incomes.push(evidence)                    
            }
        })
        this.props.evidences.list.map((evidence)=>{
           if(evidence.evidenceType==='EEFDET0022'){
               newEMPActivityList.add(evidence)            
           }
       })
        
       let EMPActivityArray = Array.from(newEMPActivityList)
         return incomes.map((income,index)=>{             
            income.updateFlag=false            
             let endDisabled,endRedirectTo,addDisabled,addRedirectTo              
             if(this.props.isPendingApp === 'Yes'){
                endDisabled=true
                addDisabled=true 
                addRedirectTo='IncomeDetailsPage'
                endRedirectTo='IncomeDetailsPage'
             }
             else{
                addDisabled=false
                addRedirectTo='AddIncome'
             if(income.endDate !== '0001-01-01' || income.endDate == '00010101'){
                    endDisabled=true;
                    endRedirectTo= 'AddIncome';
                   
             } else{
                    endDisabled=false;
                    endRedirectTo='EndIncome';
             }           
             }

             if(income.incomeType === 'IT26015')       {
                endDisabled=true
                addDisabled=true 
             } 
             let currentPeriodIncome, reportYearMonthDate, dateIncomeReceived, isDatesInDifferentMonths

             reportYearMonthDate = this.state.reportYearMonthDate
             dateIncomeReceived = moment(income.dateIncomeReceived).format('YYYYMMDD')
             isDatesInDifferentMonths = this.props.isDatesInSeperateMonths(dateIncomeReceived, reportYearMonthDate)
             if(isDatesInDifferentMonths === false && income.status !== 'Unsubmitted'){
                
                currentPeriodIncome =  <div>
                
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <p><b>Date:</b> </p>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-8">
                        <p>{moment(income.startDate).format('MM/DD/YYYY')}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <p><b>Amount:</b> </p>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-8">
                        <p className="wrapText">${parseFloat(income.amount.replace(/,/g, '')).toFixed(2)}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <p><b>Hours:</b> </p>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-8">
                        <p>{income.cntHours}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <p><b>Status:</b> </p>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-8">
                        <p>{income.status}</p>
                    </div>
                </div>   
                <div className="blockUnderline_forIncome"></div>  
                </div>             

             }else if(isDatesInDifferentMonths === true ){
                currentPeriodIncome = ''
             }


            return(
                <div key={index}>
                <div className="monthlySummary-divStyle income-details-summaryDivStyle">
                <p><b>Income: {income.incomeTypeName}</b></p>
                <p><b>Employer: {income.employerName}</b></p>
                <div className="blockUnderline_forIncome"></div>

                {this.renderNewIncomeSourceData(income)} 
                {currentPeriodIncome}                  
                    <br/>                     
                    {this.renderData(income,employmentWorkActivitys)}    
                    {this.renderNewIncomeData(income,EMPActivityArray)}
                    {this.renderTotalHoursAndTotalIncome(income,employmentWorkActivitys)}                
                    
                    <div className="row" onMouseEnter={this.onMouseEnterHandlerPendingApp.bind(this)}>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <ButtonFunctionality ButtonName="Add Income" redirectTo={addRedirectTo} disabled={addDisabled} dstClassName="btn btn-secoundary button-text buttonBack1" data={income}/>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <ButtonFunctionality ButtonName="End Income" redirectTo={endRedirectTo} disabled={endDisabled} dstClassName="btn btn-secoundary button-text buttonBack1" data={income}/>
                    </div>
                    </div>
                 </div>                                                                           
                </div>    
            )
        }) 
    }

    renderTotalHoursAndTotalIncome(income,employmentWorkActivitys){
            
            let TotalHours = [] , TotalIncome = [], amount=0, hours=0, totalAmountWithDecimals, incomeSourceAmount = 0, empAmount = 0,newlyEmpAmount=0, incomeSourceHours = 0, empHours = 0;
            let  reportYearMonthDate, dateIncomeReceived, isDatesInDifferentMonths            
            reportYearMonthDate = this.state.reportYearMonthDate
            dateIncomeReceived = moment(income.dateIncomeReceived).format('YYYYMMDD')
            isDatesInDifferentMonths = this.props.isDatesInSeperateMonths(dateIncomeReceived, reportYearMonthDate)
           
        employmentWorkActivitys.map((empact,index)=>{
                if(empact.evidenceType === 'EEFDET0022' && empact.incomeTypeName===income.incomeTypeName && empact.employerName===income.employerName && income.status !== 'Unsubmitted')
                { 
                        if(empact.status !== 'Unsubmitted'){
                        empAmount = ((parseFloat(empAmount)+parseFloat(Number.parseFloat(empact.amount.replace(/,/g, '')))).toFixed(2));                                     
                        empHours = empHours + Number(empact.cntHours)    
                            
                    }           
                }                                
            }            
        )                
            this.props.evidences.list.map((newlyEmpact,index)=>{
                if(newlyEmpact.evidenceType === 'EEFDET0022' && newlyEmpact.incomeTypeName===income.incomeTypeName && newlyEmpact.employerName===income.employerName && income.status !== 'Unsubmitted')
                    { 
                        if(newlyEmpact.status !== 'Unsubmitted'){

                        newlyEmpAmount = ((parseFloat(newlyEmpAmount)+parseFloat(Number.parseFloat(newlyEmpact.amount.replace(/,/g, '')))).toFixed(2));      
                         
                    }                                                                         
                    }                                                
            }
            )
            if(income.status !== 'Unsubmitted'){
            if(!this.props.isDatesInSeperateMonths(dateIncomeReceived, reportYearMonthDate)){
            incomeSourceAmount = ((parseFloat(incomeSourceAmount)+parseFloat(Number.parseFloat(income.amount.replace(/,/g, '')))).toFixed(2));
            }
        }

            if(income.status !== 'Unsubmitted'){
                if(!this.props.isDatesInSeperateMonths(dateIncomeReceived, reportYearMonthDate)){ 
                    incomeSourceHours = incomeSourceHours + Number(income.cntHours) 
                }
            }
            amount = (parseFloat(empAmount) + parseFloat(incomeSourceAmount) + parseFloat(newlyEmpAmount)).toFixed(2)          
        totalAmountWithDecimals = Number(amount).toFixed(2)
            hours = Number(empHours + incomeSourceHours)

        return(
            <div>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-4" style={{textAlign: 'center'}}>
                        <p><b>Total Income:</b></p>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-8">
                        <p><b>${totalAmountWithDecimals}</b></p>
                    </div>
                </div>
                <div className="row" >
                    <div className="col-md-4 col-sm-4 col-xs-4" style={{textAlign: 'center'}}>
                        <p><b>Total Hours:</b></p>
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-8">
                        <p><b>{hours}</b></p>
                    </div>
                </div>
            </div>
        )
    }
    renderData(income,employmentWorkActivitys)
    {         
        return employmentWorkActivitys.map((empact,index)=>{       
                if(empact.incomeTypeName===income.incomeTypeName && empact.employerName===income.employerName && income.status !== 'Unsubmitted')
                    {                          
                        
                return(
                    <div key={index}>
                        <div className="row">
                            <div className="col-md-4 col-sm-4 col-xs-4">
                                <p><b>Date:</b> </p>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-8">
                                <p>{moment(empact.dateIncomeReceived).format('MM/DD/YYYY')}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-sm-4 col-xs-4">
                                <p><b>Amount:</b> </p>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-8">                            
                                <p className="wrapText">${parseFloat(empact.amount.replace(/,/g, '')).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-sm-4 col-xs-4">
                                <p><b>Hours:</b> </p>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-8">
                                <p>{empact.cntHours}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-sm-4 col-xs-4">
                                <p><b>Status:</b> </p>
                            </div>
                            <div className="col-md-8 col-sm-8 col-xs-8">
                                <p>{empact.status}</p>
                            </div>
                        </div> 
                        <div className="blockUnderline_forIncome"></div>                       
                        <br/>
                </div>
                )
            }
            })  
    }
    
    renderNewIncomeData(income,addedIncome)
    {     
        return addedIncome.map((empact,index)=>{                        
            if(empact.employerName===income.employerName && empact.incomeType === income.incomeType)
                {
            return(
                <div key={index}>
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <p><b>Date:</b> </p>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-8">
                            <p>{moment(empact.dateIncomeReceived).format('MM/DD/YYYY')}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <p><b>Amount:</b> </p>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-8">
                            <p className="wrapText">${parseFloat(empact.amount.replace(/,/g, '')).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <p><b>Hours:</b> </p>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-8">
                            <p>{empact.cntHours}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <p><b>Status:</b> </p>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-8">
                            <p>{empact.status}</p>
                        </div>
                    </div> 
                    <div className="blockUnderline_forIncome"></div>                       
                    <br/>
            </div>
            )
        }
        })  
    }

    renderNewIncomeSourceData(income){

        let returnDiv=''
        if(income.status === 'Unsubmitted'){
            returnDiv =<div key='09'>
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-4">
                    <p><b>Date:</b> </p>
                </div>
                <div className="col-md-8 col-sm-8 col-xs-8">
                    <p>{moment(income.startDate).format('MM/DD/YYYY')}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-4">
                    <p><b>Amount:</b> </p>
                </div>
                <div className="col-md-8 col-sm-8 col-xs-8">
                    <p className="wrapText">${parseFloat(income.amount.replace(/,/g, '')).toFixed(2)}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-4">
                    <p><b>Hours:</b> </p>
                </div>
                <div className="col-md-8 col-sm-8 col-xs-8">
                    <p>{income.cntHours}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-4">
                    <p><b>Status:</b> </p>
                </div>
                <div className="col-md-8 col-sm-8 col-xs-8">
                    <p>{income.status}</p>
                </div>
            </div>                        
            <br/> 
            <div className="blockUnderline_forIncome"></div> 
            </div>            
        }
        else{
            returnDiv=''
        }
            
        return returnDiv;
    }

    renderNewIncomeSource(incomeSourceDetails){
        if(incomeSourceDetails){
        this.props.addEvd(this.props.evidences.list,incomeSourceDetails,incomeSourceDetails.evidenceType,this.props.monthName.montlySummaryData.month)
        let curIncomeSourceList = []
        this.props.evidences.list.map((evidence)=>{
            if(evidence.evidenceType===incomeSourceDetails.evidenceType){
                curIncomeSourceList.push(evidence)
            }
        })
        
        this.setState({newIncomeSourceDetails: curIncomeSourceList})
    }
    }

    

    renderNewIncome(incomeDetails){
        if(incomeDetails){
        this.props.addEvd(this.props.evidences.list,incomeDetails,incomeDetails.evidenceType, this.props.monthName.montlySummaryData.month)
        let curEmpActList = []
        this.props.evidences.list.map((evidence)=>{
            if(evidence.evidenceType===incomeDetails.evidenceType){
                curEmpActList.push(evidence)
            }
        })
        this.setState({newIncomeDetails: curEmpActList})
    }
    }
    convertToEvd(incomeDetails){

    }
    render(){       
        let ren=''
        if(this.props.income.incomeDetails!==''){
        ren=this.renderIncome(this.props.income.incomeDetails)    
        }
        return(
            <div className="container">
                <SecondaryHeader HeadingName="Income Details"/>
                <div className="blockUnderline"></div>
                <ErrorMessage errors={this.state.errorMessages}/>
                <h4 className="monthlySummary-divStyle" style={{textAlign:"center"}}>Reporting Period: {this.props.monthAndYear.montlyAndYearData}</h4>
                {ren}
                <div className="row">
                    <div className="col-md-3 col-sm-8 col-xs-8 income-details-buttons" style={{marginBottom: 9}}>                
                        <ButtonFunctionality ButtonName="Add New Income Source" redirectTo="NewIncomeSourcePage" dstClassName="btn btn-block button-text buttonBack1 buttonIncomeStyle"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-sm-6 col-xs-6 income-details-button">   
                        <ButtonFunctionality ButtonName="Continue" redirectTo="MonthlySummaryPage" dstClassName="btn btn-block button-text buttonBack1 buttonIncomeStyle"/>                         
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps (store) {
    return{
        evidences:store.evidences,
        income:store.income,
        monthAndYear: store.montlySummaryData,
        monthName: store.montlySummaryData,
        pageDetails: store.pageDetailsReducer
    }
  }
  
  
  export default connect(mapStateToProps, {isDatesInSeperateMonths,addEvd,updateEvd,searchValueForName,displayIncome,MonthAndYearInformation,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(IncomeDetailsPage)
  