import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        heading:"Preferred Contact Method",
        headerNote:"Current Preferred Contact Method : ",
        individualMembersLabel: "Preferred Contact Method",
        preferedContactType: 'Preferred Contact Type',
        ButtonSave: "Save",
        ButtonCancel: "Cancel",
        Select: "--Please Select--",
        IsMandatory:' must be entered.',
    },
    es: {
        heading:"Cambio de dirección del hogar",
        headerNote:"Seleccione los miembros de su hogar que recibirán la nueva dirección.",
        individualMembersLabel: "Seleccionar miembros individuales",
        ButtonNext: "Siguiente"
        }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)