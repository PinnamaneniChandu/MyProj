import LocalizedStrings from 'react-localization'
export let strings = new LocalizedStrings({
   en:{    
      HOMELESS:"Are you homeless?",
      ButtonNext: "Continue",
      ButtonCancel:'Cancel',
      STATERESIDENT:'Are you a state resident?',
      TEMPABS:'Are you temporarily absent from Arkansas with the intent to return?',
      Heading:"Remove Home Address",
      IsMandatory:' must be entered.',
      homelessMessage: 'Select are you homeless',
      stateResidentMessage: 'Select are you a state resident',
      tempAbsMessage: 'Select are you temporarily absent from Arkansas and intent to return?'
      
    },
  es: {
    headingLabel:"Direccion de casa",
    ButtonSave: "Salvar",
    ButtonCancel:'Cancelar',
    IsMandatory:' debe ser ingresado',
    homelessMessage: 'Select are you homeless',
    stateResidentMessage: 'Select are you a state resident',
    tempAbsMessage: 'Select are you temporarily absent from Arkansas and intent to return?'
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)