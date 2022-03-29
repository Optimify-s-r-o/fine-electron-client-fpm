import { useAuthContext } from 'modules/Auth/context/AuthContext';

import { ApplicationsProvider } from './Applications/ApplicationsProvider';
import { TreeProvider } from './Tree/TreeProvider';

export const PortalContextProvider = ( { children }: { children: JSX.Element; } ) => {
    const { isLogged } = useAuthContext();
    return (
        isLogged ?
            <ApplicationsProvider>
                <TreeProvider>
                    {children}
                </TreeProvider >
            </ApplicationsProvider>
            : children
    );
};