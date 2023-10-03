const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/loginController');

router.post('/login', controller.login)
router.post('/add', controller.addUser)


module.exports=router;