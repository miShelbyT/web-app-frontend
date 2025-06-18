import React from 'react'
import { Link } from 'react-router-dom'

function Fallback() {
  return (
    <div className="stacked-center"> 
      <h3>Oops! <span className="fallback text-primary">Page not found.</span></h3>
      <p>
        Looks like the page you were trying to reach doesn’t exist—or it may
        have moved.
      </p>
      <p>Let’s get you back on track: <Link to="/">Go Home</Link></p>
    </div>
  )
}

export default Fallback
