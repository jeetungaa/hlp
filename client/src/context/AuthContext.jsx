import React, { useContext, createContext, useEffect, useState } from "react";
import {
    onAuthStateChanged, signInWithEmailAndPassword, signOut,
    signInWithRedirect,
    GoogleAuthProvider,
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

    const providerGoogle = new GoogleAuthProvider();

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
    setLoading(true);

    if (user) {
      try {
        const token = await user.getIdToken();
        console.log("Firebase User Token:", token); // ✅ DEBUG

        const data = await validateToken(); // Your backend call
        console.log("Validated User from backend:", data); // ✅ DEBUG

        setCurrentUser(data);
        setUserData(data);
      } catch (error) {
        console.error("[TOKEN_FETCHING_VALIDATION_FAILED]:", error); // ✅ DEBUG
        setCurrentUser(null);
      }
    } else {
      console.log("No Firebase user found"); // ✅ DEBUG
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