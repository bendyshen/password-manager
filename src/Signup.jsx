import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import './Signup.css'
export default function Signup() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('')
    const [error, setError] = useState('');

    const navigate = useNavigate();

    function setUsername(event) {
        const username = event.target.value;
        setUsernameInput(username);
    }

    function setPassword(event) {
        const pswd = event.target.value;
        setPasswordInput(pswd);
    }

    async function submit() {
        try {
            const response = await axios.post('/api/users/register', {username: usernameInput, password: passwordInput})
            navigate('/password')
        } catch (error) {
            setError(error.response.data)
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <div class="signup-form">
            <span>Register New User</span>
            {!!error && <p>{error}</p>}
                <div>
                    <label>Username: </label><input type='text' value={usernameInput} onInput={setUsername}></input>
                </div>
                <div>
                    <label>Password: </label><input type='text' value={passwordInput} onInput={setPassword}></input>
                </div>
                <button onClick={submit}>Create Account</button>
            </div>

        </div>
    )


}