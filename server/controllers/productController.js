const Product = require('../models/product')

const addProduct = async (req,res)=>{
    let {name, description,limitBlack,limitRed}= req.body
    if (!name|| !description || !limitBlack || !limitRed){
        return res.json({ ok: false, message: "All the fields are required" });}
    try{
        const findProduct = await Product.findOne({name})
        if(findProduct){
            res.send({ok:true, message:"The Product already exists"})}
        else{
            await Product.create({name,description,limitBlack,limitRed});
            res.send({ok:true, message:"The Product was successfully added"})
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const removeProduct = async (req,res)=>{
    let {name}= req.body 
    
    try{
        const findProduct = await Product.findOne({name})
        if (findProduct){
            await Product.deleteOne({name})
            res.send({ok:true, message:"The Product was successfully removed"}) 
        }
        else{
            res.send({ok:true, message:"This Product is not registered"})
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const editProduct = async (req,res)=>{
    let {name, newName, newDescription, newLimitRed, newLimitBlack}= req.body 
    
    try{
        const findProduct = await Product.findOne({name})
        if (!findProduct){
            res.send({ok:true, message:"This Product is not registered"})
        }
        else if (name == newName && findProduct.description == newDescription && findProduct.limitRed == newLimitRed && findProduct.limitBlack == newLimitBlack){ 
          res.json({ok: true, message: "No change was made"});}
        else{
            await Product.findOneAndUpdate({name}, {name: newName, description:newDescription, limitRed: newLimitRed, limitBlack:newLimitBlack})
            res.send({ok:true, message:"The Product was successfully updated"})   
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const displayAllProducts = async (req,res)=>{
    try{
        const Products = await Product.find()
        res.send({ok:true, message:Products})   
        }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}



module.exports={
    addProduct,
    removeProduct,
    editProduct,
    displayAllProducts
}