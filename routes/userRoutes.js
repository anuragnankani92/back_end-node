const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')

router.post('/addUsers', userController.addUsers)
router.get('/getUsers',userController.getUsers)
router.delete('/deleteUsers/:id', userController.deleteUser);
router.delete('/deleteByEmail', userController.deleteByEmail);
router.put('/updateUser/:id', userController.updateUser);
router.put('/updateByEmail', userController.updateByEmail)

module.exports = router;