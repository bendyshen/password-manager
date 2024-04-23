const model = require('mongoose').model;

const shareSchema = require('./sharepassword.schema.cjs');

const ShareModel = model('Share', shareSchema);

function insertShare(share){
    return ShareModel.create(share)
}

function getShareByBothName(name){
    return ShareModel.find({
        $or:[
            {requester: name},
            {$and:[
                {
                    target:name
                },
                {
                    accepted:true
                }
            ]}
        ]
    }).exec();
}

function getShareByTargetName(name){
    return ShareModel.find({
        target: name,
        accepted: false
    }).exec();
}

function updateShare(id) {
    return ShareModel.findOneAndUpdate({_id: id}, {accepted:true}, {new:true})
}

function deleteShare(id){
    return ShareModel.deleteOne({_id:id})
}

function findExistingShare(n1, n2) {
    return ShareModel.findOne({
        $or:[
            {requester: n1,
            target: n2},
            {requester:n2,
            target:n1}
            ]}).exec();
}

module.exports ={
    insertShare,
    getShareByBothName,
    getShareByTargetName,
    updateShare,
    deleteShare,
    findExistingShare
}
