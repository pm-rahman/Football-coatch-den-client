import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebaseConfig";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [paymentClass,setPaymentClass] = useState(null)
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setIsOpen] = useState(false);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser);
            if (!currentUser) {
                setLoading(false);

            }
            if (currentUser) {
                axios.post(`${import.meta.env.VITE_SERVER_API}/jwt`, { email: currentUser.email })
                    .then(data => {
                        // console.log(data.data);
                        localStorage.setItem('jwt_token',data.data.token)
                        setLoading(false);
                    })
            }
            else{
              localStorage.removeItem('jwt_token');  
            }
        })
        return () => unsubscribe();
    }, []);
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const userInfo = {
        user,
        createUser,
        updateUser,
        signIn,
        googleSignIn,
        logOut,
        setIsOpen,
        modalIsOpen,
        loading,
        paymentClass,
        setPaymentClass
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;