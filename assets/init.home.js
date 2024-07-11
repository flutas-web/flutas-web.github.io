var menuIcon = document.querySelector('.menu-icon');

function toggleMenu() {
    menuIcon = document.querySelector('.menu-icon')
    const menuBars = document.querySelectorAll('.bar');
    const menu = document.querySelector('.mobile-menu');

    menuIcon.classList.toggle('active');

    if (menuIcon.classList.contains('active')) {
        menu.classList.add('active');
        animateBarsToClose(menuBars);
    } else {
        menu.classList.remove('active');
        animateBarsToBars(menuBars);
    }
}

function animateBarsToClose(bars) {
    bars[0].style.transformOrigin = 'left top';
    bars[0].style.transform = 'rotate(45deg)';

    bars[1].style.opacity = '0';

    bars[2].style.transformOrigin = 'left bottom';
    bars[2].style.transform = 'rotate(-45deg)';
}

function animateBarsToBars(bars) {
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
}

menuIcon.addEventListener('click', toggleMenu)