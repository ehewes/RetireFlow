import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from '../firebase/firebase.config';
export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {

    /* 
    The AuthContext.jsx acts as an API wrapper for the Firebase API Functions.

    All the functions are imported from firebase/auth and the firebase.config.js to approve requests

    The functions are executed along with their arguments.
    */
    const [user, setUser] = useState(null);
    const [trees, setTree] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = async (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password); // Using the createUserWithEmailAndPassword function provided by firebase to create User Accounts in the Firebase Authenticator Database
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password); // Authorising user sign ins by comparing information to the infomration stored in the Database.
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth); // Signing the user out of his session.
    }

    // When the page loads the user session is created to keep them logged into their account.
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = { user, loading, createUser, signInUser, signOutUser, trees, setTree } // Wrapping the made functions

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider; // Exporting the functions to be used throughout the code.

AuthProvider.propTypes = {
    children: PropTypes.node,
}
