import axios from "axios";
import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import Shareform from "./Shareform";
import './Password.css'
export default function Password() {
    const [url, setUrl] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [length, setLength] = useState(0);
    const [useAlphabet, setUseAlphabet] = useState(false);
    const [useNumerals, setUseNumerals] = useState(false);
    const [useSymbols, setUseSymbols] = useState(false);
    const [passwords, setPasswords] = useState([]);
    const [error, setErrorValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [shareUsername, setShareUsername] = useState('');

    useEffect(() => {
        fetchPasswords();
    }, []);

   async function fetchPasswords() {
        try{
            const response = await axios.get('/api/password');
            setPasswords(response.data);
        }catch(e){
            setErrorValue(e.response.data);
        }
    };

    async function submit() {
        if (!useAlphabet && !useNumerals && ! useSymbols && !password) {
            setErrorValue("Missing password")
        }
        else {
            const generatedPassword = !password && (useAlphabet || useNumerals || useSymbols) ? generatePassword() : password;
            const data = { url:url, password: generatedPassword};
            try{
                const response = await axios.post('/api/password', data);
                fetchPasswords();
            }catch(e){
                setErrorValue(e.response.data)
            }
        }
    };
    
    async function updatePassword(id){
        try{
            const updateResponse = await axios.put('/api/password/' + id, {password:newPassword})
            setIsEditing(false)
            setNewPassword('')
            fetchPasswords();
        } catch(e){
            setErrorValue(e.response.data)
        }   
    }

    async function deletePassword(id){
        try{
            const response = await axios.delete('/api/password/'+id);
            fetchPasswords();
        }catch(e){
            setErrorValue(e.response.data);
        }
    }
    const generatePassword = () => {
        let result = '';
        const characters = `${useAlphabet ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' : ''}${useNumerals ? '0123456789' : ''}${useSymbols ? '!@#$%^&*()_+' : ''}`;
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };


    let components = [];
    for(let i = 0; i < passwords.length; i++) {
        const p = passwords[i];
        const date = new Date(p.updatedAt)
        const passwordComponent = (<li>
            <div class="url-password">
                <span>Url: </span>{p.url} <br></br>
                <span>Password: </span>{p.password}
            </div>
            <div class="update">
            <span> Last updated: </span> {date.toLocaleString()} 
            </div> 
        <button onClick={() => deletePassword(p._id)}>Delete</button>
        <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Update'}
      </button>
      {isEditing && (
        <div>

        <input type="text" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" />
        <button onClick={() => updatePassword(p._id)}>
          Save
        </button>
        </div>
      )}
      </li>)
        components.push(passwordComponent);
    }

    return (
        <div>
            <Navbar></Navbar>
            <div class="password-form">
                <div class="input-password">
                    {!!error && <span>{error}</span>}
                    <div>
                    <label>Url: </label><input type="text" value={url} onChange={e => setUrl(e.target.value)} />
                    </div>
                    <div>
                    <label>Password: </label><input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div>
                    <label>Length: </label><input type="number" value={length} onChange={e => setLength(e.target.value)} min="4" max="50" /> <span>(note: length need to be between 4 and 50 inclusively)</span>
                    </div>
                    <div>
                    <label><input type="checkbox" checked={useAlphabet} onChange={() => setUseAlphabet(!useAlphabet)} /> Alphabet</label>
                    <label><input type="checkbox" checked={useNumerals} onChange={() => setUseNumerals(!useNumerals)} /> Numerals</label>
                    <label><input type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} /> Symbols</label>
                    </div>

                    <button onClick={submit}>Add password</button>
                </div>
                <div class="password-list">
                    <h2>Your key lists:</h2>
                        <ul>
                        {components}
                        </ul>
                </div>
            </div>
            <hr></hr>
            <div class="share-form">
                <Shareform></Shareform>
            </div>
        </div>
    );
}