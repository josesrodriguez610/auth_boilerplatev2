import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login/Login";
import DashLayout from "./components/DashLayout";

import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";

import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";

import NotFound from "./components/NotFound";
import LoginHelp from "./features/auth/LoginHelp/LoginHelp";
import ResetPassword from "./features/auth/ResetPassword/ResetPassword";
import Settings from "./features/Settings/Settings";

import Dashboard from "./features/Dashboard/Dashboard";

function App() {
  useTitle("Production Times");

  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Navigate from="/" to="/login" />} />
        <Route path="login" element={<Login />} />

        <Route path="LoginHelp" element={<LoginHelp />} />

        <Route path="ResetPassword" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                {/* <Route index element={<Welcome />} /> */}
                <Route
                  index
                  element={<Navigate from="/dash" to="/dash/dashboard" />}
                />

                <Route path="dashboard">
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path="settings" element={<Settings />} />
                <Route
                  element={
                    <RequireAuth
                      allowedRoles={[ROLES.Admin, ROLES.SuperAdmin]}
                    />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
              </Route>
              {/* End Dash */}
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
