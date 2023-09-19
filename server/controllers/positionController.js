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

const editPosition = async (req,res)=>{
    let {name, newName}= req.body 
    
    try{
        const findPosition = await Position.findOne({name})
        if (!findPosition){
            res.send({ok:true, message:"This position is not registered"})
        }
        else if (name == newName){ 
          res.json({ok: true, message: "No change was made"});}
        else{
            await Position.findOneAndUpdate({name}, {name: newName})
            res.send({ok:true, message:"The position was successfully updated"})   
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const displayAllPositions = async (req,res)=>{
    try{
        const positions = await Position.find()
        res.send({ok:true, message:positions})   
        }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}



module.exports={
    addPosition,
    removePosition,
    editPosition,
    displayAllPositions
}