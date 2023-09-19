const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/categoryController');

router.post('/add', controller.addCategory)
router.post('/remove', controller.removeCategory)
router.post('/edit', controller.editCategory)
router.get('/display', controller.displayAllCategories)




module.exports=router;