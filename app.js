const { app, systemPreferences, Menu, MenuItem, Tray } = require('electron');

const ICON_PATH_MAC = 'icon/mac/';

app.on('ready', () => {

  const appIcon = new Tray(ICON_PATH_MAC + 'cant_talk_can_dark.png');
  const menu = new Menu();

  menu.append(new MenuItem({
    label: '話せるモード',
  }));

  menu.append(new MenuItem({
    label: '話せないモード',
    click: () => {
      alert('click item');
    },
  }));

  menu.append(new MenuItem({ type: 'separator' }));

  menu.append(new MenuItem({
    label: 'setting',
    click: () => {
      alert('click item');
    },
  }));

  menu.append(new MenuItem({ type: 'separator' }));
  menu.append(new MenuItem({ role: 'quit' }));

  appIcon.setContextMenu(menu);
});
