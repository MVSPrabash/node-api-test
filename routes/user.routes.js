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

const { validate } = require('../middleware/validation.middleware.js');
const { createUserSchema, updateUserSchema } = require('../validations/user.validation.js');

// CRUD operation for users
router.post('/', validate(createUserSchema), createUserController);
router.get('/:id', getUserByIdController);
router.put('/:id', validate(updateUserSchema), updateUserController);
router.delete('/:id', deleteUserController);

module.exports = router;

