import axios from "axios";
import { useEffect, useState } from "react";
import './Shareform.css'
export default function Shareform(){
    const [shareToUsername, setShareToUsername] = useState('')
    const [error, setError] = useState('')
    const [shares, setShares] = useState([])
    const [requests, setRequests] = useState([])

    useEffect(()=>{
        fetchSharePasswords();
        fetchShareRequests();
    }, [])

    async function submitShareRequest() {
        if (!shareToUsername) {
            setError("Missing username to share with");
            return;
        }
        try {
            const response = await axios.post('/api/share/'+shareToUsername);
            setError("Request sent successfully.")
        } catch (e) {
            setError(e.response.data);
        }
    }

    async function fetchSharePasswords(){
        try{
            const response = await axios.get('/api/share')
            setShares(response.data)
        } catch(e){
            setError(e.response.data)
        }
    }

    async function fetchShareRequests(){
        try{
            const response = await axios.get('/api/share/getRequest')
            setRequests(response.data)
        } catch(e){
            setError(e.response.data)
        }
    }

    async function acceptRequest(id){
        try{
            const response = await axios.put('/api/share/' + id)
            setError("Successfully accept")
            fetchSharePasswords()
            fetchShareRequests()
        } catch(e){
            setError(e.response.data)
        }
    }

    async function rejectRequest(id){
        try{
            const response = await axios.delete('/api/share/' + id)
            setError("Successfully reject")
            fetchSharePasswords()
            fetchShareRequests()
        } catch(e){
            setError(e.response.data)
        }
    }

    let passwordComponents = []
    for (let shareInfo of shares){
        const date = new Date(shareInfo.updatedAt)
        const component = (<li>
            <span>Owner: </span> {shareInfo.username}<br/>
            <span>Url: </span> {shareInfo.url}<br/>
            <span>Password: </span> {shareInfo.password}<br/>
            <span>Last update: </span> {date.toLocaleString()}
        </li>)
        passwordComponents.push(component)
    }

    const requestComponents = [];
    for (let requestInfo of requests){
        const component = (
          <li>
            <span>Requester: </span> {requestInfo.requester}<br></br>
            <button className="accept-button" onClick={()=>acceptRequest(requestInfo._id)}>Accept</button>
            <button className="reject-button" onClick={()=>rejectRequest(requestInfo._id)}>Reject</button>
          </li>
        );
        requestComponents.push(component);
    }

    return(
        <div>
            <h2>Share your passwords:</h2>
            <div class="share-request">
                <input type="text" value={shareToUsername} onChange={e => setShareToUsername(e.target.value)} placeholder="Enter the user you want to share your passwords with" />
                <button onClick={submitShareRequest}>Submit request</button>
            </div>
            <h2>Shared Passwords:</h2>
            <div class="share-password-list">
                <ul>
                    {passwordComponents}
                </ul>
            </div>
            <hr></hr>
            <h2>Requests:</h2>
            <div class="request-list">
                <ul>
                    {requestComponents}
                </ul>
            </div>
        </div>
    )





}
