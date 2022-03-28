import 'react-toastify/dist/ReactToastify.css';

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ProtectedRoute } from './components/ProtectedRoute';
import { RoutesPath } from './constants/routes';
import { Wrapper } from './modules/Auth/components/AuthWrapper/styled';


const SignInLocal = lazy( () => import( 'modules/Auth/SignInLocal' ) );
const ResetPassword = lazy( () => import( 'modules/Auth/ResetPassword' ) );
const Portal = lazy( () => import( 'modules/Portal' ) );

export const Root = () => {
    return (
        <Suspense fallback={<Wrapper />}>
            <Routes>
                <Route path={RoutesPath.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={RoutesPath.SIGN_IN} element={<SignInLocal />} />
                <Route path={RoutesPath.PORTAL} element={<ProtectedRoute><Portal /></ProtectedRoute>} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Suspense>
    );
};