const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  className: {
    type: String,
    required: true,
    trim: true
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Class', classSchema);
