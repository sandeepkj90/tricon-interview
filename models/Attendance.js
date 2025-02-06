const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceRecordSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true
  }
});

const attendanceSchema = new Schema({
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  attendanceRecords: [attendanceRecordSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// To ensure one attendance record per class per date
attendanceSchema.index({ classId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
