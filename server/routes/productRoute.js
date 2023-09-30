const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/productController');

router.post('/add', controller.addProduct)
router.post('/remove', controller.removeProduct)
router.post('/edit', controller.editProduct)
router.get('/display', controller.displayAllProducts)




module.exports=router;