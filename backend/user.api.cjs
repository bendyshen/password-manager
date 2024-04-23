const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const UserModel = require('./db/user.model.cjs')

router.post('/register', async function(req, res){
    const body = req.body;
    const username = body.username;
    const password = body.password;
    try {
        if (!username || !password) {
            return res.status(409).send("Missing username or password")
        }
        const createUserResponse = await UserModel.insertUser({username:username, password:password})
        const token = jwt.sign(username, "PASSWORD")
        res.cookie("username", token);
        return res.status(200).send("User created successfully");
    } catch(error) {
        return res.status(401).send("Username already used");
    }
})

router.post('/login', async function(req, res){
    const body = req.body;
    const username = body.username;
    const password = body.password;
    try {
        if (!username || !password) {
            return res.status(401).send("Missing username or password")
        }
        const findUserResponse = await UserModel.getUserByUsername(username);
        if (findUserResponse.password !== password){
            return res.status(409).send("Invalid password");
        }
        const token = jwt.sign(username, "PASSWORD")
        res.cookie("username", token);
        return res.status(200).send("User signed in successfully");
    } catch(error) {
        return res.status(401).send(null);
    }
})

router.get('/isLoggedIn', async function(req, res) {

    const username = req.cookies.username;

    if(!username) {
        return res.send({username: null})
    }
    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "PASSWORD")
    } catch(e) {
        return res.send({username: null})
    }
    
    if(!decryptedUsername) {

        return res.send({username: null})
    } else {
        return res.send({username: decryptedUsername})
    }

})

router.post('/logOut', async function(req, res) {

    res.cookie('username', '', {
        maxAge: 0,
    })
    return res.send(true);

});

router.get('/:username', async function(req, res) {
    const username = req.params.username;

    const userData = await 
    UserModel.getUserByUsername(username);

    return res.send(userData);
})

module.exports = router