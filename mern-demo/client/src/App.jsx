import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', name: '', major: '' });
  const [error, setError] = useState('');

  // 1. Lấy danh sách sinh viên khi tải trang
  const fetchStudents = async () => {
    try {
      const res = await axios.get('/api/students');
      setStudents(res.data);
      setError('');
    } catch (err) {
      console.error('Lỗi tải dữ liệu:', err);
      setError('Lỗi tải dữ liệu từ Server. Vui lòng kiểm tra lại kết nối!');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 2. Thêm sinh viên mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/students', form);
      setForm({ studentId: '', name: '', major: '' });
      fetchStudents(); // Tải lại danh sách
    } catch (err) {
      console.error('Lỗi thêm sinh viên:', err);
      alert('Không thể thêm sinh viên. Vui lòng kiểm tra lại thông tin!');
    }
  };

  // 3. Xóa sinh viên
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sinh viên này?')) return;
    try {
      await axios.delete(`/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error('Lỗi xóa:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Ứng Dụng Quản Lý Sinh Viên (MERN Stack)</h2>

      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

      {/* Form thêm sinh viên */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
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
          type="text" 
          placeholder="Ngành Học" 
          value={form.major} 
          onChange={(e) => setForm({ ...form, major: e.target.value })} 
        />
        <button type="submit">Thêm Sinh Viên</button>
      </form>

      {/* Bảng danh sách sinh viên */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th>MSSV</th>
            <th>Họ và Tên</th>
            <th>Ngành Học</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((st) => (
              <tr key={st._id}>
                <td>{st.studentId}</td>
                <td>{st.name}</td>
                <td>{st.major}</td>
                <td>
                  <button onClick={() => handleDelete(st._id)} style={{ color: 'red' }}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Chưa có sinh viên nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;