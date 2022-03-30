import keytar from 'keytar';
import { execFile } from 'child_process';

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const value: any;
  export default value;
}

//TODO improve typing
export interface IElectronAPI {
  fs: any;
  execFile: (filePath, args) => any;
  openWebBrowser: (url: string) => Promise<void>;
  on: (eventName, callback) => any;
  invoke: (eventName: any, args?: any) => Promise<any>;
  keytarSetSecret: (name, secret) => Promise<void>;
  keytarGetSecret: (name) => Promise<string | null>;
}

declare global {
  interface Window {
    API: IElectronAPI;
  }
}
