import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({children}) => {

    // Importing the users session if they're logged in.
    const {user,loading} = useContext(AuthContext);

    if(loading)
    {
        return <span className="loading loading-spinner text-neutral"></span>
    }

    // Creating private routes that only users that are logged in can view
    if(user)
    return children;

    // If the user isn't logged in on a private route it navigates them back to Login.
    return <Navigate to={"/login"}></Navigate>
};

export default PrivateRoute;