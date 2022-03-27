import {Route, Routes} from "react-router-dom";
import {RoutesPath} from "./constants/routes";
import {lazy, Suspense} from "react";
import {Wrapper} from "./modules/Auth/components/AuthWrapper/styled";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInLocal = lazy(() => import('modules/Auth/SignInLocal'));
const ResetPassword = lazy(() => import('modules/Auth/ResetPassword'));
const Portal = lazy(() => import('modules/Portal'));

const App = () => {
    return (
        <Suspense fallback={<Wrapper/>}>

            <Routes>
                <Route path={RoutesPath.RESET_PASSWORD} element={<ResetPassword/>}/>
                <Route path={RoutesPath.PORTAL} element={<Portal/>}/>
                <Route path={RoutesPath.SIGN_IN} element={<SignInLocal/>}/>
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
}

export default App;
