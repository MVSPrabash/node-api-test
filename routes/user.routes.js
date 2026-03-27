const express = require('express');
const router = express.Router();

const {
    getUsersController,
    createUserController,
    getUserByIdController,
    updateUserController,
    deleteUserController
} = require('../controllers/user.controller.js');

// Get all users, admin only
router.get('/', getUsersController);

// CRUD operation for users
router.post('/', createUserController);
router.get('/:id', getUserByIdController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

module.exports = router;

