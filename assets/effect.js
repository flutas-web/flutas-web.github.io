const effect = {
	init: () => {
		let iestars = document.createElement('canvas');
		iestars.classList.add('fireworks');
		iestars.setAttribute('style','position:fixed;left:0;top:0;z-index:99999999;pointer-events:none;');
		document.body.appendChild(iestars);
		var script1 = document.createElement('script');
		script1.src = '/assets/anime.min.js';
		document.head.appendChild(script1);

		// 创建第二个 script 元素
		var script2 = document.createElement('script');
		script2.src = '/assets/fireworks.min.js';
		document.head.appendChild(script2);
	}
};