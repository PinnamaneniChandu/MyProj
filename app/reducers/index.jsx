import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware,combineReducers,createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
import promise from 'redux-promise-middleware';
import privateAddress from "./privateAddressReducer.jsx"
import mailingAddress from "./mailingAddressReducer.jsx"
import contact from './informationReducer.jsx'
import auth from './authUserReducer'
import addIncome from './addIncomReducer'
import volunteer from './volunteerReducer'
import validateAddress from './validateAddressReducer'
import personMatch from './personMatchReducer'
import CTReducer from './CTReducer'
import addAChild from './addAChildReducer'
import removeMember from './removePersonReducer'
import specialHealthNeeds from './specialHealthNeedsReducer'
import schoolVocationalJobTraining from './schoolVocationalJobTrainingReducer'
import income from './IncomeReducer'
import alcoholDrug from './alcoholDrugReducer'
import incapacitated from './incapacitatedPersonReducer'
import healthEducation from './healthEducationReducer'
import pregnancy from './pregnancyReducer'
import independentJob from './independentJobSearchReducer.js'
import HHMembers from './HHMembersReducer'
import evidences from './evidenceReducer'
import submitedEvidence from './evidenceSubmitReducer'
import addressAndpersons from './informationReducer'
import emailAddress from './emailAddressReducer.js'
import phoneNumber from './phoneNumberReducer.js'
import ARWorksSummary from './ARworksHomePageReducer.js'
import montlySummaryData from './locationData.js'
import eefARWorksEvidencesAndCommonInfo from './monthlySummaryReducer.js'
import workActivityDetails from './workActivityDetailsReducer.js'
import addressOperationStatus from './informationReducer.jsx'
import pageDetailsReducer from './pageDetailsReducer'
import { reducer as form  } from 'redux-form'
import serverDate from './serverDateReducer'
import pendingApp from './pendingAppReducer'
import preferredContact from './preferredContactReducer'

export default combineReducers({
	form,
	privateAddress,
	mailingAddress,
	contact,
	auth,
	addIncome,
	validateAddress,
	CTReducer,
	volunteer,
	addAChild,
	removeMember,
	specialHealthNeeds,
	schoolVocationalJobTraining,
	income,
	alcoholDrug,
	incapacitated,
	healthEducation,
	pregnancy,
	independentJob,
	schoolVocationalJobTraining,
	HHMembers,
	evidences,
	submitedEvidence,
	addressAndpersons,
	emailAddress,
	phoneNumber,
	ARWorksSummary,
	montlySummaryData,
	eefARWorksEvidencesAndCommonInfo,
	workActivityDetails,
	addressOperationStatus,
	serverDate,
	pageDetailsReducer,
	pendingApp,
	personMatch,
	preferredContact
})