import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    login as apiLogin,
    logout as apiLogout,
    getByAuthenticationKey
} from "../api/user"

export const AuthenticationContext = createContext(null)

export function AuthenticationProvider({ router, children }) {
    const [authenticatedUser, setAuthenticatedUser] = useState(null)

    useEffect(() => {
        if (authenticatedUser == null) {
            const authenticationKey = localStorage.getItem("authenticationKey")
            if (authenticationKey) {
                getByAuthenticationKey(authenticationKey)
                    .then(user => {
                        // include authenticationKey in the user object
                        setAuthenticatedUser({ ...user, authenticationKey })
                    })
                    .catch(error => {
                        router.navigate("/")
                    })
            } else {
                router.navigate("/")
            }
        }
    }, [])

    return <AuthenticationContext.Provider value={[authenticatedUser, setAuthenticatedUser]}>
        {children}
    </AuthenticationContext.Provider>
}

export function useAuthentication() {
    const [authenticatedUser, setAuthenticatedUser] = useContext(AuthenticationContext)

    async function login(email, password) {
        // Clear existing client side user record
        setAuthenticatedUser(null)
        // Attempt login and retrieve user if successful
        return apiLogin(email, password)
            .then(result => {
                if (result.status == 200) {
                    // Store auth key in case page is reloaded
                    localStorage.setItem("authenticationKey", result.authenticationKey)
                    // Fetch logged in user from backend
                    return getByAuthenticationKey(result.authenticationKey)
                        .then(user => {
                            // include authenticationKey in the user object
                            setAuthenticatedUser({ ...user, authenticationKey: result.authenticationKey })
                            return Promise.resolve(result.message)
                        })
                } else {
                    return Promise.reject(result.message)
                }
            }).catch(error => {
                return Promise.reject(error)
            })
    }
    

    async function logout() {
        localStorage.removeItem("authenticationKey")
        if (authenticatedUser) {
            return apiLogout(authenticatedUser.authenticationKey)
                .then(result => {
                    setAuthenticatedUser(null)
                    return Promise.resolve(result.message)
                })
        }
    }

    return [authenticatedUser, login, logout]
}