import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        infoRequired: "Required Information",
        emailRequired: "Email address is required",
        emailMessage: "If you do not have an email address you can go to the home page of one of the popular free email providers* such as Gmail (@gmail.com) or Yahoo Mail (@yahoo.com). From there, click sign up or create an account.",
        emailNote: "*Please note that DHS does not endorse any third-party email provider.",
        continue: "Continue"
    },
    es: {
        emailRequired: "Se requiere Dirección de correo electrónico",
        emailMessage: "Si no tiene una dirección de correo electrónico, puede ir a la página principal de uno de los populares proveedores de correo electrónico gratuito como Gmail (@ gmail.com) o Yahoo Mail (@ yahoo.com). Desde allí, haga clic en registrarse o crear una cuenta.",
        emailNote: "*Tenga en cuenta que DHS no respalda ningún proveedor de correo electrónico de terceros.",
        continue: "Continuar"
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)