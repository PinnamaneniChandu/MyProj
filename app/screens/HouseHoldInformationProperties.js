import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        HeadingName: "Household Information",
        emergency: "For help call 1-855-372-1084",
        Heading: "Current Household Members",
        Name:"Name",
        DOB:"Date of Birth",
        Action:"Action",     
        AddChild:"Add a Child",
        AddAdult:"Add an adult",
        confirmContinue:"Confirm & Continue",
        RemovePrimPerson:'This person cannot be removed from the household',
		Blank: '',
       
        pendingApplication: "You have an application that has not been processed. Please contact 1-855-372-1084 or go to your DHS County Office if you need to report changes or work requirement information."
    },
    es: {
        HeadingName: "Información del hogar",
        emergency:'Para obtener ayuda, llame al 1-855-372-1084',
        Heading: "Miembros actuales del hogar",
        Name:"Nombre",
        DOB:"Fecha de nacimiento",
        Action:"Acción",     
        AddChild:"Añadir un Niño",
        AddAdult:"Añadir un adulto",        
        confirmContinue:"Confirmar y continuar",
        RemovePrimPerson:'Esta persona no puede ser removida del hogar',
		Blank: '',
        
        pendingApplication: "You have an application that has not been processed. Please contact 1-855-372-1084 or go to your DHS County Office if you need to report changes or work requirement information."
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)