import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
en:{
    // Details Title 
    TYPE: "Type: ",
    IT26001: 'Income: ',
    IT26008: 'Income: ',
    IT26017: 'Income: ',
    IT26015: 'Unemployment Insurance',
    DT1: 'Special Health Needs: ',
    DT2: 'Special Health Needs: ',
    DT26301: 'Special Health Needs: ',
    EEFDT2: 'Special Health Needs: ',
    EEFDET0010: 'Special Health Needs: ',
    DET0026008: 'Pregancy: ',
    EEF01: 'School or Vocational Training',
    ST3: 'School or Vocational Training',
    EEF02: 'School or Vocational Training',
    EEF03: 'School or Vocational Training',
    ST12: 'School or Vocational Training',
    ST5: 'School or Vocational Training',
    ST7: 'School or Vocational Training',
    EEFDET0017: 'Caring for incapacitated person',
    EEFDET0016: 'Alcohol or Drug Treatment program',
    EEFDET0021: 'Job Search',
    EEFDET0018: 'Job Search Training',
    EEFDET0019: 'Volunteer',
    EEFDET0025: 'Compliant with SNAP Plan',
    EEFDET0020: 'Health Education Class',
    EEFDET0027: 'Child living in my home',
    pendingApplication: "You have an application that has not been processed. Please contact 1-855-372-1084 or go to your DHS County Office if you need to report changes or work requirement information that are disabled below.",
    // Details Value
    FROM_DATE: "From Date: ",
    TO_DATE: 'To Date: ',
    JOB_CONTACTS: "Job Contacts: ",
    HOURS: "Hours: ",
    PROGRAM_NAME: 'Program Name: ',
    PROGRAM_FACILITY_NAME: 'Program/Facility Name: ',
    CONTACT_NAME: 'Contact Name: ',
    ADDRESS: 'Address: ',
    STATUS : 'Status: ',
    SUBMITTED : 'Submitted',
    RECEIVED_HELP: 'Received Help With Job Search: ',
    AREA_CODE: 'Area Code: ',
    PHONE_NUMBER: 'Phone Number: ',
    COMMENTS: 'Comments: ',
    INCAPACITATED_PERSON_NAME : 'Incapacitated Person Name: ',
    ATTENDENCE_TYPE : 'Attendence Type: ',
    LOCATION_NAME: 'Location Name: ',
    ORGANIZATION_NAME : 'Organization Name: ',
    CLASS_NAME: 'Class Name: ',
    DISABILITY_TYPE: 'Disability Type: ',
    COMPETENCY_STATUS: 'Competency Status: ',
    DATE_OF_COMPETENCY: 'Date Competency Determined: ',
    DISABILITY_START_DATE: 'Disability Start Date: ',
    DISABILITY_END_DATE: 'Disability End Date: ',
    INSTITUTION_TYPE: 'Institution Type: ',
    START_DATE: 'Start Date: ',
    END_DATE: 'End Date: ',
    SCHOOL_TYPE: 'School Type: ',
    SCHOOL_ORG_NAME: 'School/ Organization Name: ',
    AMOUNT: 'Amount: ',
    RECEIVED_DATE: 'Received Date: ',
    EMPLOYER: 'Employer: ',
    TOTAL_INCOME:'Total Income: ',
    TOTAL_HOURS:'Total Hours: ',
    NO_UNBORN: 'Number of Unborn: ',
    PREG_END_DATE: 'Pregnancy End Date: ',
    DUE_DATE: 'Due Date: ',
    ENROLLED_MEDICAID: 'Enrolled On Medicaid During Pregnancy: ',   
    NAME:'Name: ',
    CHLD_EXEMP : 'Child Exemption',
    MONTHLY: '(Monthly)',
	},
es: {
        programFacilityName:"*Nombre del programa / instalación",
        contactName:"*contacto nombre",
        info: "Ingrese la información sobre el programa / instalación donde está participando.",
        title:"Programa de Tratamiento de Alcohol o Drogas",
        save: "Salvar",
        Cancel:"Cancelar",
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)