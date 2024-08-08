

document.addEventListener("DOMContentLoaded", function () {
  var languageDropdown = document.getElementById("languageDropdown");
  var languageDropdownContent = document.getElementById("languageDropdownContent");

  // 点击下拉按钮时显示/隐藏下拉内容
  languageDropdown.addEventListener("click", function () {
    languageDropdownContent.classList.toggle("show");
  });

  languageDropdownContent.querySelectorAll("a").forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      languageDropdown.querySelector('.language').innerHTML = `${item.textContent.trim()}`;
      languageDropdownContent.classList.remove("show");
      let dta = JSON.parse(localStorage.getItem('FlutasWebsiteData') || '{"language":"en-us"}');
      dta.language = getLanguageCode(item.textContent.trim());
      localStorage.setItem('FlutasWebsiteData', JSON.stringify(dta));
      document.documentElement.lang = dta.language;
      LanguageApply(dta.language);
      dta = null;
    });
  });

  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');

  navbarToggle.addEventListener('click', function () {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });
  window.addEventListener("click", function (event) {
    if (!languageDropdown.contains(event.target)) {
      languageDropdownContent.classList.remove("show");
    }


  });
  window.onlanguageset = function (l) {
      let t = capitalizeFirstLetter(getLanguageName(l))||'English';
      document.getElementById("languageDropdown").querySelector('.language').innerHTML = `${t}`;
  }
});

document.addEventListener('contextmenu',function(e){
  e.preventDefault();
})