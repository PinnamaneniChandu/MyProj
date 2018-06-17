import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        Title: "System Failure Notice",
        systemProcessingFailure: "System Processing Failure",
        errorMessage: "We could not process your information at this time.",
        tryAgain: "Please try again later.",
        continue: "Continue"
    },
    es: {
        systemProcessingFailure: "System Processing Failure",
        errorMessage: "We could not process your information at this time.",
        tryAgain: "Please try again later.",
        continue: "Continue"
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)
