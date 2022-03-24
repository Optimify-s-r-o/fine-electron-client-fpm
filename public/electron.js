const path = require('path')
const { app, BrowserWindow, ipcMain} = require('electron')
const isDev = require("electron-is-dev");
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

function createWindow () {
    const win = new BrowserWindow({
        icon: __dirname + '/favicon.ico',
        'minWidth': 900,
        'minHeight': 1000,
        'webPreferences': {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    win.setMenuBarVisibility(false);
}

app.whenReady().then(async ()=>{
    createWindow();
    await installExtension(REACT_DEVELOPER_TOOLS);
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.handle('APP_VERSION', async (event, ...args) => {
    return app.getVersion()
});
