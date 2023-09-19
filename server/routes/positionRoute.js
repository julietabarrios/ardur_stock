const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/positionController');

router.post('/add', controller.addPosition)
router.post('/remove', controller.removePosition)
router.post('/edit', controller.editPosition)
router.get('/display', controller.displayAllPositions)




module.exports=router;