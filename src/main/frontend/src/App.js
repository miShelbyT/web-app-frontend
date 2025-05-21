import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Header from './components/Header'
import Home from './components/Home'
import EditInventoryItem from './components/EditInventoryItem'
import AddInventoryItem from './components/AddInventoryItem'
import { inventoryService } from './services/InventoryApi'
import { AuthProvider } from './components/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  const [inventory, setInventory] = useState([])
  const { fetchProducts } = inventoryService
  const [currentItem, setCurrentItem] = useState({})
  const [ready, setReady] = useState(false)


  useEffect(() => {
    try {
      getInventory()
    } catch (e) { console.log(e) }
    // eslint-disable-next-line
  }, [ready])

  function updateReady(){
    setReady(prev => !prev)
  }

  async function getInventory() {
    const fetchInventory = await fetchProducts()
    if (fetchInventory) {
      setInventory(fetchInventory)
    }
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

  function updateCurrentItem(item) {
    setCurrentItem(() => item)
  }


  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <div className="container mt-3">
            <Routes>
              <Route path="/login" element={<Login updateReady={updateReady}/>} />
              <Route path="/create_account" element={<CreateAccount />} />
              <Route
                path="/inventory_item/edit"
                element={
                  <ProtectedRoute>
                  <EditInventoryItem
                    currentItem={currentItem}
                    updateItem={updateItem}
                  />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory_item/new"
                element={
                  <ProtectedRoute>
                    <AddInventoryItem addItem={addItem} />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home
                      updateCurrentItem={updateCurrentItem}
                      inventory={inventory}
                      updateItem={updateItem}
                      deleteItem={deleteItem}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
