import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        heading: "Remove Exemption/Work Activity",
        removing: "You are removing",
        cancel: "Cancel",
        continue: "Continue"
    },
    es: {
        heading: "Eliminar exención / Actividad laboral",
        removing: "Está a punto de eliminar la exención del programa de tratamiento de alcohol y drogas que se agregó. Esta operación no se puede deshacer. ¿Estás seguro?",
        cancel: "Cancelar",
        continue: "retirar"
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)