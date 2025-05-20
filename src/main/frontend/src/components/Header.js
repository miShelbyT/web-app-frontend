import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

function Header() {

  const {logout, currentUser } = useAuth()
  const navigate = useNavigate()

  function handleLogOut(){
    logout()
    navigate("/login")
  }
  return (
    <header className="container mt-4">
      <div>
        <h1 className="m-2 mb-0">Rose's Closet</h1>
        {currentUser.isAdmin && <p className="ms-5">Manager View</p>}
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className="btn btn-primary m-2">
              Home
            </Link>
          </li>
          { currentUser.isAdmin &&
          <li>
            <Link to="/inventory_item/new" className="btn btn-secondary m-2">
              Add Inventory Item
            </Link>
          </li>
          }

          <li>
            <button onClick={handleLogOut} className="btn btn-secondary m-2">
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
