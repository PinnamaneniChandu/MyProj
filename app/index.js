import './CSS/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import {Route, HashRouter as Router} from 'react-router-dom'
import store from './store.jsx'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import Summary from './screens/ARWorksHomePage'
import VolunteerPage from './screens/VolunteerPage'
import ExemptionsWorkAactivitiesPage from './screens/ExemptionsWorkAactivitiesPage'
import MonthlySummaryPage from './screens/MonthlySummaryPage'
import NewIncomeSourcePage from './screens/NewIncomeSourcePage'
import IncomeDetailsPage from './screens/IncomeDetailsPage'
import HouseHoldInformation from './screens/HouseHoldInformationPage'
import RemoveMember from './screens/RemoveMemberPage'
import AddIncome from './screens/AddIncomePage'
import EndIncome from './screens/EndIncomePage'
import Acknowledgement from './screens/AcknowledgementPage'
import InformationPage from './screens/InformationPage'
import UpdateContactInformationPage from './screens/UpdateContactInformationPage'
import HomeAddress from './screens/HomeAddressPage'
import MailingAddress from './screens/MailingAddressPage'
import requireAuth from './utilities/requireAuth'
import PhoneNumber from './screens/PhoneNumberPage'
import UpdateContactInfoPhonenumber from './screens/UpdateContactInfoPhonenumber'
import UpdateContactInfoEmailAddress from './screens/UpdateContactInfoEmailAddress'
import AlcoholDrugTreatement from './screens/AlcoholDrugTreatementProgramPage'
import SubmissionPage from './screens/SubmissionPage'
import Incapacitated from './screens/CaringForIncapacitatedPersonPage'
import HealthEducationClass from './screens/HealthEducationClassPage'
import PregnancyInformation from './screens/PregnancyInformationPage'
import EmailAddress from './screens/EmailAddressPage'
import HomeAddressValidation from './screens/HomeAddressValidationPage'
import MailingAddressValidation from './screens/MailingAddressValidationPage'
import JobSearchTrainingProgram from './screens/JobSearchTrainingProgramPage'
import JobSearch from './screens/JobSearchPage'
import SpecialHealthNeeds from './screens/SpecialHealthNeedsPage'
import AddAnAdult from './screens/AddAnAdultPage'
import RemoveExemption from './screens/RemoveExemption'
import EmailRequiredPage from './screens/EmailRequiredPage'
import UnsubmittedInformation from './screens/UnsubmittedInformationPage'
import WorkActivityDetails from './screens/WorkActivityDetailsPage'
import HouseHoldAddressChange from './screens/HouseHoldAddressChangePage'
import UpdateContactHHAdressChangePage from './screens/UpdateContactHHAdressChangePage'
import SnapWorkPlan from './screens/SnapWorkPlanPage'
import Processing from './screens/ProcessingPage'
import StudentPage from './screens/StudentPage'
import AddChild from './screens/AddChildPage'
import SubmissionStatus from './screens/SubmissionStatus'
import SystemFailurePage from './screens/SystemFailurePage'
import HouseHoldAddressRemove from './screens/HouseHoldAddressRemovePage'
import RemoveContactInfoConfirmation from './screens/RemoveContactInfoConfirmationPage'
import RemoveContactInfoErrorPage from './screens/RemoveContactInfoErrorPage'
import ProcessingContactInformation from './screens/ProcessingContactInfomation'
import ContactInfoFailurePage from './screens/ContactInformationFailurePage'
import UpdatePreferredContactInformationPage from './screens/UpdatePreferredContactInformationPage'
import UpdateHomeAddress from './screens/UpdateHomeAddressPage'
import UpdateMailingAddress from './screens/UpdateMailingAddressPage'
import UpdateHouseHoldAddressRemove from './screens/UpdateHouseHoldAddressRemovePage'
import UpdateRemoveContactInfoErrorPage from './screens/UpdateRemoveContactInfoErrorPage'
import UpdateProcessingPage from './screens/UpdateProcessingPage'
import UpdateProcessingContactInformation from './screens/UpdateProcessingContactInformation'
import preferedContactInformation from './screens/preferedContactInformation'
import UpdateRemoveContactInfoConfirmation from './screens/UpdateRemoveContactInfoConfirmationPage'
import UpdateHomeAddressValidation from './screens/UpdateHomeAddressValidationPage'
import UpdateMailingAddressValidation from './screens/UpdateMailingAddressValidationPage'
import ValidatingPersonDetails from './screens/ValidatingPersonDetails'
const router = (
  <Provider store={store}>
    <Router>
      <switch className='container'>
        <Route exact path='/' component={requireAuth(InformationPage)} />
        <Route exact path='/UpdateContactInformationPage' component={requireAuth(UpdateContactInformationPage)} />
        <Route path='/Summary' component={requireAuth(Summary)} />
        <Route path='/ExemptionsWorkAactivitiesPage' component={requireAuth(ExemptionsWorkAactivitiesPage)} />
        <Route path='/MonthlySummaryPage' component={requireAuth(MonthlySummaryPage)} />
        <Route path='/VolunteerPage' component={requireAuth(VolunteerPage)} />
        <Route path='/NewIncomeSourcePage' component={requireAuth(NewIncomeSourcePage)} />
        <Route path='/IncomeDetailsPage' component={requireAuth(IncomeDetailsPage)} />
        <Route path='/HouseHoldInformation' component={requireAuth(HouseHoldInformation)} />
        <Route path='/RemoveMember' component={requireAuth(RemoveMember)} />
        <Route path='/AddIncome' component={requireAuth(AddIncome)} />
        <Route path='/EndIncome' component={requireAuth(EndIncome)} />
        <Route path='/Acknowledgement' component={requireAuth(Acknowledgement)} />     
        <Route path='/HomeAddress' component={requireAuth(HomeAddress)} />
        <Route path='/MailingAddress' component={requireAuth(MailingAddress)} />
        <Route path='/PhoneNumber' component={requireAuth(PhoneNumber)}/> 
       
        <Route path='/AlcoholDrugTreatement' component={requireAuth(AlcoholDrugTreatement)} />
        <Route path='/SubmissionPage' component={requireAuth(SubmissionPage)} />
        <Route path='/Incapacitated' component={requireAuth(Incapacitated)} />
        <Route path='/HealthEducationClass' component={requireAuth(HealthEducationClass)} />
        <Route path='/PregnancyInformation' component={requireAuth(PregnancyInformation)} />
        <Route path='/EmailAddress' component={requireAuth(EmailAddress)} />
        <Route path='/UpdateContactInformationPage/EmailAddress' component={requireAuth(EmailAddress)} />  
        <Route path='/HomeAddressValidation' component={requireAuth(HomeAddressValidation)} />
        <Route path='/MailingAddressValidation' component={requireAuth(MailingAddressValidation)} />
        <Route path='/JobSearchTrainingProgram' component={requireAuth(JobSearchTrainingProgram)} />
        <Route path='/JobSearch' component={requireAuth(JobSearch)} />
        <Route path='/SpecialHealthNeeds' component={requireAuth(SpecialHealthNeeds)} />
        <Route path='/AddAnAdult' component={requireAuth(AddAnAdult)} />	
        <Route path='/RemoveExemption' component={requireAuth(RemoveExemption)} />	
        <Route path='/EmailRequiredPage' component={requireAuth(EmailRequiredPage)} />
        <Route path='/UnsubmittedInformation' component={requireAuth(UnsubmittedInformation)} />
        <Route path='/WorkActivityDetails' component={requireAuth(WorkActivityDetails)} />
        <Route path='/HouseHoldAddressChange' component={requireAuth(HouseHoldAddressChange)} />
        {/* <Route path='/UpdateContactInformationPage/HouseHoldAddressChange' component={requireAuth(HouseHoldAddressChange)} /> */}
        <Route path='/SnapWorkPlan' component={requireAuth(SnapWorkPlan)} />
        <Route path='/StudentPage' component={requireAuth(StudentPage)} />
        <Route path='/AddChild' component={requireAuth(AddChild)} />
        <Route path='/SubmissionStatus' component={requireAuth(SubmissionStatus)} />
        <Route path='/SystemFailurePage' component={requireAuth(SystemFailurePage)} />
        <Route path='/HHAddressRemove' component={requireAuth(HouseHoldAddressRemove)} />
        <Route path='/RemoveCIConfirmation' component={requireAuth(RemoveContactInfoConfirmation)} />
        <Route path='/RemoveContactInfoErrorPage' component={requireAuth(RemoveContactInfoErrorPage)} />
        <Route path='/Processing' component={requireAuth(Processing)} />
        <Route path='/ProcessingContactInformation' component={requireAuth(ProcessingContactInformation)} />
        <Route path='/ContactInfoFailurePage' component={requireAuth(ContactInfoFailurePage)} />
        <Route path='/ValidatingPersonDetails' component={requireAuth(ValidatingPersonDetails)} />
        <Route path='/UpdateContactInformationPage/UpdateContactHHAdressChangePage' component={requireAuth(UpdateContactHHAdressChangePage)} />
        <Route path='/UpdateContactInformationPage/UpdatePreferredContactInformationPage' component={requireAuth(UpdatePreferredContactInformationPage)} />
        <Route path='/UpdateContactInformationPage/UpdateHomeAddress' component={requireAuth(UpdateHomeAddress)} />
        <Route path='/UpdateContactInformationPage/UpdateMailingAddress' component={requireAuth(UpdateMailingAddress)} />
        <Route path='/UpdateContactInformationPage/UpdateContactInfoPhonenumber' component={requireAuth(UpdateContactInfoPhonenumber)}/>
        <Route path='/UpdateContactInformationPage/UpdateContactInfoEmailAddress' component={requireAuth(UpdateContactInfoEmailAddress)}/>
        <Route path='/UpdateContactInformationPage/UpdateHouseHoldAddressRemovePage' component={requireAuth(UpdateHouseHoldAddressRemove)}/>
        <Route path='/UpdateContactInformationPage/UpdateRemoveContactInfoErrorPage' component={requireAuth(UpdateRemoveContactInfoErrorPage)}/>
        <Route path='/UpdateContactInformationPage/UpdateProcessingPage' component={requireAuth(UpdateProcessingPage)}/>
        <Route path='/UpdateContactInformationPage/UpdateProcessingContactInformation' component={requireAuth(UpdateProcessingContactInformation)}/>
        <Route path='/UpdateContactInformationPage/preferedContactInformation' component={requireAuth(preferedContactInformation)}/>
        <Route path='/UpdateContactInformationPage/UpdateRemoveCIConfirmation' component={requireAuth(UpdateRemoveContactInfoConfirmation)} />
        <Route path='/UpdateContactInformationPage/UpdateHomeAddressValidation' component={requireAuth(UpdateHomeAddressValidation)} />
        <Route path='/UpdateContactInformationPage/UpdateMailingAddressValidation' component={requireAuth(UpdateMailingAddressValidation)} />
      </switch>
    </Router>
  </Provider>
)
ReactDOM.render(router, document.getElementById('root'))
