const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:uuid', userController.getUserById);
router.put('/:uuid', userController.updateUser);
router.delete('/:uuid', userController.deleteUser);
router.get('/:uuid/products', userController.getUserProducts);

module.exports = router;
