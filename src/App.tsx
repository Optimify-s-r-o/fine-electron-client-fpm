import {Route, Routes } from "react-router-dom";
import {RoutesPath} from "./constants/routes";
import {lazy, Suspense} from "react";
import {Wrapper} from "./modules/Auth/components/AuthWrapper/styled";

const SignInCloud = lazy(() => import('modules/Auth/SignInCloud'));
const SignInLocal = lazy(() => import('modules/Auth/SignInLocal'));
const ResetPassword = lazy(() => import('modules/Auth/ResetPassword'));

const App = () => {
  return (
      <Suspense fallback={<Wrapper/>}>
      <Routes>
          <Route path={RoutesPath.SIGN_IN_CLOUD} element={<SignInCloud/>} />
          <Route path={RoutesPath.SIGN_IN_LOCAL}  element={<SignInLocal/>} />
          <Route path={RoutesPath.RESET_PASSWORD}  element={<ResetPassword/>} />
      </Routes>
      </Suspense>
  );
}

export default App;
