const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const ShareModel = require('./db/sharepassword.model.cjs')
const UserModel = require('./db/user.model.cjs')
const PasswordModel = require('./db/password.model.cjs')

router.post('/:target', async function(req, res){
    const curUser = req.cookies.username;
    const targetUser = req.params.target;
    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(curUser, "PASSWORD")
    } catch(e) {
        return res.status(401).send("Invalid request")
    }
    if (curUser === targetUser) {
        return res.status(401).send("Invalid username")
    }
    try {
        const findUserResponse = await UserModel.getUserByUsername(targetUser);
        if (!findUserResponse){
            return res.status(409).send("Can't find target user")
        }
        const existingShare = await ShareModel.findExistingShare(decryptedUsername, targetUser);
        if (existingShare) {
            return res.status(409).send("A similar request already exists");
        }
        const shareResponse = await ShareModel.insertShare({requester: decryptedUsername, target: targetUser});
        return res.status(200).send("Request submitted successfully")
    } catch (e){
        return res.send(401).send(e)
    }
})

router.get('/', async function(req,res){

    const curUser = req.cookies.username;

    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(curUser, "PASSWORD")
    } catch(e) {
        return res.status(401).send("Invalid request")
    }

    try{
        const getShareResponse = await ShareModel.getShareByBothName(decryptedUsername);
        let response = []
        for (let shareInfo of getShareResponse){
            const name = shareInfo.requester === decryptedUsername? shareInfo.target: shareInfo.requester
            const getPasswordResponse = await PasswordModel.getPasswordByOwner(name);
            response = [...response, ...getPasswordResponse]
        }
        return res.status(200).send(response)
    } catch(e){
        return res.status(500).send(e);
    }
})

router.get('/getRequest', async function(req,res){

    const curUser = req.cookies.username;

    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(curUser, "PASSWORD")
    } catch(e) {
        return res.status(401).send("Invalid request")
    }

    try{
        const getShareResponse =  await ShareModel.getShareByTargetName(decryptedUsername);
        return res.status(200).send(getShareResponse)
    } catch(e){
        return res.status(500).send(e);
    }
})

router.delete('/:shareId', async function(req, res){
    const id = req.params.shareId;

    try{
        const deleteShareResponse = await ShareModel.deleteShare(id);
        return res.status(200).send("Delete successfully");
    } catch (e){
        return res.status(500).send(e);
    }
})

router.put('/:shareId', async function(req, res){
    const id = req.params.shareId;

    try{
        const updateShareResponse = await ShareModel.updateShare(id);
        return res.status(200).send("Update successfully");
    } catch (e){
        return res.status(500).send(e);
    }
})

module.exports = router