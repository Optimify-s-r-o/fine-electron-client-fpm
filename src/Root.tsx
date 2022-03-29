import 'react-toastify/dist/ReactToastify.css';

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import { Toast } from './components/Toast';
import { RoutesPath } from './constants/routes';
import { Wrapper } from './modules/Auth/components/AuthWrapper/styled';

const SignInLocal = lazy( () => import( 'modules/Auth/SignInLocal' ) );
const ResetPassword = lazy( () => import( 'modules/Auth/ResetPassword' ) );
const Portal = lazy( () => import( 'modules/Portal' ) );
const CreateProject = lazy( () => import( 'modules/Portal/Projects/CreateProject' ) );
const ListOfCustomers = lazy( () => import( 'modules/Portal/Customers/ListOfCustomers' ) );
const CreateCustomer = lazy( () => import( 'modules/Portal/Customers/CreateCustomer' ) );
const CreateUser = lazy( () => import( 'modules/Portal/Users/CreateUser' ) );
const ListOfUsers = lazy( () => import( 'modules/Portal/Users/ListOfUsers' ) );
const System = lazy( () => import( 'modules/Portal/Settings/System' ) );
const Update = lazy( () => import( 'modules/Portal/Settings/Update' ) );

export const Root = () => {
    return (
        <Suspense fallback={<Wrapper />}>
            <Routes>
                <Route path={RoutesPath.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={RoutesPath.SIGN_IN} element={<SignInLocal />} />
                <Route path={RoutesPath.PORTAL} element={<ProtectedRoute><Portal /></ProtectedRoute>}>
                    <Route path={RoutesPath.CREATE_PROJECT}
                        element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
                    <Route path={RoutesPath.CREATE_CUSTOMER}
                        element={<ProtectedRoute><CreateCustomer /></ProtectedRoute>} />
                    <Route path={RoutesPath.LIST_OF_CUSTOMERS}
                        element={<ProtectedRoute><ListOfCustomers /></ProtectedRoute>} />
                    <Route path={RoutesPath.CREATE_USER} element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
                    <Route path={RoutesPath.LIST_OF_USERS} element={<ProtectedRoute><ListOfUsers /></ProtectedRoute>} />
                    <Route path={RoutesPath.SYSTEM} element={<ProtectedRoute><System /></ProtectedRoute>} />
                    <Route path={RoutesPath.UPDATE} element={<ProtectedRoute><Update /></ProtectedRoute>} />
                </Route>
            </Routes>
            <Toast />
        </Suspense>
    );
};