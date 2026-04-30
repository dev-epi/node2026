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

const getAll = (req , res)=>{
    
    UserModel.find().then((users)=>{
         res.send(users)
        
    }).catch(err=>{
        res.status(430).send(err)
    })
}

const getByRole = async(req , res)=>{
    
    try{
        let {role} = req.params
        let users = await UserModel.find({role : role})
        res.send(users)
    }catch(err){
        res.status(430).send(err)
    }
}
const getById = async(req , res)=>{
    
    try{
        let {id} = req.params
        let user = await UserModel.findOne({_id : id})
        res.send(user)
    }catch(err){
        res.status(430).send(err)
    }
}
const update = async(req , res)=>{
    
    try{
     let user=  await UserModel.updateOne({_id : req.params.id} , req.body)
     res.send(user)
    
    }catch(err){
        res.status(430).send(err)
    }
}
const remove = async(req , res)=>{
    
    try{
     let user=  await UserModel.deleteOne({_id : req.params.id})
     res.send(user)
    
    }catch(err){
        res.status(430).send(err)
    }
}
module.exports = {create, getAll , getByRole , getById , update , remove}