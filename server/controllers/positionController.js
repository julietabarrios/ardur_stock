const Position = require('../models/position')

const addPosition = async (req,res)=>{
    let {name}= req.body
    if (!name){
        return res.json({ ok: false, message: "A name is required" });}
    try{
        const findPosition = await Position.findOne({name})
        if(findPosition){
            res.send({ok:true, message:"The position already exists"})}
        else{
            await Position.create({name});
            res.send({ok:true, message:"The position was successfully added"})
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const removePosition = async (req,res)=>{
    let {name}= req.body 
    
    try{
        const findPosition = await Position.findOne({name})
        if (findPosition){
            await Position.deleteOne({name})
            res.send({ok:true, message:"The Position was successfully removed"}) 
        }
        else{
            res.send({ok:true, message:"This Position is not registered"})
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

// const updateCustomer = async (req,res)=>{
//     let {newName, email, newAddress}= req.body 
    
//     try{
//         const findEmail = await Customer.findOne({email})
//         if (!findEmail){
//             res.send({ok:true, message:"This email is not registered in Foodies"})
//         }
//         else if (findEmail.name == newName && newAddress == findEmail.address){ 
//           res.json({ok: true, message: "No change was made"});}
//         else{
//             await Customer.findOneAndUpdate({email}, {name: newName,address:newAddress})
//             res.send({ok:true, message:"The customer was successfully updated"})   
//         }
//     }
//     catch(error){
//         res.send({ok:false,message:{error}})
//     }
// }




//   const displayCustomer = async (req,res)=>{
//     let {email}= req.body
//     try{
//         const customerInfo = await Customer.find({email})
//         res.send({ok:true, message:customerInfo}) 
//         }
//     catch(error){
//         res.send({ok:false,message:{error}})
//     }
// }




module.exports={
    addPosition,
    removePosition
}