const languages = {
    en: {
        textInput: 'Enter your word',
        buttomText: 'Go!',
        aboutRegularExpression: 'Our regular expression is: a(abUabb)^3',
        historyTittle: 'History',
        spanishOption: 'Spanish',
        englishOption: 'English',
        frenchOption: 'French',
    },
    es: {
        textInput: 'Ingresa tu palabra',
        buttomText: '¡Vamos!',
        aboutRegularExpression: 'Nuestra expresión regular es: a(abUabb)^3',
        historyTittle: 'Historial',
        spanishOption: 'Español',
        englishOption: 'Ingles',
        frenchOption: 'Frances',
    },
    fr: {
        textInput: 'Entrez votre mot',
        buttomText: 'Allons-y!',
        aboutRegularExpression: 'notre expression régulière est: a(abUabb)^3',
        historyTittle: 'Histoire',
        spanishOption: 'Espagnol',
        englishOption: 'Anglais',
        frenchOption: 'Français',
    },
};

function changeLanguage(language) {
    const currentLanguage = languages[language];
    document.getElementById('word-text').placeholder = currentLanguage.textInput;
    document.getElementById('word-button').textContent = currentLanguage.buttomText;
    document.getElementById('English').textContent = currentLanguage.englishOption;
    document.getElementById('Spanish').textContent = currentLanguage.spanishOption;
    document.getElementById('French').textContent = currentLanguage.frenchOption;
    document.getElementById('historyTittle').textContent = currentLanguage.historyTittle;
    document.getElementById('regularExpressionInfo').textContent = currentLanguage.aboutRegularExpression;
}