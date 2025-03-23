import { createBrowserRouter } from "react-router-dom";
import Root from "../LRoot/Root";
import Error from '../Pages/Error/Error'
import Home from '../Pages/Home/index';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import ResetPassword from '../Pages/Reset/Reset';
import Features from '../Pages/Features/Features';
import Pension from '../Pages/PensionForm/Pension';
import PrivateRoute from "./PrivateRoute";
import Agent from '../Pages/Agent/Agent';
import Profile from '../Pages/Profile/Profile';
import FAQ from '../Pages/FAQ/FAQ';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,

        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/reset",
                element: <ResetPassword></ResetPassword>
            },
            {
                path: "/features",
                element: <Features></Features>
            },
            {
                path: "/pension-form",
                element: <PrivateRoute><Pension></Pension></PrivateRoute>
            },
            {
                path: "/agent",
                element: <PrivateRoute><Agent></Agent></PrivateRoute>
            },
            {
                path: "/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "/faq",
                element: <FAQ></FAQ>
            }
        ]
    },
]);

export default Routes;