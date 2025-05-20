import { useState, createContext, useContext } from 'react'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true")
  const [currentUser, setCurrentUser] = useState({
    email: localStorage.getItem("email") || "",
    id: localStorage.getItem("id") || "",
    password: localStorage.getItem("password") || "",
    isAdmin: localStorage.getItem("isAdmin") === "true" || ""
  })

  const login = (response, password)=> {
    setIsAuthenticated(true)
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("email", response.email)
    localStorage.setItem("password", password)
    localStorage.setItem("id", response.id)
    localStorage.setItem("isAdmin", response.isAdmin)

    setCurrentUser(response)
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.setItem("isAuthenticated", "false")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.removeItem("id")
    localStorage.removeItem("isAdmin")
    setCurrentUser({})
  }

  const updateCurrentUser = (userObj) => {
    setCurrentUser(userObj)
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout, currentUser, updateCurrentUser}}>
      {children}
    </AuthContext.Provider>
  )

}
