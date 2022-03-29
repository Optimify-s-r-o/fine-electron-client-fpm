import { useAuthContext } from 'modules/Auth/context/AuthContext';

import { TreeProvider } from './Tree/TreeProvider';

export const PortalContextProvider = ( { children }: { children: JSX.Element; } ) => {
    const { isLogged } = useAuthContext();
    return (
        isLogged ?
            <TreeProvider>
                {children}
            </TreeProvider >
            : children
    );
};