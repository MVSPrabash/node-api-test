const express = require('express');
const router = express.Router();

const {
    getUsersController,
    createUserController,
    getUserByIdController,
    updateUserController,
    deleteUserController
} = require('../controllers/user.controller.js');

const { protect } = require('../middleware/auth.middleware.js');
router.use(protect);

// Get all users, admin only
router.get('/', getUsersController);

const { validate } = require('../middleware/validate.middleware.js');
const { createUserSchema, updateUserSchema, idParamScheme } = require('../schemas/user.schema.js');

// CRUD operation for users
router.post('/', validate(createUserSchema), createUserController);
router.get('/:id', validate(idParamScheme, "params"), getUserByIdController);
router.put('/:id', 
  validate(idParamScheme, "params"),
  validate(updateUserSchema),
  updateUserController
);
router.delete('/:id', validate(idParamScheme, "params"), deleteUserController);

module.exports = router;

