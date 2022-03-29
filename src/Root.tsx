import 'react-toastify/dist/ReactToastify.css';

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import { Toast } from './components/Toast';
import { RoutesPath } from './constants/routes';
import { Wrapper } from './modules/Auth/components/AuthWrapper/styled';

const SignInLocal = lazy(() => import('modules/Auth/signInLocal'));
const ResetPassword = lazy(() => import('modules/Auth/resetPassword'));
const Portal = lazy(() => import('modules/portal'));
const CreateProject = lazy(() => import('modules/portal/projects/createProject'));
const EditProject = lazy(() => import('modules/portal/projects/editProject'));
const EditJob = lazy(() => import('modules/portal/jobs/editJob'));
const ListOfCustomers = lazy(() => import('modules/portal/customers/listOfCustomers'));
const CreateCustomer = lazy(() => import('modules/portal/customers/createCustomer'));
const CreateUser = lazy(() => import('modules/portal/users/createUser'));
const ListOfUsers = lazy(() => import('modules/portal/users/listOfUsers'));
const System = lazy(() => import('modules/portal/settings/system'));
const Update = lazy(() => import('modules/portal/settings/update'));

export const Root = () => {
  return (
    <Suspense fallback={<Wrapper />}>
      <Routes>
        <Route path={RoutesPath.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={RoutesPath.SIGN_IN} element={<SignInLocal />} />
        <Route
          path={RoutesPath.PORTAL}
          element={
            <ProtectedRoute>
              <Portal />
            </ProtectedRoute>
          }
        >
          <Route path={RoutesPath.PROJECTS}>
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <CreateProject />
                </ProtectedRoute>
              }
            />
            <Route
              path=":editId"
              element={
                <ProtectedRoute>
                  <EditProject />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path={RoutesPath.JOBS}>
            <Route
              path=":editId"
              element={
                <ProtectedRoute>
                  <EditJob />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path={RoutesPath.CREATE_PROJECT}
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutesPath.CREATE_CUSTOMER}
            element={
              <ProtectedRoute>
                <CreateCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutesPath.LIST_OF_CUSTOMERS}
            element={
              <ProtectedRoute>
                <ListOfCustomers />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutesPath.CREATE_USER}
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutesPath.LIST_OF_USERS}
            element={
              <ProtectedRoute>
                <ListOfUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutesPath.SYSTEM}
            element={
              <ProtectedRoute>
                <System />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutesPath.UPDATE}
            element={
              <ProtectedRoute>
                <Update />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Toast />
    </Suspense>
  );
};
