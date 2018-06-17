import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
  en:{
      street1:"Address Line 1",
      street2: "Address Line 2",
      City: "City",
      County: "County*",
      State: "State",
      ZipCode: "Zip Code",
      temporarily: "Are you temporarily absent from Arkansas with the intent to return? *"
	  },
  es: {
      street1:"Calle 1*",
      street2: "Calle 2*",
      City: "Ciudad*",
      County: "Condado*",
      State: "Estado*",
      ZipCode: "Código postal*",
      temporarily: "¿Está temporalmente ausente de Arkansas con la intención de regresar? *"
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)