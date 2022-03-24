const { contextBridge, shell } = require('electron')

contextBridge.exposeInMainWorld('API', {
    openWebBrowser: (url) => {
       return shell.openExternal(url)
    }
})