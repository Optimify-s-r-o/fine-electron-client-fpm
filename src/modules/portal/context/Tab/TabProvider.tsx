import { Tab, TabContext } from './TabContext';
import { useState } from 'react';
import { useEffectAsync } from '../../../../utils/useEffectAsync';

export const TabProvider = ({ children }: { children: JSX.Element }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffectAsync(async () => {
    const tabsStore = await window.API.invoke('ELECTRON_STORE_GET', { name: 'tabs' });

    if (!tabsStore) return;

    setTabs(tabsStore);
  }, []);

  const addTab = async (tab: Tab) => {
    const store = await window.API.invoke('ELECTRON_STORE_GET', { name: 'tabs' });

    if (!store) {
      await saveToStorage([tab]);
      return;
    }

    if (!!store?.find((e: Tab) => e.id === tab.id && e.type === tab.type)) return;

    await saveToStorage([...store, tab]);
  };

  const saveToStorage = async (tabs: Tab[]) => {
    setTabs(tabs);
    await window.API.invoke('ELECTRON_STORE_SET', { name: 'tabs', value: tabs });
  };

  const removeTab = async (tab: Tab) => {
    const result = tabs.filter((i: Tab) => i.id !== tab.id);
    await saveToStorage(result);
  };

  return (
    <TabContext.Provider
      value={{
        tabs,
        setTabs,
        removeTab,
        addTab
      }}>
      {children}
    </TabContext.Provider>
  );
};
