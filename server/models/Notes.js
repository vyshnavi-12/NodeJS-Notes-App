const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  pinned: {
    type: Boolean,
    default: false
  }
});

// Middleware to update the updatedAt field
NoteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Note', NoteSchema);
