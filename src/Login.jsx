import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import './Login.css'
export default function Login(){

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [error, setErrorValue] = useState('');
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
        setErrorValue('');
        try {
            const response = await axios.post('/api/users/login', {username: usernameInput, password: passwordInput})
            navigate('/password');
        } catch (e) {
            setErrorValue(e.response.data)
        }
    }

    return (
        <div>
            <div>
            <Navbar></Navbar>
            </div>
            <div class="login-form">
                <span>Login</span>
                {!!error && <p>{error}</p>}
                <div>
                    <label>Username:</label><input type='text' value={usernameInput} onInput={setUsername}></input>
                </div>
                <div>
                    <label>Password:</label><input type='text' value={passwordInput} onInput={setPassword}></input>
                </div>

                <button onClick={submit}>Login</button>
            </div>

        </div>
    )
}