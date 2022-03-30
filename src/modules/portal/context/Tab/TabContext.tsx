import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export enum TabType {
  PROJECT,
  JOB
}

export type Tab = {
  type: TabType;
  name: string;
  id: string;
};

export const TabContext = createContext<{
  tabs: Tab[];
  addTab: (tab: Tab) => void;
  removeTab: (tab: Tab) => void;
  setTabs: Dispatch<SetStateAction<Tab[]>>;
}>({
  tabs: [],
  setTabs: () => console.log('No valid context'),
  removeTab: () => console.log('No valid context'),
  addTab: () => console.log('No valid context')
});

export const useTabContext = () => useContext(TabContext);
