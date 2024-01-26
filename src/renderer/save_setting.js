async function saveSetting (){
	const userName = document.getElementById("user-name").value;
	const notifyCode = document.getElementById("notify-code").value;

	await window.dataapi.setToken(userName, notifyCode);
	alert('Saved successfully');
}


async function getSetting(){
	const setting = await window.dataapi.getToken();
	console.log(setting);
	if (setting.length > 0) {
		document.getElementById('user-name').value = setting[0];
		console.log(document.getElementById("user-name").value);
		document.getElementById('notify-code').value = setting[1];
		console.log(document.getElementById("notify-code").value);
	}
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('.save').addEventListener('click', saveSetting);
});

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('.reset').addEventListener('click', getSetting);
});

window.onload = getSetting();
