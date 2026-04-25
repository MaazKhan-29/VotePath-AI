const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 17,
    max: 120,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  constituency: {
    type: String,
    trim: true,
    default: '',
  },
  voterStatus: {
    type: String,
    enum: ['registered', 'not_registered', 'applied', 'unknown'],
    default: 'unknown',
  },
  hasVoterId: {
    type: Boolean,
    default: false,
  },
  isFirstTimeVoter: {
    type: Boolean,
    default: false,
  },
  pincode: {
    type: String,
    trim: true,
    default: '',
  },
  readinessScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
