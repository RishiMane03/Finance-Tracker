import React from 'react'
import './style.css'
import { useNavigate,NavLink } from 'react-router-dom';

function LandingPage() {

  const navigate = useNavigate()

  return (
    <div>
      <div class="landing-page">
        <header>
          <div class="containerBox">
            <a href="/" class="logo">Money <b>Affair</b></a>

            <ul className="links">
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/info">Info</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Get Started</NavLink>
              </li>
            </ul>

          </div>
        </header>
        <div class="content">
          <div class="containerBox">
            <div class="info">
              <h1><span>Money Affair</span> Bringing Your Finances to Life.</h1>
              <p>Money Affair simplifies personal finance. From user-friendly tables to engaging charts, take control of your financial journey with ease</p>
              <button onClick={() => navigate('/signup')}>Sign Up!</button>
            </div>
            <div class="image">
              <img src="https://i.postimg.cc/65QxYYzh/001234.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage