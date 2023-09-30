const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/stockController');

router.post('/add', controller.addStock)
router.post('/edit', controller.editStock)
router.post('/remove', controller.removeStock)
router.get('/display', controller.displayAllStock)




module.exports=router;