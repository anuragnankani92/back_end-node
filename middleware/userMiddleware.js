const userNode =((req,res,next)=>{
const {age} = req.body;

if( !age == 'number' || age< 18 || age> 100 ){
    return res.status(400).json({ msg:'Age must be a number and cant not be less than 18 and greater then 100' })

}
next();
})

const validPassword =((req,res,next)=>{

    const {password}= req.body;
   
    // const user= /^[a-zA-Z0-9@-_$]+$/
    const user = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@-_])[A-Za-z\d@-_]+$/
    if(!password || !user.test(password)){
return res.status(400).json({ msg:'Invalid Password'})
    }
next()
})


module.exports = {userNode,validPassword};