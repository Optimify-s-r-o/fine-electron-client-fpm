const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const Store = require('electron-store');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;

const schema = {
  downloads: { default: app.getPath('downloads') },
  documents: { default: app.getPath('documents') }
};

const store = new Store({ schema });

function createWindow() {
  const win = new BrowserWindow({
    icon: __dirname + '/favicon.ico',
    minWidth: 900,
    minHeight: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );

  win.setMenuBarVisibility(false);
}

app.whenReady().then(async () => {
  createWindow();
  await installExtension(REACT_DEVELOPER_TOOLS);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('APP_VERSION', async (event, ...args) => {
  return app.getVersion();
});

ipcMain.handle('MAXIMIZE_WINDOW', async (event, ...args) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);
  browserWindow.maximize();
});

ipcMain.handle('ELECTRON_STORE_GET', async (event, arg) => {
  console.log(arg.name);
  return store.get(arg.name);
});

ipcMain.handle('ELECTRON_STORE_SET', async (event, arg) => {
  console.log(arg);
  store.set(arg.name, arg.value);
});

ipcMain.handle('CHECK_FOR_UPDATE', async (event) => {
  autoUpdater.autoDownload = false;

  if (isDev) return { version: '1.1.1' };

  try {
    const result = await autoUpdater.checkForUpdates();
    log.info(result);

    const { updateInfo } = result;

    log.info(updateInfo);

    return updateInfo;
  } catch (e) {
    return null;
  }
});

ipcMain.handle('DOWNLOAD_UPDATE', async (event) => {
  if (isDev) return true;

  try {
    await autoUpdater.downloadUpdate();
    return true;
  } catch (e) {
    return false;
  }
});

autoUpdater.on('update-downloaded', (info) => {
  autoUpdater.quitAndInstall();
});
