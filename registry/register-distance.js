function init(e, t) {
	window.verifycoder = 000000;

	document.getElementById("nextBtn")
		.addEventListener("click", function() {
			document.querySelector(".email-section")
				.style.display = "none";
			document.querySelector(".verification-section")
				.style.display = "block";
		});

	document.getElementById("verifyCaptchaBtn")
		.addEventListener("click", function() {
			document.querySelector(".code-section")
				.style.display = "block";
			verifycoder = generateRandomNumber();
			sendVerificationCode(verifycoder, document.querySelector(
					"#email")
				.value);
		});

	const serviceID = 'service_olz5dv8';
	const templateID = 'template_t8ej8ic';
	emailjs.init('zJoi-7nUmQMkURbzR')

	function sendVerificationCode(message, reply) {
		const params = {
			to_name: reply,
			message: message,
			reply_to: reply
		};
		emailjs.send(serviceID, templateID, params)
			.then(() => {
				send_success();
			})
			.catch((err) => {
				send_fail(err);
			});
	}

	function send_success() {
		document.querySelector('#verifyCaptchaBtn')
			.style.display = 'none';
		notyf.success('信息发送成功');
	}

	function send_fail(error) {
		console.log(error);
	}

	function generateRandomNumber() {
		const min = 100000;
		const max = 999999;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	aluk("#submitBtn").newclicke(function() {
			var inputCode = document.getElementById("code")
				.value;
			console.log(verifycoder.toString());
			console.log(inputCode);
			if (verifycoder.toString() === inputCode) {
				sendVerificationCode(document.querySelector("#email")
					.value + '已通过验证.', 'xbodwxbdow@outlook.com')
				document.querySelector('.code-section')
					.style.display = 'none';
				notyf.success('您已通过验证.答复将会在2天内给出.<br>(室长没有多余时间)');
				setTimeout(function() {
   					 window.close();
				}, 2000);
			} else {
				notyf.error('验证码不正确');
			}
		});
}
const notyf = new Notyf({
            position: { x: 'center', y: 'top' },
            types: [
                {
                    type: 'success',
                    background: '#99c959',
                    duration: 2000,
                },
                {
                    type: 'error',
                    background: '#e15b64',
                    duration: 3000,
                }
            ]
        });
aluk().Prep(init);

