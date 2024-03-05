
function checkHash() {
    if (window.location.hash === '') {
        document.getElementById('homePage').style.display = 'block';
    } else {
        document.getElementById('homePage').style.display = 'none';
        if(window.location.hash.startsWith('#/p/')) {
		document.getElementById('homePage').style.display = 'block';
		let psid = window.location.hash.split("#")[1];
		try{
			fetch("./" + psid).then(res => res.text())
		} catch {
			window.location.href = "./404.html";
		}
	}else{
		switch(window.location.hash) {
			case "#join": 
				let linka = document.createElement('a')
			        le join = document.getElementById('homePage')
				join.style.display = 'block';
				linka.href = "mailto:flutas@outlook.com?title=加入Flutas&body=我是%20XXX%20我想加入Flutas";
				linka.texContent = "发送邮件至Fluta邮箱"
				join.innerHTML = "";
				join.appendChild(linka)
				break;
			default: 
				window.location.href = "./";
				break;
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
