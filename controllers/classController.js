const Class = require('../models/Class');
const User = require('../models/User');

// Create a new class (Admin only)
exports.createClass = async (req, res, next) => {
  try {
    const { className, teacherId, students } = req.body;

    // Verify teacher exists and is a teacher
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(400).json({ message: 'Invalid teacher ID' });
    }

    // Verify students exist and are students
    const studentUsers = await User.find({ _id: { $in: students }, role: 'student' });
    if (studentUsers.length !== students.length) {
      return res.status(400).json({ message: 'Some student IDs are invalid' });
    }

    // Create class
    const newClass = new Class({
      className,
      teacherId,
      students
    });

    await newClass.save();

    res.status(201).json(newClass);

  } catch (error) {
    next(error);
  }
};

// Get all classes (Admin and Teachers)
exports.getAllClasses = async (req, res, next) => {
  try {
    let classes;
    if (req.user.role === 'admin') {
      classes = await Class.find().populate('teacherId', 'name email').populate('students', 'name email');
    } else if (req.user.role === 'teacher') {
      classes = await Class.find({ teacherId: req.user.id }).populate('students', 'name email');
    }
    res.json(classes);
  } catch (error) {
    next(error);
  }
};

// Get a single class by ID
exports.getClassById = async (req, res, next) => {
  try {
    const classId = req.params.id;
    const foundClass = await Class.findById(classId).populate('teacherId', 'name email').populate('students', 'name email');
    if (!foundClass) return res.status(404).json({ message: 'Class not found' });
    res.json(foundClass);
  } catch (error) {
    next(error);
  }
};

// Update a class (Admin only)
exports.updateClass = async (req, res, next) => {
  try {
    const classId = req.params.id;
    const updates = req.body;

    // If updating teacherId, verify the new teacher
    if (updates.teacherId) {
      const teacher = await User.findById(updates.teacherId);
      if (!teacher || teacher.role !== 'teacher') {
        return res.status(400).json({ message: 'Invalid teacher ID' });
      }
    }

    // If updating students, verify them
    if (updates.students) {
      const studentUsers = await User.find({ _id: { $in: updates.students }, role: 'student' });
      if (studentUsers.length !== updates.students.length) {
        return res.status(400).json({ message: 'Some student IDs are invalid' });
      }
    }

    const updatedClass = await Class.findByIdAndUpdate(classId, updates, { new: true }).populate('teacherId', 'name email').populate('students', 'name email');
    if (!updatedClass) return res.status(404).json({ message: 'Class not found' });
    res.json(updatedClass);
  } catch (error) {
    next(error);
  }
};

// Delete a class (Admin only)
exports.deleteClass = async (req, res, next) => {
  try {
    const classId = req.params.id;
    const deletedClass = await Class.findByIdAndDelete(classId);
    if (!deletedClass) return res.status(404).json({ message: 'Class not found' });
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    next(error);
  }
};
