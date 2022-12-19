const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin')
const { json } = require('express');

router.post('/signIn',async(req,rep,next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        Admin.find({email : email},async (err,res)=>{
            const user =res[0]
            if(user){

                const isPasswordvalid = await bcrypt.compare(password, user.password);
                const token =  jwt.sign({user:user.username},'azizbenamar',{ expiresIn: '14d' });
                if(isPasswordvalid){
                    data ={
                        "name": user.name,
                        "lastname": user.lastname,
                        "email": user.email,
                    }
        
                    return rep.json(200,{message : "success" ,user: data,token:token});
        
                }else
                     return rep.json(200,{message:"password is wrong"});
            }else
                return rep.json(200,{message:"user not found"});

        })
    }catch(e){
        next(e);
    }})

router.post('/createAdminAccount/',async(req,rep,next) =>{
    const hashedPassword = await bcrypt.hash(req.body.password,15)

        const a = new Admin({
            name : req.body.name,
            lastname : req.body.lastname,
            email : req.body.email,
            password : hashedPassword
        })
        a.save()
        return rep.status(200).json({"result" : "Admin account created successfully"})

    })
router.post('/updateAdminAccount/',async(req,rep,next) => {
    let token =req.headers.authorization
    const decoded_user = jwt.verify(token,'azizbenamar')
    console.log("d :" ,decoded_user);

    
    const hashedPassword = await bcrypt.hash(req.body.password,15)

        Admin.updateOne({email : req.body.email},{$set : {
            name : req.body.name,
            lastname : req.body.lastname,
            password : hashedPassword
        }},(err,res)=>{
            if (err)
                return rep.status(200).json(err)
            else
                return rep.status(200).json({"result": "account data has been updated successfully"})
        })
    })

module.exports = router;