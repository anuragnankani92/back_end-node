const express = require('express')
const router = express.Router()
const { userNode,validPassword } = require('../middleware/userMiddleware')
// const userNode = require('../middleware/userMiddleware')
// const validPassword = require('../middleware/userMiddleware')


const userController = require('../controller/userController')

router.post('/addUsers', userNode, userController.addUsers)
router.post('/loginUser',userController.loginUser)
router.get('/getUsers',userController.getUsers)
router.delete('/deleteUsers/:id', userController.deleteUser);
router.delete('/deleteByEmail', userController.deleteByEmail);
router.put('/updateUser/:id', userController.updateUser);
router.put('/updateByEmail', userController.updateByEmail)

module.exports = router;