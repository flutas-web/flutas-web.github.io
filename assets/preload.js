
function goTop() {
    let scrollToTop = setInterval(function () {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20);
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 10);
}

function IsPhone() {
    var userAgent = navigator.userAgent;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

function addgoto() {
    window.medusa = typeof window.medusa == 'undefined' ? document.createElement('div') : window.medusa;
    medusa.setAttribute('class', 'medusa');
    medusa.innerHTML = `<div><a onclick="goTop()" title="Go to the top of this page"><img class="pass" src="./assets/top.png"></a></div><div><a href="http://www.github.com/flutas-web/flutas-web.github.io/" title="Github" target="_blank"><img class="pass" src="./assets/github.png"></a></div><div><a href="./support/" title="帮助" target="_blank"><img class="pass" src="./assets/help.png"></a></div>`;
    if (!false) {
        document.body.appendChild(medusa);
    } else {
        medusa.remove();
    }
        
}

addgoto();
