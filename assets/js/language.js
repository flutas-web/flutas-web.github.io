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
