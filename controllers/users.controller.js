const UserModel = require("../models/User.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service : process.env.MAIL_HOST,
    auth : {
        user : process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
})
const create = async(req , res)=>{
    try{
        let data = req.body
        let pass = req.body.pass
        let key = await bcrypt.genSalt(12)
        let hashedPassword = await bcrypt.hash(req.body.password , key)
        data.password = hashedPassword
        let user = new UserModel(data)
        await user.save()
        await transporter.sendMail({
            from : 'nourhene.epi@gmail.com',
            to :user.email,
            subject:'Account',
            text :'password :'+pass,
            // html :''
        })
        res.send('User saved')
    }catch(err){
        res.status(410).send({success : false , message : err.message})
    }
}

const login = async(req, res)=>{
    try{
        let {email , password} =req.body
        if(!email || !password){
          return  res.status(406).send({message : 'Missing credentials'})
        }
        let user = await UserModel.findOne({email : email})
        if(!user){
          return  res.status(406).send({message : 'User not found'})
        }
        let isValid = await bcrypt.compare(password , user.password)
        if(!isValid){
            return  res.status(406).send({message : 'Invalid password'}) 
        }
        let token = jwt.sign(
            {_id : user._id , role : user.role},
            process.env.SECRET || '123'
        )
        res.send({success : true , token})
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
module.exports = {create, getAll , getByRole , getById , update , remove , login}