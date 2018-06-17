import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        caring: "Caring For Someone Who Cannot Care For Him/Herself",
        aboutPerson: "Enter information about the person you care for",
        nameOfPerson: "Name of the person you care for",
        save: "Save",
        cancel: "Cancel",
        IsMandatory:' must be entered.',
        NameOfPerson:'Name of the person you care for',
        AddressLine1: 'Address Line 1 ',
        City: 'City',
        State: 'State',
        ZipCode: 'Zip Code',
        InValidZipCode: 'The Zip Code entered is not in a valid format.',
        FormatZipCode: ' It must either be in the following five digit format xxxxx or the following nine digit format xxxxx-xxxx.',
        InValidPhoneNumber: 'The Phone Number entered is not in a valid format. It must be in the following ten digit format ',
        FormatPhoneNumber: '(Area code - Phone number) xxx-xxxxxxx.',
        evidenceName: 'Caring for someone who cannot care for him/herself',
        personCareFor: 'Person you care for: ' 
    },
    es: {
        caring: "Cuidar a alguien que no puede cuidar de él / ella misma",
        aboutPerson: "Ingrese la información sobre la persona que usted cuida.",
        nameOfPerson: "Nombre de la persona que usted cuida *",
        save: "Salvar",
        cancel:"Cancelar",
        IsMandatory:'es obligatorio',
        NameOfPerson:'Nombre de la persona que cuida',
        AddressLine1: 'Dirección 1',
        City: 'Ciudad',
        State: 'Estado',
        ZipCode: 'Código postal',
        InValidZipCode: 'El código postal ingresado no está en un formato válido.',
        FormatZipCode: ' Debe estar en el siguiente formato de cinco dígitos xxxxx o el siguiente formato de nueve dígitos xxxxx-xxxx.',
        InValidPhoneNumber: 'El número de teléfono ingresado no está en un formato válido. Debe estar en el siguiente formato de diez dígitos ',
        FormatPhoneNumber: '(Código de área: número de teléfono) xxx-xxxxxxx.',
        evidenceName:"Cuidar a alguien que no puede cuidar de él / ella misma",
        personCareFor: 'Persona que cuida: ' 
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)