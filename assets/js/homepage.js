const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

navbarToggle.addEventListener('click', function() {
  navbarToggle.classList.toggle('active');
  navbarMenu.classList.toggle('active');
});
