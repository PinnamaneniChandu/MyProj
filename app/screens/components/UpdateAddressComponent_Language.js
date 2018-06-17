import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
  en:{
      ADD2:"Address Line 1",
      ADD3: "Address Line 2",
      CITY: "City",
      USCOUNTY: "County",
      STATE: "State",
      ZIP: "Zip Code",
      IsMandatory:' must be entered.',
      ZIPVALID:"The Zip Code entered is not in a valid format. ",
      ZIPFORMAT:"It must either be in the following five digit format xxxxx or the following nine digit format xxxxx-xxxx.",
      TEMPORARILY: "Are you temporarily absent from Arkansas with the intent to return? "
	  },
  es: {
      ADD2:"Calle 1",
      ADD3: "Calle 2",
      CITY: "Ciudad",
      USCOUNTY: "Condado",
      STATE: "Estado",
      ZIP: "Código postal",
      TEMPORARILY: "¿Está temporalmente ausente de Arkansas con la intención de regresar? "
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)