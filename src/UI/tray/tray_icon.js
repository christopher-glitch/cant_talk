const { nativeTheme } = require('electron');
const os = require('os');
const { getMode } = require('../../talk_mode');

const ICON_PATH_MAC = '/../../../icon/tray/mac/';
const ICON_PATH_WINDOWS = '/../../../icon/tray/win/';

const decideAppIcon = () => {

	let mode_iconfile;
	if(getMode() === 'can'){
		mode_iconfile = 'icon_can.png'
	}else{
		mode_iconfile = 'icon_cant.png'
	}

	switch (os.platform()){
		case 'darwin':
			if (nativeTheme.shouldUseDarkColors){
				return __dirname + ICON_PATH_MAC + 'dark/' + mode_iconfile;
			}
			else{
				return __dirname + ICON_PATH_MAC + 'right/' + mode_iconfile;
			}
		default:
			return __dirname + ICON_PATH_WINDOWS;
	}
}

exports.decideAppIcon = decideAppIcon