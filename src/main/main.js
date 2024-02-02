const { app, Tray, Menu, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const os = require('os');
const { sendMessageToLineNotify } = require('./line_notify');
const { TokenStore } = require('./token_store');
const { getMode } = require("./talk_mode");
const { modeChange } = require('./talk_mode');
const path = require('path');

app.on('ready', () => {
  initializeMenu();
});


/*Trey menu*/
const decideAppIcon = () => {
  let mode_iconfile;
  if (getMode() === 'can') {
    mode_iconfile = 'icon_can'
  } else {
    mode_iconfile = 'icon_cant'
  }

  switch (os.platform()) {
    case 'darwin':
      mode_iconfile = mode_iconfile + '.png';
      if (nativeTheme.shouldUseDarkColors) {
        return app.isPackaged ? path.join(process.resourcesPath, '/icon/tray/mac/dark/', mode_iconfile):
                                path.join(__dirname, '/../../assets/icon/tray/mac/dark/', mode_iconfile);
      }
      else {
        return app.isPackaged ? path.join(process.resourcesPath, '/icon/tray/mac/right/', mode_iconfile) :
                                path.join(__dirname, '/../../assets/icon/tray/mac/right/', mode_iconfile);
      }
    default:
      mode_iconfile = mode_iconfile + '.ico';
      return app.isPackaged ? path.join(process.resourcesPath, '/icon/tray/win/'):
                              path.join(__dirname, '/../../assets/icon/tray/win/');
  }
}


let tray = null;
const initializeMenu = () => {
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
  tray = new Tray(icon);
  tray.setTitle((getMode() === 'can') ? '会話可能' : '会話不能')
  tray.setToolTip('Can\'t Talk');
  tray.setContextMenu(contextMenu);
}

const toggleMode = () => {
  modeChange();

  const setting = store.getToken();
  if(setting.length > 0){
    sendMessageToLineNotify(setting[0], setting[1]);
  }
  updateMenu();
}


/*Setting window*/
let mainWindow;
const createWindow = () => {
  if(!mainWindow){
    mainWindow = new BrowserWindow({
      width: 750,
      height: 450,
      minWidth: 750,
      minHeight: 450,
      maxWidth: 800,
      maxHeight: 480,
      webPreferences: {
        preload: path.join(__dirname, "/preload.js"),
        nodeIntegration: false,
        contextIsolation: true,
      }
    });
    mainWindow.loadFile(path.join(__dirname + "/../renderer/index.html"));

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




