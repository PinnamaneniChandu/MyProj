import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        leaveSite: "Do you want to leave this site?",
        chnagesSaved: "Changes you made will not be saved.",
        leave: "Leave",
        stay: "Stay",
    },
    es: {
        leaveSite: "¿Quieres salir de este sitio?",
        chnagesSaved: "Los cambios realizados no se pueden guardar.",
        leave: "Salir",
        stay: "Permanecer",
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)