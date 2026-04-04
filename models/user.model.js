const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },

  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    require: true
  },

  age: {
    type: Number,
    min: 0
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  isActive: {
    type: Boolean,
    default: true
  }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = { User };

