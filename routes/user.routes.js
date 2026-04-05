const express = require('express');
const router = express.Router();

const {
  getUsersController,
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  getMeController,
  updateMeController
} = require('../controllers/user.controller.js');

const { protect, authorize } = require('../middleware/auth.middleware.js');
router.use(protect);

// Get all users, admin only
router.get('/', authorize("admin"), getUsersController);

const { validate } = require('../middleware/validate.middleware.js');
const { createUserSchema, updateUserSchema, idParamScheme } = require('../schemas/user.schema.js');

// Self Routes
router.get('/me', getMeController);
router.put('/me', validate(updateUserSchema), updateMeController);

// CRUD operation for users
router.post('/', authorize("admin"), validate(createUserSchema), createUserController);
router.get('/:id', validate(idParamScheme, "params"), getUserByIdController);
router.put('/:id', 
  validate(idParamScheme, "params"),
  validate(updateUserSchema),
  updateUserController
);
router.delete('/:id', authorize("admin"), validate(idParamScheme, "params"), deleteUserController);

module.exports = router;

