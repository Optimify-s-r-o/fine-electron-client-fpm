import {createContext, useContext} from 'react';

export const ExecutableApplicationContext = createContext<{
    loading: boolean;
}>({
    loading: false
});

export const useApplicationContext = () => useContext(ExecutableApplicationContext);