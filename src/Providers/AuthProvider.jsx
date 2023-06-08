import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from "../firebase/firebaseConfig";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo) => {
        setLoading(false);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const signIn = (email, password) => {
        setLoading(false);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = ()=>{
        setLoading(false);
        return signInWithPopup(auth,googleProvider);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser)
            setLoading(true);
        })
        return () => unsubscribe()
    }, []);
    const logOut = () => {
        setLoading(false);
        return signOut(auth);
    }

    const userInfo = {
        user,
        createUser,
        updateUser,
        signIn,
        googleSignIn,
        logOut,
        loading
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;