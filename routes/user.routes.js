const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth.middleware.js');
const { validate } = require('../middleware/validate.middleware.js');
const { createUserSchema, updateUserSchema, idParamScheme } = require('../schemas/user.schema.js');

const {
  getUsersController,
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  getMeController,
  updateMeController
} = require('../controllers/user.controller.js');

router.use(protect);

// Admin routes
router.get('/', authorize("admin"), getUsersController);
router.post('/', authorize("admin"), validate(createUserSchema), createUserController);
router.delete('/:id', authorize("admin"), validate(idParamScheme, "params"), deleteUserController);

// Self Routes
router.get('/me', getMeController);
router.put('/me', validate(updateUserSchema), updateMeController);

// id routes
router.get('/:id', validate(idParamScheme, "params"), getUserByIdController);
router.put('/:id', 
  validate(idParamScheme, "params"),
  validate(updateUserSchema),
  updateUserController
);

module.exports = router;

