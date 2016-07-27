// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, Menu } from 'electron';
import { devMenuTemplate } from './helpers/dev_menu_template';
import { editMenuTemplate } from './helpers/edit_menu_template';
import createWindow from './helpers/window';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;
var setApplicationMenu = function () {
    var menus = [editMenuTemplate];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

app.on('ready', function () {
// setApplicationMenu();
var mainWindow = createWindow('main', {
        width: 800,
     height: 700,
      minHeight: 450,
  minWidth: 420,
    icon: __dirname + '/graph/textile_logo_app.png',
    show: false
    });

    mainWindow.loadURL('file://' + __dirname + '/app.html');

    mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.show();
});
  let win = mainWindow
 // win.setMenu(null);
});

app.on('window-all-closed', function () {
    app.quit();
});
