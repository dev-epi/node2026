const UserModel = require("../models/User.model")

const create = async(req , res)=>{
    try{
        let user = new UserModel(req.body)
        await user.save()
        res.send('User saved')
    }catch(err){
        res.status(410).send({success : false , message : err.message})
    }
}

module.exports = {create}