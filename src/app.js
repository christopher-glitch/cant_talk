const { app } = require('electron');
const { setMenu, initializeMenu } = require('./UI/tray/menu');

app.on('ready', () => {
  initializeMenu();
});
