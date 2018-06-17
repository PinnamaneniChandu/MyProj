import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        heading:"Household Address Change",
        headerNote:"Select the members that will receive the new address.",
        individualMembersLabel: "Member Name - Date of Birth",
        ButtonNext: "Next"
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