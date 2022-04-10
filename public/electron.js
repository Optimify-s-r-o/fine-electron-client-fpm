const path = require( 'path' );
const fs = require( 'fs' );
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const isDev = require('electron-is-dev');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const Store = require('electron-store');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

let win;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;

const schema = {
  downloads: { default: app.getPath('downloads') },
  documents: { default: app.getPath('documents') }
};

const store = new Store({ schema });

function createWindow() {
  win = new BrowserWindow({
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
  return store.get(arg.name);
});

ipcMain.handle('ELECTRON_STORE_SET', async (event, arg) => {
  store.set(arg.name, arg.value);
});

ipcMain.handle('CHECK_FOR_UPDATE', async (event) => {
  autoUpdater.autoDownload = false;

  if (isDev) return { version: '0.0.16' };

  try {
    const result = await autoUpdater.checkForUpdates();

    const { updateInfo } = result;

    return updateInfo;
  } catch (e) {
    return null;
  }
});

ipcMain.handle('DOWNLOAD_UPDATE', async (_event) => {
  if (isDev) return true;

  try {
    await autoUpdater.downloadUpdate();
    return true;
  } catch (e) {
    return false;
  }
});

ipcMain.handle('SAVE_DIALOG', async (event, arg) => {
  return await dialog.showSaveDialog(win, {
    defaultPath: `${app.getPath('downloads')}\\${arg.fullName}`,
    buttonLabel: 'Save File'
  });
} );

ipcMain.handle('GET_TEMP_DIRECTORY', async (event, arg) => {
  return app.getPath( 'temp' );
});

ipcMain.handle( 'WRITE_FILE', async ( event, { directory, file, content, coding }) => {
  try
  {
    console.log(`Directory: '${directory}' File:'${file}'`)
    fs.mkdirSync(directory, {recursive: true});
    fs.writeFileSync( `${directory}\\${file}`, content, coding );
    return true;
  } catch(e) {
    throw e;
  }
});

autoUpdater.on('update-downloaded', (info) => {
  log.info('update downloaded');
  autoUpdater.quitAndInstall();
});

autoUpdater.on('download-progress', (progressObj) => {
  win.webContents.send('UPDATER_DOWNLOAD_PROGRESS', progressObj);
});
