const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/positionController');

router.post('/add', controller.addPosition)
router.post('/edit', controller.editPosition)
router.post('/remove', controller.removePosition)



module.exports=router;