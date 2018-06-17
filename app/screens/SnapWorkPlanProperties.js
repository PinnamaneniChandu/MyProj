import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        snap: "SNAP Work Plan Compliance",
        organizationName: "Organization Name",
        contactName: "Contact Name",
        heading: "Enter information about compliance with your SNAP work plan.",
        save: "Save",
        cancel: "Cancel",
        IsMandatory:' must be entered.',
        OrgName: 'Organization Name ',
        Hours: 'Hours ',
        AddressLine1: 'Address Line 1',
        City:'City',
        State: 'State',
        ZipCode: 'Zip Code ',
        InValidZipCode: 'The Zip Code entered is not in a valid format.',
        FormatZipCode: ' It must either be in the following five digit format xxxxx or the following nine digit format xxxxx-xxxx.',
        PhoneNumber: 'Phone Number',
        AreaCode: 'Area Code',
        InvalidPhoneNumber: 'The Phone Number entered is not in a valid format. It must be in the following ten digit format ',
        FormatPhoneNumber: '(Area code - Phone number) xxx-xxxxxxx.'
    },
    es: {
        snap: "Cumplimiento del plan de trabajo SNAP",
        organizationName: "Nombre de la Organización*",
        contactName: "Nombre de contacto*",
        heading: "Ingrese información sobre el cumplimiento de su plan de trabajo SNAP.",
        save: "Salvar",
        cancel:"Cancelar",
        IsMandatory:'es obligatorio',
        OrgName: 'Nombre de la Organización ',
        Hours: 'Horas ',
        AddressLine1: 'Dirección Línea 1',
        City:'Ciudad',
        State: 'Estado',
        ZipCode: 'Código postal ',
        InValidZipCode: 'El código postal ingresado no está en un formato válido.',
        FormatZipCode: ' Debe estar en el siguiente formato de cinco dígitos xxxxx o el siguiente formato de nueve dígitos xxxxx-xxxx.',
        PhoneNumber: 'El numero de telefono',
        InValidPhoneNumber: 'El número de teléfono ingresado no está en un formato válido. Debe estar en el siguiente formato de diez dígitos ',
        FormatPhoneNumber: '(Código de área: número de teléfono) xxx-xxxxxxx.'
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)