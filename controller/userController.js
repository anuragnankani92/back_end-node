const UserData = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// app.post('/addUsers',
const SECRET_KEY = 'njuwgtmbgju87j6mklmbrt901bgqplkcz1ynhutdxcytdfcvbjhgfbjh'

exports.addUsers = async(req,res)=>{
    try{
        const body = req.body;

        if(!body || !body.fname || !body.username || !body.email || !body.password || !body.age){
            return res.status(400).json({ msg:"All Fields are Required" })
        }
        let hashPassword = await bcrypt.hash(body.password,10)

        const result = await UserData.create({
            fname: body.fname,
            username: body.username,
            email: body.email,
            password: hashPassword,
            age:body.age
        })
        console.log('Result', result);
        res.status(200).json({ msg:'User is Successfully Registered'})

    }catch(err){
        console.error('Not Registered',err)
        res.status(500).json({msg:'Server Error'})
    }
} 
// app.get('/getUsers'

exports.getUsers= async(req,res)=>{
    try{
        let result = await UserData.find({});
        // let result = await UserData.find({},'fname email');
        if(!result){
            console.log('User is Required')
            res.status(404).json({ msg:'User is not Found' })
        }
        return res.status(200).json(result)

    }catch(err){
return res.status(500).json({ msg:'Server Error' })
    }
}

// app.delete('/deleteUsers/:id'

exports.deleteUser = async(req,res)=>{
try{
    const {id}=req.params;
    console.log(id,'params id')
    if(!id){
        return res.status(400).json({ msg: 'ID is Required' })
    }
    const result = await UserData.findByIdAndDelete(id)
    if(!result){
        return res.status(404).json({ msg:'User Not Found' })
    }
    console.log('results',result)
    return res.status(200).json({ msg: 'Data Deleted Successfully' })
    
}catch(err){
    console.error('Server Error',err)
}
}

// app.delete('/deleteByEmail'

exports.deleteByEmail = async (req,res)=>{
try{
    const {email}=req.body;
    console.log(email,'email from body')
    if(!email){
        return res.status(400).json({ msg: 'Email is Required' })
    }
    const result = await UserData.findOneAndDelete({ email:email })
    if(!result){
        return res.status(404).json({ msg:' User Not Found' })
    }
    return res.status(200).json({ msg:'User Deleted By Email' })

}catch(err){
    console.error('Failed to Delete User',err)
    return res.status(500).json({ msg:'Server error' })
}
}

// app.put( '/updateUser/:id',

exports.updateUser = async(req,res)=>{

    const {id}=req.params;
    const { fname, username, email, password } = req.body;

    if(!id){
        return res.status(400).json({ msg:'Id is Required' })
    }
    const updateData={}
    if(fname) updateData.fname = fname;
    if(username) updateData.username= username;
    if(email) updateData.email = email;
    if(password) updateData.password = password;
try{
    const result = await UserData.findByIdAndUpdate(
        id,
        { $set:updateData },
        {new: true}
    )
    if(!result){
        return res.status(404).json({ msg: 'user not found' })
    }
    return res.status(200).json({ msg: 'user updated successfully', data:result })
}catch(err){
    console.error('Server Error',err)
}
}
// app.put( '/updateByEmail',

exports.updateByEmail = async(req,res)=>{
    const { fname, username, email, password } = req.body;
    // const update = req.body;
    if(!email){
        return res.status(400).json({ msg:'Email is Required' })
    }

    const updateData ={};
    if(fname) updateData.fname = fname;
    if(username) updateData.username = username;
    if(password) updateData.password = password;

    try{
        const result = await UserData.findOneAndUpdate(
            {email:email},
            { $set: updateData},
            { new: true }
        )
        if(!result){
            return res.status(404).json({ msg: 'user not found' })
        }
        return res.status(200).json({ msg: 'user updated successfully', data:result })

    }catch(err){
        console.error('Server Error',err)
    }

}

exports.loginUser= async(req,res)=>{
    const { username,password } =req.body
if(!username || !password){
    return res.status(400).json({msg:'Username or Password is required'})
}
try{
    const user = await UserData.findOne({ username })
    if(!user){
        return res.status(404).json({msg:'User not found'})
    }
    const validPassword = bcrypt.compare(password,user.password)
    // const validPassword = password === user.password
    if(!validPassword){
        return res.status(401).json({ msg:'Invalid Password' })
    }
    const token= jwt.sign({id:user.id, username:user.username},SECRET_KEY,{
        expiresIn:'1h'
    })
    return res.status(201).json({msg:'Login Successful',token})
}catch(err){
    return res.status(500).json({msg:'Server Error'})

}

}