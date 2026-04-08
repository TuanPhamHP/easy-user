import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';

// Props: onAdd (function)
export default function UserAdd({ onAdd }) {
	const navigate = useNavigate();

	const handleSubmit = (data) => {
		onAdd(data);
		navigate('/');
	};

	return (
		<div className='page-container'>
			<div className='page-header'>
				<h2 className='page-title'>Thêm người dùng mới</h2>
				<button onClick={() => navigate('/')} className='btn btn-outline'>
					← Quay lại
				</button>
			</div>

			<div className='card form-card'>
				<UserForm onSubmit={handleSubmit} onCancel={() => navigate('/')} />
			</div>
		</div>
	);
}
