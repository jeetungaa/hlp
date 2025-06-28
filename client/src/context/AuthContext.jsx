import React, { useContext, createContext, useEffect, useState } from "react";
import {
    onAuthStateChanged, signInWithEmailAndPassword, signOut,
    signInWithRedirect,
} from "firebase/auth";
import { validateToken } from "../api";
import {auth,providerGoogle} from "../config/firebase.config";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginWithEmailPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        return signInWithRedirect(auth, providerGoogle);
    };

    const logOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user){
                try{
                    const data = await validateToken();
                    setCurrentUser(data);
                    setUserData(data);
                } catch(error) {
                     console.log("[TOKEN_FETCHING_VALIDATION_FAILED] : ", error);
                     setCurrentUser(null);
                }
            } else{
                setCurrentUser(null);
                setUserData(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser, userData, loginWithEmailPassword, loginWithGoogle, logOut,
    };

    return(
        <AuthContext.Provider value={value}>
            {!loading ? children : <p>loading....</p>}
        </AuthContext.Provider>
    )
};