const { app, BrowserWindow } = require('electron')
const isDev = require("electron-is-dev");
const devtools = require("electron-devtools-installer");

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    const installExtension = devtools.default;
    const REACT_DEVELOPER_TOOLS = devtools.REACT_DEVELOPER_TOOLS;
}

app.whenReady().then(createWindow)

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

