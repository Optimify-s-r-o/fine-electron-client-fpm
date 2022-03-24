const { contextBridge, shell, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('API', {
    openWebBrowser: (url) => shell.openExternal(url),
    on: (eventName, callback) => ipcRenderer.on(eventName, callback),
    invoke: async (eventName) => ipcRenderer.invoke(eventName)
})