import keytar from 'keytar';

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

export interface IElectronAPI {
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
