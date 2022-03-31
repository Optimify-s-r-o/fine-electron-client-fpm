import 'react-toastify/dist/ReactToastify.css';

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import { Toast } from './components/Toast';
import { RoutesPath } from './constants/routes';
import { Wrapper } from './modules/auth/components/AuthWrapper/styled';
import ApplicationsSettings from './modules/portal/admin/applicationsSettings';
import LocalApplicationsSettings from './modules/portal/settings/applications';

const SignInLocal = lazy(() => import('modules/auth/signInLocal'));
const ResetPassword = lazy(() => import('modules/auth/resetPassword'));
const Portal = lazy(() => import('modules/portal'));
const CreateProject = lazy(() => import('modules/portal/projects/createProject'));
const EditProject = lazy(() => import('modules/portal/projects/editProject'));
const EditProjectGeneral = lazy(() => import('modules/portal/projects/editProject/general'));
const EditProjectAttachments = lazy(
  () => import('modules/portal/projects/editProject/attachemnts')
);
const EditJob = lazy(() => import('modules/portal/jobs/editJob'));
const ListOfCustomers = lazy(() => import('modules/portal/customers/listOfCustomers'));
const CreateCustomer = lazy(() => import('modules/portal/customers/createCustomer'));
const CreateUser = lazy(() => import('modules/portal/users/createUser'));
const ListOfUsers = lazy(() => import('modules/portal/users/listOfUsers'));
const System = lazy(() => import('modules/portal/settings/system'));
const Settings = lazy(() => import('modules/portal/settings'));
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
          }>
          <Route path={RoutesPath.ADMIN}>
            <Route
              path="applications-settings"
              element={
                <ProtectedRoute>
                  <ApplicationsSettings />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path={RoutesPath.PROJECTS}>
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <CreateProject />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path={RoutesPath.EDIT_PROJECT}
            element={
              <ProtectedRoute>
                <EditProject />
              </ProtectedRoute>
            }>
            <Route
              path={RoutesPath.EDIT_PROJECT_ATTACHMENT}
              element={
                <ProtectedRoute>
                  <EditProjectAttachments />
                </ProtectedRoute>
              }
            />

            <Route
              path={RoutesPath.EDIT_PROJECT_GENERAL}
              element={
                <ProtectedRoute>
                  <EditProjectGeneral />
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
            path={RoutesPath.SETTINGS}
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }>
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
            <Route
              path={RoutesPath.LOCAL_APPLICATIONS_SETTINGS}
              element={
                <ProtectedRoute>
                  <LocalApplicationsSettings />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
      <Toast />
    </Suspense>
  );
};
