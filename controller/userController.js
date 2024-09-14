const UserData = require('../model/userSchema')

// app.post('/addUsers',

exports.addUsers = async(req,res)=>{
    try{
        const body = req.body;

        if(!body || !body.fname || !body.username || !body.email || !body.password || !body.age){
            return res.status(400).json({ msg:"All Fields are Required" })
        }
        const result = await UserData.create({
            fname: body.fname,
            username: body.username,
            email: body.email,
            password: body.password,
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