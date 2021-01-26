import React, { createContext, useState , useEffect, useContext} from "react";
import { auth, db } from '../firebase'
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const [currentUser, setCurrentUser] = useState(null)
    const history = useHistory()

    function signup(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
        login(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        auth.signOut()
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        
        return () => {
            unsubscribe()
        }
    }, [])

    

    const value = {
        currentUser,
        signup,
        login,
        logout,
        db
    }


    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}
