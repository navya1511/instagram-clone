import React, { Suspense } from "react"
import { lazy } from "react";
import * as ROUTES from './constants/routes'
import { BrowserRouter as Router , Route , Routes  } from 'react-router-dom'
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./context/user";

import ProtectedRoutes from "./helpers/protected.route";
import ReactLoader from "./components/loader";

const Login = lazy(()=> import('./pages/login'));
const SignUp =lazy(()=> import('./pages/signup'))
const NotFound =lazy(()=> import("./pages/not-found"))
const Dashboard =lazy(()=> import("./pages/dashboard"))
const Profile=lazy(()=> import("./pages/profile"))

function App() {
  const { user } =useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
    <Router>
      <Suspense fallback={<p><ReactLoader />...loading</p>}>
      <Routes>
        <Route exact path={ROUTES.LOGIN} element={<Login />}  />
        <Route exact path={ROUTES.SIGN_UP} element={<SignUp />}  />
        <Route exact path={ROUTES.PROFILE} element={<Profile />}  />

        <Route exact path={ROUTES.DASHBOARD} element=
        {<ProtectedRoutes user={user}>
          <Dashboard />
          </ProtectedRoutes>
        } />
         
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
