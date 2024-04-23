const model = require('mongoose').model;

const passwordSchema = require('./password.schema.cjs');

const PasswordModel = model('Password', passwordSchema);

function insertPassword(password) {
    return PasswordModel.create(password);
}

function getAllPassword() {
    return PasswordModel.find().exec();
}

function getPasswordById(id) {
    return PasswordModel.findById(id).exec();
}

function deletePassword(id) {
    return PasswordModel.deleteOne({_id: id})
}


function updatePassword(id, password) {
    return PasswordModel.findOneAndUpdate({_id: id}, {password:password, updatedAt: new Date()}, {new:true})
}

function getPasswordByOwner (username){
    return PasswordModel.find({
        username : username
    }).exec()
}

module.exports = {
    getPasswordById,
    deletePassword,
    updatePassword,
    insertPassword,
    getAllPassword,
    getPasswordByOwner
}