const { contextBridge, shell, ipcRenderer } = require('electron');
const keytar = require('keytar');
const { execFile } = require('child_process');
const fs = require('fs');

contextBridge.exposeInMainWorld('API', {
  fs: fs,
  execFile: (filePath, args) => execFile(filePath, args),
  openWebBrowser: (url) => shell.openExternal(url),
  on: (eventName, callback) => ipcRenderer.on(eventName, callback),
  invoke: async (eventName, args) => ipcRenderer.invoke(eventName, args),
  keytarSetSecret: (name, secret) => keytar.setPassword('fpm', name, secret),
  keytarDeleteSecret: (name) => keytar.deletePassword('fpm', name),
  keytarGetSecret: (name) => keytar.getPassword('fpm', name)
});
