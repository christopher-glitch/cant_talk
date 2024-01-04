const { Tray, Menu } = require('electron');
const { getMode } = require("../../talk_mode");
const appIcon = require('./tray_icon');
const { modeChange } = require('../../talk_mode');

let tray = null;

const toggleMode = () => {
	modeChange();
	updateMenu();
}

const initializeMenu = () => {
	const icon = appIcon.decideAppIcon();
	tray = new Tray(icon);
	updateMenu();
}

const updateMenu = () => {

	const contextMenu = Menu.buildFromTemplate([
		{
			label: `${getMode() === 'can' ? '会話不能を伝える' : '会話可能を伝える'}`,
			type: 'normal',
			click: () => toggleMode(),
		},
		{ 
			type: 'separator' 
		},
		{ 
			label: '設定', 
			type: 'normal', 
			click: () => {},
		},
		{ 
			label: '終了', 
			type: 'normal', 
			role: 'quit' 
		},
	]);

	const icon = appIcon.decideAppIcon();

	tray.setTitle((getMode() === 'can') ? '会話可能' : '会話不能')
	tray.setImage(icon);
	tray.setToolTip('Can\'t Talk');
	tray.setContextMenu(contextMenu);
}

exports.initializeMenu = initializeMenu