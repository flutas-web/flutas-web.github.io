var medusa;

function checkHash() {
    if (window.location.hash === '') {
        document.getElementById('homePage').style.display = 'block';
	if (!!window.ActiveXObject || "ActiveXObject" in window) { 
		try {
      			notfy.error('朋友,上古浏览器不支持呢~');
		} catch {
			alert('朋友,上古浏览器不支持呢~');
		}
  	}
    } else {
        document.getElementById('homePage').style.display = 'none';
        if(window.location.hash.startsWith('#/p/')) {
		document.getElementById('homePage').style.display = 'block';
		let psid = window.location.hash.split("#")[1];
		try{
			fetch("./p/system/" + psid)
				.then(res => res.text()).then(r => {
					let md = marked.parse(md);
					document.querySelector('#homePage').innerHTML = md;
				}).catch(e => {
					document.querySelector('#homePage').innerHTML = marked.parse(`# 暂无内容

你似乎踏入了一片荒原
					`);
					
				});
			fetch("./p/system/" + psid  + "/passage.json")
				.then(res => res.text()).then(r => {
					document.title = r;
				}).catch(e => {
					document.title = '你似乎踏入了一片荒原';	
				});
			document.querySelector('header').style.display = 'none';
		} catch {
			window.location.href = "./404.html";
		}
	}else{
		switch(window.location.hash) {
			case "#join": 
				window.location.href = './registry';
				break;
			default: 
				window.location.href = "./404.html";
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
		document.querySelector("#homePage").style.width = "80%";
		medusa.remove();
	} else {
		document.querySelector("#homePage").style.fontSize = "";
		document.querySelector("#homePage").style.width = "60%";
		if(document.querySelectorAll('*').hasOwnProperty(medusa) === false) {document.body.appendChild(medusa)}
	}
}, 1000);

window.addEventListener('hashchange', checkHash);
window.addEventListener('load',checkHash);

document.addEventListener('DOMContentLoaded', (event) => {
    if (IsPhone() == true) {
        document.querySelector("#homePage").style.fontSize = "30px";
	document.querySelector("#homePage").style.width = "80%";
	if(typeof medusa == 'object') {medusa.remove()}
    } else {
        document.querySelector("#homePage").style.fontSize = "";
	document.querySelector("#homePage").style.width = "60%";
    }
});

function addgoto() {
    medusa = document.createElement('div');
    medusa.setAttribute('class', 'medusa');
    medusa.innerHTML =`
	<div class="medusa"><div><a onclick="goTop()" title="回到顶部"><img class="pass" src="./assets/top.png"></a></div><div><a href="http://www.github.com/flutas-web/flutas-web.github.io/" title="Github" target="_blank"><img class="pass" src="./assets/github.png"></a></div><div><a href="./support/" title="帮助" target="_blank"><img class="pass" src="./assets/help.png"></a></div></div>
`;
    document.body.appendChild(medusa);
}

window.addEventListener('load',addgoto);

  function CheckImgExists(url) {
    let ImgObj = new Image();
    ImgObj.src = url;
    return ImgObj.width > 0;
  }

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
