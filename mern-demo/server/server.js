const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Nhập Model Student
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Kết nối MongoDB Atlas thành công!'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// --------------------------------------------------
// CÁC REST API QUẢN LÝ SINH VIÊN
// --------------------------------------------------

// 1. API GET /api/students - Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error('Lỗi GET /api/students:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 2. API POST /api/students - Thêm sinh viên mới
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    console.error('Lỗi POST /api/students:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// 3. API PUT /api/students/:id - Cập nhật sinh viên theo ID
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    console.error('Lỗi PUT /api/students/:id:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// 4. API DELETE /api/students/:id - Xóa sinh viên theo ID
app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa sinh viên thành công' });
  } catch (err) {
    console.error('Lỗi DELETE /api/students/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Khởi động Server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});