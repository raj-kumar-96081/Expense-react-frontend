import { Navigate, Route, Routes } from 'react-router-dom';
import { serverEndpoint } from "./config/appConfig";
import { useSelector, useDispatch } from 'react-redux';
import { SET_USER, CLEAR_USER } from './redux/user/action';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Registerform from './Components/RegisterForm';
import Login2 from './pages/Login2';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import DashNav from './Components/DashNav';
import AppLayout from './Components/AppLayout';
import Groups from './pages/Groups';
import ManageUsers from './pages/ManageUsers';
import ProtectedRoute from './rbac/ProtectedRoute';
import UnauthorizedAccess from './Components/errors/UnauthorizedAccess';
import ManagePayments from "./pages/ManagePayments";
import ManageSubscription from "./pages/ManageSubscription";
import GroupExpenses from "./pages/GroupExpenses";


function App() {
  const dispatch = useDispatch();
  //Value of UserDetails represent whether user is logged in or not
  // const [userDetails, setUserDetails] = useState(null);
  //useSelector takes in 1 function as input ,redux calls the function that 
  //you pass to the useSelector with all the values it is storing /managing
  //we need to take out userDetails sice we are interested in userDetails object
  const userDetails = useSelector((state) => state.userDetails)
  const [loading, setloading] = useState(true);
  const isUserLoggedIn = async () => {
    try {
      const response = await axios.post(`${serverEndpoint}/auth/is-user-logged-in`,
        {}, { withCredentials: true });
      console.log(response);
      // setUserDetails(response.data.user);
      dispatch({
        type: SET_USER,
        payload: response.data.user
      });

    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        dispatch({ type: CLEAR_USER });
        return;
      }
      console.error("Auth check failed:", error);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    isUserLoggedIn();
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={
          userDetails ? (
            <Navigate to="/dashboard" />) : (
            <AppLayout>
              <Home />
            </AppLayout>)
        } />
        <Route path="/login" element={
          userDetails ? (
            <Navigate to="/dashboard" />) : (
            <AppLayout>
              <Login />
            </AppLayout>)
        } />
        <Route path="/registerf" element={
          userDetails ? (
            <Navigate to="/dashboard" />) : (
            <AppLayout>
              <Registerform />
            </AppLayout>)
        } />
        <Route path="/login2" element={
          userDetails ? (
            <Navigate to="/dashboard" />) : (
            <AppLayout>
              <Login2 />
            </AppLayout>)
        } />
        <Route path="/dashboard" element={
          userDetails ? (
            <DashNav >
              <Dashboard />
            </DashNav>
          ) : (
            <Navigate to="/login2" />
          )

        } />

        <Route path="/logout" element={
          userDetails ? (
            <Logout />
          ) : (
            <Navigate to="/login2" />
          )
        } />

        <Route
          path="/reset-password"
          element={
            <AppLayout>
              <ResetPassword />
            </AppLayout>
          }
        />

        <Route
          path="/groups" element={
            userDetails ? (
              <DashNav>
                <Groups />
              </DashNav>
            ) : (
              <Navigate to="/login2" />
            )
          }
        />
        <Route
          path="/manage-users" element={
            userDetails ? (
              <ProtectedRoute roles={["admin", "manager"]}>
                <DashNav>
                  <ManageUsers />
                </DashNav>
              </ProtectedRoute>
            ) : (
              <Navigate to="/login2" />
            )
          }
        />
        <Route
          path="/unauthorized-access" element={
            userDetails ? (

              <DashNav>
                <UnauthorizedAccess />
              </DashNav>
            ) : (
              <AppLayout>
                <UnauthorizedAccess />
              </AppLayout>
            )
          }
        />

        <Route
          path="/manage-payments" element={
            userDetails ? (
              <ProtectedRoute roles={["admin"]}>
                <DashNav>
                  <ManagePayments />
                </DashNav>
              </ProtectedRoute>
            ) : (
              <Navigate to="/login2" />
            )
          }
        />

        <Route
          path="/manage-subscription" element={
            userDetails ? (
              <ProtectedRoute roles={["admin"]}>
                <DashNav>
                  <ManageSubscription />
                </DashNav>
              </ProtectedRoute>
            ) : (
              <Navigate to="/login2" />
            )
          }
        />

        <Route
          path="/groups/:groupId/expenses"
          element={
            userDetails ? (
              <ProtectedRoute roles={["admin", "manager", "user"]}>
                <DashNav>
                  <GroupExpenses />
                </DashNav>
              </ProtectedRoute>
            ) : (
              <Navigate to="/login2" />
            )
          }
        />



      </Routes>
    </>
  )
}

export default App
