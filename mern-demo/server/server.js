// 1. GET: Lấy danh sách sinh viên
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// 2. POST: Thêm sinh viên mới
app.post('/api/students', async (req, res) => {
  const { studentId, name, email } = req.body;
  const newStudent = await Student.create({ studentId, name, email });
  res.status(201).json(newStudent);
});

// 3. PUT: Cập nhật thông tin sinh viên
app.put('/api/students/:id', async (req, res) => {
  const { studentId, name, email } = req.body;
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    { studentId, name, email },
    { new: true }
  );
  res.json(updatedStudent);
});

// 4. DELETE: Xóa sinh viên
app.delete('/api/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Đã xóa sinh viên' });
});