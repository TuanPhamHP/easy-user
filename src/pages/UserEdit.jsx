import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';

// Props: users (array), onUpdate (function)
// Hook: useParams() để lấy id từ URL
export default function UserEdit({ users, onUpdate }) {
	const { id } = useParams();
	const navigate = useNavigate();

	const user = users.find((u) => u.id === Number(id));

	if (!user) {
		return (
			<div className='page-container'>
				<div className='not-found'>
					<h3>Không tìm thấy người dùng!</h3>
					<button onClick={() => navigate('/')} className='btn btn-outline'>
						← Quay lại danh sách
					</button>
				</div>
			</div>
		);
	}

	const handleSubmit = (data) => {
		onUpdate(user.id, data);
		navigate('/');
	};

	return (
		<div className='page-container'>
			<div className='page-header'>
				<h2 className='page-title'>Chỉnh sửa người dùng</h2>
				<button onClick={() => navigate(-1)} className='btn btn-outline'>
					← Quay lại
				</button>
			</div>

			<div className='card form-card'>
				{/* Truyền initialData để form điền sẵn dữ liệu */}
				<UserForm initialData={user} onSubmit={handleSubmit} onCancel={() => navigate('/')} />
			</div>
		</div>
	);
}
