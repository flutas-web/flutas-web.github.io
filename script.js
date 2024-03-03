
function checkHash() {
    if (window.location.hash === '') {
        document.getElementById('homePage').style.display = 'block';
    } else {
        document.getElementById('homePage').style.display = 'none';
        if(window.location.hash.startsWith('#/p/')) {
		alert('文章板块正在移植和升级,敬请期待...')
	}
    }
}

function IsPhone() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // 检测包含这些关键字的设备，通常是手机设备
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    }


function onUserAgentChange() {
    console.log("UserAgent has changed!");
    if (IsPhone == true) {
        document.querySelector("#homePage").style.fontSize = "30px";
	return;
    } else {
        document.querySelector("#homePage").style.removeProperty('font-size');
	return;
    }
}

// 保存初始的userAgent值
let initialUserAgent = navigator.userAgent;

// 设置一个定时器，每秒检查一次userAgent是否有变化
setInterval(() => {
    // 获取当前的userAgent
    let currentUserAgent = navigator.userAgent;
    
    // 比较初始的userAgent和当前的userAgent
    if (initialUserAgent !== currentUserAgent) {
        if (IsPhone) {
		document.querySelector("#homePage").style.fontSize = "30px";
	} else {
		document.querySelector("#homePage").style.fontSize = "";
	}
        initialUserAgent = currentUserAgent;
    }
}, 1000);

window.addEventListener('hashchange', checkHash);
window.addEventListener('resize', onUserAgentChange);

window.addEventListener('load',checkHash);
window.addEventListener('load',onUserAgentChange);