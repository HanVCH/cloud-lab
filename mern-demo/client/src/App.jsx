import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  // Lấy danh sách sinh viên khi tải trang
  const fetchStudents = async () => {
    const res = await fetch('/api/students');
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Xử lý Thêm hoặc Cập nhật sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Gọi API PUT (Cập nhật)
      await fetch(`/api/students/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setEditingId(null);
    } else {
      // Gọi API POST (Thêm mới)
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    }
    setForm({ studentId: '', name: '', email: '' });
    fetchStudents();
  };

  // Chuẩn bị dữ liệu để sửa
  const handleEdit = (student) => {
    setEditingId(student._id);
    setForm({ studentId: student.studentId, name: student.name, email: student.email });
  };

  // Xử lý Xóa sinh viên
  const handleDelete = async (id) => {
    await fetch(`/api/students/${id}`, { method: 'DELETE' });
    fetchStudents();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Ứng Dụng Quản Lý Sinh Viên (MERN Stack)</h2>

      {/* Form nhập dữ liệu */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="MSSV"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Họ và Tên"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">
          {editingId ? 'Cập Nhật' : 'Thêm Sinh Viên'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ studentId: '', name: '', email: '' }); }}>
            Hủy
          </button>
        )}
      </form>

      {/* Bảng danh sách sinh viên */}
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Sửa</button>
                <button onClick={() => handleDelete(student._id)} style={{ color: 'red', marginLeft: '5px' }}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;