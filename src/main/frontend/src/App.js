import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Header from './components/Header'
import Home from './components/Home'
import Fallback from './components/Fallback'
import EditInventoryItem from './components/EditInventoryItem'
import AddInventoryItem from './components/AddInventoryItem'
import { AuthProvider } from './components/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <div className="container mt-3">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/create_account" element={<CreateAccount />} />
              <Route
                path="/inventory_item/edit"
                element={
                  <ProtectedRoute>
                  <EditInventoryItem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory_item/new"
                element={
                  <ProtectedRoute>
                    <AddInventoryItem />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Fallback />}/>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
