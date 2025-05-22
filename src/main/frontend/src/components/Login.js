import { Link } from 'react-router-dom'
import { useState } from 'react'

import { userService } from '../services/UserApi.js'
import { useAuth } from './AuthContext'

function Login({updateReady}) {
    
  const BASE_URL = `${process.env.REACT_APP_API_URL}`
  
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [url, setUrl] = useState(BASE_URL + '/login_users')
  const [err, setErr] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const {login} = useAuth()

  function handleChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleClick(e) {
    if (e.target.checked) {
      setUrl(BASE_URL + '/login_managers')
    } else {
      setUrl(BASE_URL + '/login_users')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    localStorage.setItem("email", user.email)
    localStorage.setItem("password", user.password)
    const apiResp = await userService.getOrCreateUser(url, user)
    if (apiResp.status === 200) {
      const resp = await apiResp.json()
      setUser({ email: '', password: '' })
      setErr("")
      setSubmitted(true)
      login(resp, user.password)
      updateReady()
    } else {
      setErr("Email and password are not a match.")
    }
  }

  return (
    <div className="login">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <label htmlFor="email"> Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={user.email}
              required
            ></input>
          </div>

          <div className="input-div">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              required
            ></input>
          </div>

          <div>{<p className="text-danger">{err}</p>}</div>

          <div className="input-div stacked">
            <label htmlFor="mgr">I am a manager</label>
            <input type="checkbox" id="mgr" onChange={handleClick} />
          </div>

          <button type="submit" className="btn btn-secondary m-2">Log In</button>
        </form>

        <div>
            {submitted && (
              <p className="mt-3">
                <span className="success text-success">Success!</span>You have
                logged in. Go{' '}
                <Link to="/">Home</Link>
              </p>
            )}
          </div>
        <div className="login_or_register">
          <Link to="/create_account">Create Account</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
