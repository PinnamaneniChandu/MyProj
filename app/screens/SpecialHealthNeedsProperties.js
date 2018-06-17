import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
		HeadingName: "Special Health Needs",
		SubHeadingName: "Enter the information about your special health needs.",
        disability: "Disability",
        liveInMedicalInst: "Do you live in medical institution?",
		permanentDisable: "I have a permanent disability",
		temporaryDisability: "I have a temporary disability that is preventing me from working or looking for work",
		livingMedicalInstitution: "Living in a Medical Institution",
        medicalInstitution: "Medical Institution",
        nursingHome: "Nursing Home",
        intermediateCareFacility: "Intermediate Care Facility for the Intellectually Disabled",
        arkStateHospital: "Arkansas State Hospital",
        arkHealthCenter: 'Arkansas Health Center',
        HumanDevCenter: 'Human Development Center',
        save: "Save",
        cancel: "Cancel",
        IsMandatory:" must be entered."
    },
    es: {
        receivedInformation: "Hemos recibido su información.",
        notRequiredToWork: "No está obligado a trabajar en este momento.",
        reason: "Razón",
        participating: "Participar en un programa de tratamiento de alcohol o drogas",
        noFurtherAction: "No se necesita ninguna otra acción. Recibirá un aviso con más información sobre su exención.",
        home: "Casa"
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)