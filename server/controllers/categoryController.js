const Category = require('../models/category')

const addCategory = async (req,res)=>{
    let {name}= req.body
    if (!name){
        return res.json({ ok: false, message: "A name is required" });}
    try{
        const findCategory = await Category.findOne({name})
        if(findCategory){
            res.send({ok:true, message:"The category already exists"})}
        else{
            await Category.create({name});
            res.send({ok:true, message:"The category was successfully added"})
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const removeCategory = async (req,res)=>{
    let {name}= req.body 
    
    try{
        const findCategory = await Category.findOne({name})
        if (findCategory){
            await Category.deleteOne({name})
            res.send({ok:true, message:"The category was successfully removed"}) 
        }
        else{
            res.send({ok:true, message:"This category is not registered"})
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const editCategory = async (req,res)=>{
    let {name, newName}= req.body 
    
    try{
        const findCategory = await Category.findOne({name})
        if (!findCategory){
            res.send({ok:true, message:"This category is not registered"})
        }
        else if (name == newName){ 
          res.json({ok: true, message: "No change was made"});}
        else{
            await Category.findOneAndUpdate({name}, {name: newName})
            res.send({ok:true, message:"The category was successfully updated"})   
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const displayAllCategories = async (req,res)=>{
    try{
        const categories = await Category.find()
        res.send({ok:true, message:categories})   
        }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}



module.exports={
    addCategory,
    removeCategory,
    editCategory,
    displayAllCategories
}