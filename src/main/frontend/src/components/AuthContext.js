import { useState, createContext, useContext } from 'react'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {

  const [currentItem, setCurrentItem] = useState({})
  const [inventory, setInventory] = useState([])

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true")
  const [currentUser, setCurrentUser] = useState({
    email: localStorage.getItem("email") || "",
    id: localStorage.getItem("id") || "",
    password: localStorage.getItem("password") || "",
    isAdmin: localStorage.getItem("isAdmin") === "true" || ""
  })



  function updateCurrentItem(item) {
    setCurrentItem(() => item)
  }

  function updateInventory(list){
    setInventory(()=> list)
  }

  function addItem(item) {
    setInventory([...inventory, item])
  }

  function deleteItem(id) {
    const updatedList = inventory.filter((el) => el.id !== id)
    return setInventory(updatedList)
  }

  function updateItem(newItem) {
    const updated = inventory.map((el) => {
      if (el.id === newItem.id) return newItem
      else return el
    })
    setInventory(() => updated)
  }

  const login = (response, password)=> {
    setIsAuthenticated(true)
    console.log(response)
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("email", response.email)
    localStorage.setItem("password", password)
    localStorage.setItem("id", response.id)
    localStorage.setItem("isAdmin", response.isAdmin)
    localStorage.setItem("token", response.token)

    setCurrentUser(response)
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.setItem("isAuthenticated", "false")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.removeItem("id")
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("token")
    setCurrentUser({})
  }

  const updateCurrentUser = (userObj) => {
    setCurrentUser(userObj)
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout, currentUser, updateCurrentUser, currentItem, updateCurrentItem, inventory, updateInventory, addItem, updateItem, deleteItem}}>
      {children}
    </AuthContext.Provider>
  )

}
