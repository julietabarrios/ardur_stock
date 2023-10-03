const User = require('../models/user')
const argon2 = require("argon2"); 
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;

const addUser = async (req,res)=>{
  let {email,password}= req.body
  const salt = "corazones429"
  
  if (!email || !password){
      return res.json({ ok: false, message: "All fields required" });
    }
    if (!validator.isEmail(email)){
      return res.json({ ok: false, message: "Invalid email" });
    }
  try{
      const findUser = await User.findOne({email})
      if (findUser)
        return  res.json({ok:false, message:"This email is already registered"})
      
        const hash = await argon2.hash(password,salt);
        await User.create({email,password:hash})
        res.json({ok:true, message:"The user was successfully added"})
      
  }
  catch(error){
      res.json({ok:false,message:{error}})
  }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password){
      return res.json({ ok: false, message: "All fields are required" });
    }
    if (!validator.isEmail(email)){
      return res.json({ ok: false, message: "Invalid email provided" });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) return res.json({ ok: false, message: "Invalid email provided" });
      const match = await argon2.verify(user.password, password);
      if (match) {
        const token = jwt.sign({userEmail:user.email}, jwt_secret, { expiresIn: "1h" }); 
        res.json({ ok: true, message: "welcome back", token, email });
      } else return res.json({ ok: false, message: "Invalid data provided" });
    } catch (error) {
      res.json({ ok: false, error });
    }
  };


module.exports={
    login,
    addUser
}