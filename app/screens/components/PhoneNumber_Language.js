import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
   en:{
     AreaCode:"Area Code",
     PhoneNumber:"Phone Number"

	  },
  es: {
    AreaCode:"Código de área",
    PhoneNumber:"Número de teléfono",
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)