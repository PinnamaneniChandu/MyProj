import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings(
    {en:{
        RemoveMember:"Remove member",
        MemberName: "Member Name:",
        DOB:"Date of Birth:",
        ReasonRemoval:  "Enter the reason you are removing the member from the household.",
        Reason: "Reason",
        MemberDeceased: "Member Deceased",
        NotHome: "No longer in home",
        Select: '--Please Select--',
        IsMandatory:' must be entered.', 
        DOD: 'Date of death',
        DODFormat: 'The Date of death should be in date format mm/dd/yyyy',
        Blank:'',
        NotInFuture: 'cannot be in the future'

    },
    es:{
        RemoveMember:"Eliminar miembro",
        MemberName: "Nombre de miembro:",
        DOB:"Fecha de nacimiento:",
        ReasonRemoval:  "Ingrese la razón por la que está retirando al miembro del hogar.",
        Reason: "Motivo",
        MemberDeceased: "Miembro fallecido",
        NotHome: "Ya no en casa",
        Select: '-Seleccionar-',
        IsMandatory:'es obligatorio', 
        Reason: 'Razón',
        DOD: 'Fecha de muerte',
        DODFormat: 'La fecha de fallecimiento debe estar en formato de fecha mm / dd / aaaa',
        Blank:'',
        NotInFuture: 'no puede ser en el futuro'
    }
});
var userlang = navigator.userlang || navigator.language;
strings.setLanguage(userlang);