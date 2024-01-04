const { Tray, Menu, nativeTheme } = require('electron');
const { getMode } = require("../../mode/talk_mode");
const { modeChange } = require('../../mode/talk_mode');
const os = require('os');
const { sendMessageToLineNotify } = require('../../line/line_notify');

const ICON_PATH_MAC = '/../../../icon/tray/mac/';
const ICON_PATH_WINDOWS = '/../../../icon/tray/win/';

const decideAppIcon = () => {
	let mode_iconfile;
	if (getMode() === 'can') {
		mode_iconfile = 'icon_can.png'
	} else {
		mode_iconfile = 'icon_cant.png'
	}

	switch (os.platform()) {
		case 'darwin':
			if (nativeTheme.shouldUseDarkColors) {
				return __dirname + ICON_PATH_MAC + 'dark/' + mode_iconfile;
			}
			else {
				return __dirname + ICON_PATH_MAC + 'right/' + mode_iconfile;
			}
		default:
			return __dirname + ICON_PATH_WINDOWS;
	}
}



let tray = null;

const initializeMenu = () => {
	const icon = decideAppIcon();
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

	const icon = decideAppIcon();

	tray.setTitle((getMode() === 'can') ? '会話可能' : '会話不能')
	tray.setImage(icon);
	tray.setToolTip('Can\'t Talk');
	tray.setContextMenu(contextMenu);
}

const toggleMode = () => {
	modeChange();
	sendMessageToLineNotify();
	updateMenu();
}

exports.initializeMenu = initializeMenu