import { useState } from 'react';

const ROLES = ['admin', 'editor', 'user'];

// Props: initialData (object) - dữ liệu ban đầu (dùng khi edit)
//        onSubmit (function) - gọi khi submit form
//        onCancel (function) - gọi khi bấm Hủy
export default function UserForm({ initialData = {}, onSubmit, onCancel }) {
	const [form, setForm] = useState({
		name: initialData.name || '',
		email: initialData.email || '',
		phone: initialData.phone || '',
		role: initialData.role || 'user',
	});
	const [errors, setErrors] = useState({});

	const validate = () => {
		const newErrors = {};
		if (!form.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';
		if (!form.email.trim()) {
			newErrors.email = 'Vui lòng nhập email';
		} else if (!/\S+@\S+\.\S+/.test(form.email)) {
			newErrors.email = 'Email không hợp lệ';
		}
		if (!form.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
		return newErrors;
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		// Xóa lỗi khi người dùng bắt đầu nhập lại
		if (errors[e.target.name]) {
			setErrors({ ...errors, [e.target.name]: '' });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = validate();
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		onSubmit(form);
	};

	return (
		<form onSubmit={handleSubmit} className='user-form'>
			<div className='form-group'>
				<label className='form-label'>
					Họ và tên <span className='required'>*</span>
				</label>
				<input
					type='text'
					name='name'
					value={form.name}
					onChange={handleChange}
					placeholder='Nhập họ và tên'
					className={`form-input ${errors.name ? 'input-error' : ''}`}
				/>
				{errors.name && <span className='field-error'>{errors.name}</span>}
			</div>

			<div className='form-group'>
				<label className='form-label'>
					Email <span className='required'>*</span>
				</label>
				<input
					type='email'
					name='email'
					value={form.email}
					onChange={handleChange}
					placeholder='Nhập địa chỉ email'
					className={`form-input ${errors.email ? 'input-error' : ''}`}
				/>
				{errors.email && <span className='field-error'>{errors.email}</span>}
			</div>

			<div className='form-group'>
				<label className='form-label'>
					Số điện thoại <span className='required'>*</span>
				</label>
				<input
					type='text'
					name='phone'
					value={form.phone}
					onChange={handleChange}
					placeholder='Nhập số điện thoại'
					className={`form-input ${errors.phone ? 'input-error' : ''}`}
				/>
				{errors.phone && <span className='field-error'>{errors.phone}</span>}
			</div>

			<div className='form-group'>
				<label className='form-label'>Vai trò</label>
				<select name='role' value={form.role} onChange={handleChange} className='form-input'>
					{ROLES.map((role) => (
						<option key={role} value={role}>
							{role}
						</option>
					))}
				</select>
			</div>

			<div className='form-actions'>
				<button type='button' onClick={onCancel} className='btn btn-outline'>
					Hủy
				</button>
				<button type='submit' className='btn btn-primary'>
					Lưu
				</button>
			</div>
		</form>
	);
}
