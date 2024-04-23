import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './Navbar.css'
import { Link } from 'react-router-dom';

export default function Navbar() {

    const [activeUsername, setActiveUsername] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    async function checkIfUserIsLoggedIn() {
        const response = await axios.get('/api/users/isLoggedIn')

        setActiveUsername(response.data.username)
    
    }

    useEffect(() => {
        checkIfUserIsLoggedIn()
    }, []);

    async function logOutUser() {
        try{
            const logOutResponse = await axios.post('/api/users/logOut')
            setActiveUsername(null)
            navigate('/')
        } catch(e){
            console.log(e);
        }

    }
    let logCondition = null;
    if (! activeUsername) {
        logCondition = (<div class="login-condition">
            <div class="login-button"><Link to={'/login'}>Sign in</Link></div> <span>/</span>
            <div class="signup-button"><Link to={'/register'}>Register</Link></div>
        </div>
        )
    } else{
        logCondition = (<div className="login-condition">
          <span>Hi, {activeUsername} </span>
          <button onClick={toggleDropdown}>
            ▾
          </button>
          {dropdownOpen && (
            <ul className="dropdown">
              <li><Link to={'/password'}>Passwords</Link></li>
              <li><button onClick={logOutUser}>Logout</button></li>
            </ul>
          )}
        </div>
        )
    }
    return (
        <div className='navbar'>
            <div class="back-to-homepage">
                <img src='./public/logo.webp'/>
                <Link to="/" >Home</Link>
            </div>
            <div>{logCondition}</div>
        </div>

    )

}