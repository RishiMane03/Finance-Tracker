import React from 'react'
import './info.css'
import { useNavigate,NavLink } from 'react-router-dom';

function InfoPage() {

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
              <h1><span>Information About Money Affair</span></h1>
              <br/>
              <hr/>
              <br/>
              <p>
              Welcome to the Money Affairs Info page, your go-to resource for understanding the features and benefits of our innovative personal finance platform. At Money Affairs, we are committed to providing you with a seamless and intuitive experience to take control of your financial journey. Explore our user-friendly tables and visually appealing charts designed to transform complex financial data into actionable insights. Whether you're a budgeting beginner or an experienced financial planner, Money Affairs adapts to your needs. Dive into the comprehensive tools and resources that empower you to make informed decisions about your income, expenses, and savings. Discover the transformative potential of financial well-being with Money Affairs – where managing your money becomes a rewarding and empowering experience. Explore the world of financial possibilities and embark on a journey towards prosperity with Money Affairs today.
             </p>

              <button onClick={() => navigate('/signup')}>Sign Up!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoPage