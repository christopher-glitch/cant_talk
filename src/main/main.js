const { app, Tray, Menu, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const os = require('os');
const { sendMessageToLineNotify } = require('./line_notify');
const { TokenStore } = require('./token_store');
const { getMode } = require("./talk_mode");
const { modeChange } = require('./talk_mode');


app.on('ready', () => {
  initializeMenu();
  console.log(app.getPath('userData'))
});


/*Trey menu*/
const ICON_PATH_MAC = '/../../icon/tray/mac/';
const ICON_PATH_WINDOWS = '/../../icon/tray/win/';

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
      click: () => createWindow(),
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

  const setting = store.getToken();
  console.log(setting)
  if(setting.length > 0){
    sendMessageToLineNotify(setting[0], setting[1]);
  }

  updateMenu();
}

/*Setting window*/
let mainWindow;
const createWindow = () => {
  if(!mainWindow){
    console.log(__dirname + "/../preload.js");
    mainWindow = new BrowserWindow({
      width: 750,
      height: 450,
      minWidth: 750,
      minHeight: 450,
      maxWidth: 800,
      maxHeight: 480,
      webPreferences: {
        preload: __dirname + "/../preload.js",
        nodeIntegration: false,
        contextIsolation: false,
      }
    });
    mainWindow.loadFile(__dirname + "/../renderer/index.html");

    mainWindow.on("closed", () => {
      mainWindow = null;
    });
  }
};

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') app.quit();
});


/*Data store */
const store = new TokenStore({ name: "setting_data" });
ipcMain.handle('getToken', async (event) => {
  return store.getToken();
});


ipcMain.handle("setToken", async (event, name, token) => {
  store.saveToken(name, token);
})




