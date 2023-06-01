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
            console.log(authenticationKey)
            if (authenticationKey) {
                console.log("auth"+authenticationKey)
                getByAuthenticationKey(authenticationKey)
                    .then(user => {
                        setAuthenticatedUser(user)
                    })
                    .catch(error => {
                        router.navigate("/")
                    })
            } else {
                router.navigate("/")
            }
        }
    }, [authenticatedUser])
    

    return <AuthenticationContext.Provider value={[authenticatedUser, setAuthenticatedUser]}>
        {children}
    </AuthenticationContext.Provider>
}

// export function useAuthentication() {
//     const [authenticatedUser, setAuthenticatedUser] = useContext(AuthenticationContext)

//     async function login(email, password) {
//         setAuthenticatedUser(null)
//         return apiLogin(email, password)
//             .then(result => {
//                 if (result.status == 200) {
//                     localStorage.setItem("authenticationKey", result.authenticationKey)
//                     return getByAuthenticationKey(result.authenticationKey)
//                         .then(user => {
//                             setAuthenticatedUser(user)
//                             return Promise.resolve(result.message)
//                         })
//                 } else {
//                     return Promise.reject(result.message)
//                 }
//             }).catch(error => {
//                 return Promise.reject(error)
//             }
//         )
//     }

//     async function logout() {
//         localStorage.removeItem("authenticationKey")
//         if (authenticatedUser) {
//             return apiLogout(authenticatedUser.authenticationKey)
//                 .then(result => {
//                     setAuthenticatedUser(null)
//                     return Promise.resolve(result.message)
//                 }
//             )
//         }
//     }
    
//     return [authenticatedUser, login, logout]
// }

export function useAuthentication() {
    const [authenticatedUser, setAuthenticatedUser] = useContext(AuthenticationContext);
    const [loading, setLoading] = useState(true);  // Add a loading state

    useEffect(() => {
        if (authenticatedUser == null) {
            const authenticationKey = localStorage.getItem("authenticationKey");
            if (authenticationKey) {
                setLoading(true);
                getByAuthenticationKey(authenticationKey)
                    .then(user => {
                        setAuthenticatedUser(user);
                        setLoading(false);
                    })
                    .catch(error => {
                        router.navigate("/");
                        setLoading(false);
                    });
            } else {
                router.navigate("/");
                setLoading(false);
            }
        }
    }, []);

    // Return the loading state along with the other values
    return [authenticatedUser, loading, login, logout];
}
