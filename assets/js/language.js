globalThis.languageTable = {};

const languageMap = {
  "chinese": "zh-cn",
  "english": "en-us",
  "french": "fr"
};

const reverseLanguageMap = {
  "zh-cn": "chinese",
  "en-us": "english",
  "fr": "french"
};

function getLanguageName(languageCode) {
  const key = languageCode.trim().toLowerCase();
  return reverseLanguageMap[key] || '';
}
function getLanguageCode(language) {
  const key = language.trim().toLowerCase();
  return languageMap[key] || '';
}

function capitalizeFirstLetter(word) {
  if (word.length === 0) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function LanguageApply(l) {
  let language = l.replace('-','_');
  let langtable = globalThis.languageTable[language];
  Object.keys(langtable).forEach(a => {
    document.querySelectorAll(a)[0].innerHTML = langtable[a];
  })
}
