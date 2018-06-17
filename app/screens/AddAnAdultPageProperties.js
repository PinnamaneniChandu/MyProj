import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
   en:{
      heading:'Add an Adult',      
      AddAdultMessage1:'You must submit a new application to add an adult to your household.',
      AddAdultMessage2:'When you complete this application, you must include:',
      AddAdultMessageYourself:'Yourself.',
      AddAdultMessageEveryoneRecCoverage:'Everyone in your household even if they already receive coverage.',
      AddAdultMessageTaxDependent:'Anyone who is a tax dependent of any of the people you are applying for.',
      AddAdultMessageRedirection:"You will be re-directed to the application when you click 'Continue to Application.'",
      ButtonContinueToApplication:'Continue to Application',
      ButtonCancel:'Cancel'
    },
  es: {
    AddAdultMessage1:'You must submit a new application to add an adult to your household.',
    AddAdultMessage2:'When you complete this application, you must include:',
    AddAdultMessageYourself:'Yourself',
    AddAdultMessageEveryoneRecCoverage:'Everyone in your household even if they already receive coverage.',
    AddAdultMessageTaxDependent:'Anyone who is a tax dependent of any of the people you are applying for.',
    AddAdultMessageRedirection:"You will be re-directed to the application when you click 'Continue to Application.'",
    ButtonContinueToApplication:'Continue to Application',
    ButtonCancel:'Cancelar'
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)