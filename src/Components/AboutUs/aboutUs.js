import React from 'react'
import './aboutUs.css'
import { useNavigate,NavLink } from 'react-router-dom';

function AboutUs() {

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
              <h1><span>About Us</span></h1>
              <br/>
              <hr/>
              <br/>
              <p>
                Welcome to Money Affair, where financial empowerment meets simplicity in personal finance management. Founded with a commitment to redefine the way individuals interact with their money, Money Affair is more than just a platform – it's a partner on your financial journey.

                At Money Affair, we recognize the complexities people face when managing their finances. Our mission is to demystify this process by offering intuitive tools and insights tailored to users at every stage of their financial lifecycle. Whether you're taking your first steps into budgeting or seeking advanced financial strategies, Money Affair adapts to your needs.

                Our platform boasts user-friendly tables and visually captivating charts that transform numbers into meaningful insights. Behind Money Affair is a dedicated team passionate about providing a seamless and enjoyable experience for users from all walks of life. We believe that financial well-being should be accessible to everyone.

                Join us on this transformative financial adventure. Sign up with Money Affair today to embark on a journey where your money takes center stage, and your financial aspirations become more than dreams – they become achievable realities. Your financial future starts here at Money Affair, your trusted companion on the road to prosperity.
             </p>

              <button onClick={() => navigate('/signup')}>Sign Up!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs