import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup  } from 'firebase/auth'
import {auth} from '../firebase/firebase'
export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error("No se encontro proveedor de autenticacion")
    return context
}

const AuthProvider = ({children}) => {

    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
    } 

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const logout = () => {
        signOut(auth)
    }

    const loginWithGoogle = () => {
        const  googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)

    }

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setuser(currentUser)
            setLoading(false)
        })
    }, [])

    return (
        <authContext.Provider value={{signup, login, user, logout, loading, loginWithGoogle}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider