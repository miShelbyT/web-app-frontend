import { useState } from 'react'
import { Link } from 'react-router-dom'

import { userService } from '../services/UserApi.js'

function CreateAccount() {
  const BASE_URL = `${process.env.REACT_APP_API_URL}`
  const mgrAuthCode = "ROSE4747";

  const [mgrInput, setMgrInput] = useState("")
  const [isManager, setIsManager] = useState(false)
  const [url, setUrl] = useState(BASE_URL + "/users_new")

  const [user, setUser] = useState({
    name: '',
    title: isManager ? "Manager" : "Sales Associate",
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [err, setErr] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleClick(e){
    if(e.target.checked) {
      setIsManager(true)
      setUser(prev => ({...prev, title: "Manager"}))
      setUrl(BASE_URL + "/managers_new")
    } else {
      setIsManager(false)
      setUser(prev => ({...prev, title: "Sales Associate"}))
      setUrl(BASE_URL + "/users_new")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (user.password !== user.passwordConfirm) {
      setErr("Username and password do not match.")
      return
    } else if(isManager && (mgrInput !== mgrAuthCode)) {
      setErr("Manager authorization code not correct")
      return
    }
    const res = await userService.getOrCreateUser(url, {
      name: user.name,
      title: user.title,
      email: user.email,
      password: user.password,
    })
    
    if (res.status === 201) {
      setErr("")
      setSubmitted(true)
      setIsManager(false)
      setUser({
        name: '',
        title: '',
        startDate: new Date().toISOString().substring(0, 10),
        email: '',
        password: '',
        passwordConfirm: '',
      })
      
    } else {
      setSubmitted(false)
      setErr("Username already exists. Please login or use another email.")
    }
  }

  return (
    <div className="login create_acct">
      <div>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <label htmlFor="name"> Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={user.name}
              required
            ></input>
          </div>

          <div className="input-div">
            <label htmlFor="title"> Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              value={user.title}
              required
            ></input>
          </div>

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

          <div className="input-div">
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              onChange={handleChange}
              value={user.passwordConfirm}
              required
            ></input>
          </div>
          
          <div>
            {<p className="text-danger">{err}</p>}
          </div>

          <div>
            {submitted && (
              <p>
                <span className="success text-success">Success!</span>You have
                created your new account. Go{' '}
                <Link to="/login">here to log in</Link>.
              </p>
            )}
          </div>

          <div className="input-div stacked">
            <label htmlFor="mgr">I am a manager</label>
            <input type="checkbox" id="mgr" onChange={handleClick}/>
          </div>
          { isManager && <div className="input-div stacked">
            <label htmlFor="auth_code">Please enter authorization code:</label>
            <input type="password" id="auth_code" value={mgrInput} onChange={(e)=> setMgrInput(e.target.value)}></input>
          </div>}

          <button type="submit" className="btn btn-secondary m-2">
            Submit User
          </button>
        </form>
        <div className="login_or_register">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
