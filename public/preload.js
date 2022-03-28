const { contextBridge, shell, ipcRenderer} = require('electron')
const keytar = require('keytar');

contextBridge.exposeInMainWorld('API', {
    openWebBrowser: (url) => shell.openExternal(url),
    on: (eventName, callback) => ipcRenderer.on(eventName, callback),
    invoke: async (eventName) => ipcRenderer.invoke(eventName),
    keytarSetSecret: (name, secret) => keytar.setPassword('fpm', name, secret),
    keytarGetSecret: (name) => keytar.getPassword('fpm', name),
})