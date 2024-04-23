const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const PasswordModel = require('./db/password.model.cjs')

router.post('/', async function(req, res){
    const body = req.body;
    const username = req.cookies.username;
    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "PASSWORD")
    } catch(e) {
        return res.status(401).send("Invalid request")
    }
    const url = body.url;
    const password = body.password;
    try {
        if (!url || !password) {
            return res.status(409).send("Missing Url")
        }
        const createPasswordResponse = await PasswordModel.insertPassword({username:decryptedUsername, url:url, password:password})
        return res.status(200).send("Passowrd created successfully: " + createPasswordResponse);
    } catch(error) {
        return res.status(500).send(error);
    }
})


router.get('/', async function(req, res) {

    const username = req.cookies.username;

    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "PASSWORD")
    } catch(e) {
        return res.status(401).send("Invalid request")
    }
    
    try{
        const getPasswordResponse = await PasswordModel.getPasswordByOwner(decryptedUsername);
        return res.status(200).send(getPasswordResponse);
    } catch(e){
        return res.status(500).send(e);
    }

})

router.get('/:username', async function(req, res){
    const username = req.params.username

})

router.put('/:passwordId', async function(req, res){
    const body = req.body;
    const password = body.password;
    const id = req.params.passwordId;
    try {
        if (!password){
            return res.status(404).send("Invalid password")
        }
        const updatePasswordResponse = await PasswordModel.updatePassword(id, password);
        return res.status(200).send("Update successfully");
    } catch(e) {
        return res.status(500).send(e);
    }


    
})

router.delete('/:passwordId', async function(req, res) {
    const id = req.params.passwordId;

    try{
        const deletePasswordResponse = await PasswordModel.deletePassword(id);
        return res.status(200).send("Delete successfully");
    } catch (e){
        return res.status(500).send(e);
    }
})


module.exports = router