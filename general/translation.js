var translations = {};

function loadTranslations() {
  return fetch('../general/translation.json')
    .then(response => response.json())
    .then(data => {
      translations = data;
    })
    .catch(error => console.error('Error loading translations:', error));
}

function toggleLanguage() {
  var currentLanguage = document.documentElement.lang || 'en';
  localStorage.setItem('language','en');
  if (currentLanguage === 'en') {
    applyTranslations('ru');
    document.documentElement.lang = 'ru';
    document.getElementById('languageButton').textContent = 'Русский';
    localStorage.setItem('language','ru');
  } else {
    applyTranslations('en');
    document.documentElement.lang = 'en';
    document.getElementById('languageButton').textContent = 'English';
    localStorage.setItem('language','en');
  }
}

function applyTranslations(lang) {
    var translation = translations[lang];
  
    var elements = document.querySelectorAll('[id]');
    elements.forEach(function(element) {
      var translationKey = element.getAttribute('id');
      if (translationKey && translation[translationKey]) {
        // Проверяем, есть ли вложенные элементы <strong> и заменяем только текст внутри них
        if (element.querySelector('strong')) {
          element.childNodes.forEach(function(node) {
            if (node.nodeType === Node.TEXT_NODE) {
              node.nodeValue = translation[translationKey];
            } else if (node.tagName === 'STRONG' && translation[translationKey + '-value']) {
              node.innerHTML = translation[translationKey + '-value'];
            }
          });
        } else {
          element.innerHTML = translation[translationKey];
        }
      }
    });
  }
  

loadTranslations().then(() => {
  var userLanguage = navigator.language.substr(0, 2); 
  if (localStorage.getItem('language')==='en') {
    applyTranslations('en');
    document.documentElement.lang = 'en';
    document.getElementById('languageButton').textContent = 'English';
    
  } else {
    applyTranslations('ru');
    document.documentElement.lang = 'ru';
    document.getElementById('languageButton').textContent = 'Русский';
  }
});