import { useParams, Link, useNavigate } from 'react-router-dom';

const roleBadge = {
	admin: 'badge-danger',
	editor: 'badge-warning',
	user: 'badge-success',
};

// Props: users (array)
// Hook: useParams() để lấy id từ URL
export default function UserDetail({ users }) {
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

	return (
		<div className='page-container'>
			<div className='page-header'>
				<h2 className='page-title'>Chi tiết người dùng</h2>
				<button onClick={() => navigate(-1)} className='btn btn-outline'>
					← Quay lại
				</button>
			</div>

			<div className='card detail-card'>
				<div className='detail-avatar'>{user.name.charAt(0).toUpperCase()}</div>

				<table className='detail-table'>
					<tbody>
						<tr>
							<th>Họ và tên</th>
							<td>{user.name}</td>
						</tr>
						<tr>
							<th>Email</th>
							<td>{user.email}</td>
						</tr>
						<tr>
							<th>Số điện thoại</th>
							<td>{user.phone}</td>
						</tr>
						<tr>
							<th>Vai trò</th>
							<td>
								<span className={`badge ${roleBadge[user.role] || 'badge-default'}`}>
									{user.role}
								</span>
							</td>
						</tr>
					</tbody>
				</table>

				<div className='detail-actions'>
					<Link to={`/users/edit/${user.id}`} className='btn btn-warning'>
						Chỉnh sửa
					</Link>
				</div>
			</div>
		</div>
	);
}
