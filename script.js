
function checkHash() {
    if (window.location.hash === '') {
        document.getElementById('homePage').style.display = 'block';
    } else {
        document.getElementById('homePage').style.display = 'none';
        if(window.location.hash.startsWith('#/p/')) {
		alert('文章板块正在移植和升级,敬请期待...')
	}else{
		switch(window.location.hash) {
			case "join": {
				window.location.href = "mailto:flutas@outlook.com";
				break;
			},
			default: {
				window.location.href = "./";
			}
		}
	}
    }
}

function IsPhone() {
        var userAgent = navigator.userAgent;

  // 检测包含这些关键字的设备，通常是手机设备
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    }


// 设置一个定时器，每秒检查一次userAgent是否有变化
setInterval(() => {
        if (IsPhone() == true) {
		document.querySelector("#homePage").style.fontSize = "30px";
	} else {
		document.querySelector("#homePage").style.fontSize = "";
	}
}, 250);

window.addEventListener('hashchange', checkHash);
window.addEventListener('load',checkHash);

document.addEventListener('DOMContentLoaded', (event) => {
    if (IsPhone() == true) {
        document.querySelector("#homePage").style.fontSize = "30px";
    } else {
        document.querySelector("#homePage").style.fontSize = "";
    }
});
