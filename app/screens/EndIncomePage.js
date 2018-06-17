import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import React from 'react'
import DatePicker from 'react-datepicker'
import CustomDatePicker from '../utilities/CustomDatePicker'
import SecondaryHeader from './components/SecondaryHeader'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import { connect } from 'react-redux'
import { endIncomeInformation } from '../actions/endIncomeAction.js'
import ErrorMessage from './components/ErrorMessage'
import * as locales from './EndIncomeProperties'
import moment from 'moment-es6';
import astrisk from '../assets/astrisk.png'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import * as monthlySummaryLocales from './MonthlySummaryPageProperties'

class EndIncome extends React.Component{
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        
        this.state = {
            page:'EndIncome',
            endIncomeDate: props.location.data.data && props.location.data.data.index >= 0 ? moment( props.location.data.data.endDate).format('YYYY-MM-DD') : '',
            redirectTo:'',
            disabled:'',
            incomeType:'',
            incomeTypeName:'',
            errorMessages:[],
            index: props.location.data.data && props.location.data.data.index >= 0 ? props.location.data.data.index : ''
        }
      //  this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'End Income Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
    }

      startDate(startDate){
          this.setState({endIncomeDate: startDate})
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'End Income Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }

    handleEndIncomeValues(){
        this.setState({
            endIncomeDate: this.refs.endIncomeDate.value.length===10 && this.refs.endIncomeDate.value!==undefined && this.refs.endIncomeDate.value !== '' ? moment(this.refs.endIncomeDate.value).format('YYYY-MM-DD') : this.refs.endIncomeDate.value,
        });
    }
    handleSubmit(event){
        if(this.state.endIncomeDate !== ''){
            event.preventDefault();
            return this.props.endIncomeInformation(this.state)
        }
    }
        onMouseEnterHandler(data){    
            let set = new Set();
             if(data.endDate === '' || data.endDate === null || data.endDate === '00010101' || data.endDate === "Invalid date"){                
                //this.refs.endIncomeDate.value='';
                set.add({key:1,firstMessage:"'End Date'",secondMessage:' must be entered.'})               
              }             
            else  if(data.startDate > data.endDate || moment(new Date(moment(this.props.serverDate))).format('YYYYMMDD') < data.endDate){                         
                set.add({key:2,firstMessage:'End Date should be on or between start date and current date',secondMessage:''})        
              } 
              let array1 = Array.from(set)
              let disabled;
              let redirectTo;
              if (array1.length<=0){
              disabled = false
              redirectTo = 'IncomeDetailsPage'
              } else{
              disabled= true 
              redirectTo = 'EndIncome'
              } 
              this.setState({errorMessages:array1,redirectTo:redirectTo,disabled:disabled})              
            }
                                             
    createData(evdData,Monthlylang){

        let incomeType = this.props.location.data.data.incomeType
        let displayLine1, displayLine2, displayLine2SecondRow, displayLine4, evidencename
    
        if (incomeType === 'IT26001') {
          evidencename = Monthlylang.TITLE_IT26001
          displayLine1 = Monthlylang.DISPLAY1_IT26001_END_INCOME
          displayLine2 = Monthlylang.EMPLOYER + '' + this.props.location.data.data.employerName
          displayLine2SecondRow = Monthlylang.END_DATE + '' + moment(this.state.endIncomeDate).format('MM/DD/YYYY')
          displayLine4 = ''
        } else if (incomeType === 'IT26008' || incomeType === 'IT26017' || incomeType === 'IT26015') {
          evidencename = Monthlylang.TITLE_IT26001
          displayLine1 = Monthlylang.DISPLAY1_IT26008_END_INCOME
          displayLine2 = Monthlylang.TYPE + '' + this.props.location.data.data.incomeTypeName
          displayLine2SecondRow = Monthlylang.END_DATE + '' + moment(this.state.endIncomeDate).format('MM/DD/YYYY')
          displayLine4 = ''
        }
          let data={
              page:'EndIncome',
              evidenceName : evidencename,
              evidenceType:"DET0026030",
              incomeType: this.props.location.data.data.incomeType,
              incomeTypeName: this.props.location.data.data.incomeTypeName,
              employerName: this.props.location.data.data.employerName,
              parentEvidenceDescriptorID:this.props.location.data.data.parentEvidenceDescriptorID,
              startDate:  moment(this.props.location.data.data.startDate).format('YYYYMMDD'),
              endDate: moment(this.state.endIncomeDate).format('YYYYMMDD'),
              status:'UnSubmitted' ,
              displayLine1: displayLine1,
              displayLine2: displayLine2,
              displayLine2SecondRow: displayLine2SecondRow,
              displayLine4: displayLine4,
              index: this.state.index,
              updateFlag: this.props.location.data.data ? this.props.location.data.data.updateFlag : false
          }
          return data;
          this.setState({
            incomeTypeName : incomeTypeName
          });
        }

    render () {
        let lang=locales.strings;
        let Monthlylang = monthlySummaryLocales.strings
        let data = this.createData(this.state, Monthlylang);
        return (
            <div className='container'>
                <SecondaryHeader HeadingName={lang.EndIncome} />
                <div className='blockUnderline'></div>
				<ErrorMessage errors={this.state.errorMessages}/>
                    <div className='row addIncomeType'>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <b>{lang.Type} {this.props.location.data.data.incomeTypeName}</b>
                        </div>                       
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <b>{lang.Employer} {this.props.location.data.data.employerName}</b>                        
                        </div>
                    </div>
                    <span className= "required col-md-12 col-sm-12 col-xs-12" style={{ paddingBottom: '2%' }}>* Indicates a required field</span>
                    <p>{lang.Message}</p>            
                    <form ref='addIncome_form' onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                    <label className="Labels">{lang.Date}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                </div>
                                <div className="col-md-8 col-sm-8 col-xs-12">
                                <CustomDatePicker curamServerDate={this.props.serverDate} initialStartDate={this.state.endIncomeDate} startDate={this.startDate.bind(this)}/>                                  
                                </div>                           
                        </div>    
                            <div className="row addIncomeFormDivStyle">
                                <div className="col-md-11 col-sm-7 col-xs-7">
                                <ButtonFunctionality ButtonName={lang.Cancel} displayText="IncomeDetailsPage" dstClassName="btn buttonBack1"/>
                                </div>
                                <div className="col-md-1 col-sm-5 col-xs-5 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this, data)}>
                                <ButtonFunctionality ButtonName={lang.Save} disabled={this.state.disabled} redirectTo={this.state.redirectTo} dstClassName="btn buttonBack1 marginLeftForButtons" data={data}/>
                                </div>
                            </div>
                            
                    </form>
            </div>           
        )
    }
}
function mapStateToProps(store) {
    return {
    endIncomeResponse: store.endIncome,
    pageDetails: store.pageDetailsReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        endIncomeInformation:endIncomeInformation
    };
}


export default connect(mapStateToProps,{endIncomeInformation,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(EndIncome);
