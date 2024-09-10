const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/myfirstapi")
.then(()=>{
    console.log('MongoDB is Connected')
})
.catch((err)=>{
    console.log('Failed to Connect',err)
})

const UserSchema = new mongoose.Schema({

    fname: {
        type: String,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required:  true
    },
    password:{
        type: String,
        required:  true
    },
}, {timestamps: true} )

const UserData = mongoose.model('data',UserSchema)

app.post('/addUsers', async(req,res)=>{
    try{
        const body = req.body;

        if(!body || !body.fname || !body.username || !body.email || !body.password ){
            return res.status(400).json({ msg:"All Fields are Required" })
        }
        const result = await UserData.create({
            fname: body.fname,
            username: body.username,
            email: body.email,
            password: body.password
        })
        console.log('Result', result);
        res.status(200).json({ msg:'User is Successfully Registered'})

    }catch(err){
        console.error('Not Registered',err)
        res.status(500).json({msg:'Server Error'})
    }
} )



const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is runnimg on port ${port}`)
})

app.get('/getUsers',async(req,res)=>{
    try{
        let result = await UserData.find({},'fname email');
        if(!result){
            console.log('User is Required')
            res.status(404).json({ msg:'User is not Found' })
        }
        return res.status(200).json(result)

    }catch(err){
return res.status(500).json({ msg:'Server Error' })
    }
})

app.delete('/deleteUsers/:id', async(req,res)=>{
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
})

app.delete('/deleteMyEmail',async (req,res)=>{
try{
    const {email}=req.body;
    console.log(email,'email from body')
    if(!email){
        return res.status(400).json({ msg: 'Email is Required' })
    }
    const result = await UserData.findOneAndDelete({ email:email })
    if(!result){
        return res.status(404).json({ msg:' Email Not Found' })
    }
    return res.status(200).json({ msg:'User Deleted By Email' })

}catch(err){
    console.error('Failed to Delete User',err)

}

})