const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
	'dataapi', {
	getToken: () => ipcRenderer.invoke("getToken"),
	setToken: (name, token) => ipcRenderer.invoke("setToken", name, token),
}); 
