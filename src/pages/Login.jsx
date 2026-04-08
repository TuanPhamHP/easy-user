import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Props: onLogin (function), isLoggedIn (boolean)
export default function Login({ onLogin, isLoggedIn }) {
	const navigate = useNavigate();
	const [form, setForm] = useState({ username: 'admin', password: '123456' });
	const [error, setError] = useState('');

	// Nếu đã đăng nhập thì chuyển về trang chủ
	if (isLoggedIn) {
		return <Navigate to='/' replace />;
	}

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setError('');
	};

	const handleSubmit = e => {
		e.preventDefault();
		const success = onLogin(form.username, form.password);
		if (success) {
			navigate('/');
		} else {
			setError('Tên đăng nhập hoặc mật khẩu không đúng!');
		}
	};

	return (
		<div className='login-container'>
			<div className='login-card'>
				<h1 className='login-title'>Easy-User</h1>
				<p className='login-subtitle'>Hệ thống quản lý người dùng</p>

				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label className='form-label'>Tên đăng nhập</label>
						<input
							type='text'
							name='username'
							value={form.username}
							onChange={handleChange}
							placeholder='Nhập tên đăng nhập'
							className='form-input'
						/>
					</div>
					<div className='form-group'>
						<label className='form-label'>Mật khẩu</label>
						<input
							type='password'
							name='password'
							value={form.password}
							onChange={handleChange}
							placeholder='Nhập mật khẩu'
							className='form-input'
						/>
					</div>

					{error && <p className='error-message'>{error}</p>}

					<button type='submit' className='btn btn-primary btn-block'>
						Đăng nhập
					</button>
				</form>

				<p className='login-hint'>Tài khoản mặc định: admin / 123456</p>
			</div>
		</div>
	);
}
