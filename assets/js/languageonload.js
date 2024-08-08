function languageonset() {
    let dta = JSON.parse(localStorage.getItem('FlutasWebsiteData') || '{"language":"en-us"}');
    document.documentElement.lang = dta.language;
    try {
      window['onlanguageset'](dta.language);
      LanguageApply(dta.language);
    }
    catch {
  
    }
  }
  document.addEventListener('DOMContentLoaded', languageonset);