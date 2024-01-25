const saveSetting = () => {
	const userName = document.getElementById("user-name").value;
	const notifyCode = document.getElementById("notify-code").value;

	window.dataapi.setToken(userName, notifyCode);
	alert('Saved successfully');
}


const getSetting = () => {
	const setting = window.dataapi.getToken();

	if (setting.length > 0) {
		document.getElementById('user-name').value = setting[0];
		document.getElementById('notify-code').value = setting[1];
	}
}

window.onload = getSetting();
