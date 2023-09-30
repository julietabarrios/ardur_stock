const Stock = require('../models/stock')

const addStock = async (req,res)=>{
    let {name,comment,qty}= req.body
    if (!name ||!qty){
        return res.json({ ok: false, message: "All fields are required" });}
    try{
            await Stock.create({name, comment, qty});
            res.send({ok:true, message:"The product stock was successfully added"})
        }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

// en el add deberia poner que si ya existe el nombre me updatee la qty pero si no existe me cree el renglon de stock

const editStock = async (req,res)=>{
    let {name, newQty, newComment}= req.body 
    
    try{
        const findStock = await Stock.findOne({name})
        if (!findStock){
            res.send({ok:true, message:"This product is not registered with stock"})
        }
        else if (findStock.qty == newQty && findStock.comment == newComment){ 
          res.json({ok: true, message: "No change was made"});}
        else{
            await Stock.findOneAndUpdate({name}, {name:name, qty:newQty, comment:newComment })
            res.send({ok:true, message:"The stock was successfully updated"})   
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const displayAllStock = async (req,res)=>{
    try{
        const stock = await Stock.find()
        res.send({ok:true, message:stock})   
        }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}



module.exports={
    addStock,
    editStock,
    displayAllStock
}