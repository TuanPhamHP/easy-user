import { Link } from 'react-router-dom';
import UserRow from '../components/UserRow';

// Props: users (array), onDelete (function)
export default function UserList({ users, onDelete }) {
	return (
		<div className='page-container'>
			<div className='page-header'>
				<div>
					<h2 className='page-title'>Quản lý người dùng</h2>
					<p className='page-subtitle'>Tổng cộng: {users.length} người dùng</p>
				</div>
				<Link to='/users/add' className='btn btn-primary'>
					+ Thêm người dùng
				</Link>
			</div>

			<div className='card'>
				<table className='table'>
					<thead>
						<tr>
							<th>#</th>
							<th>Họ và tên</th>
							<th>Email</th>
							<th>Số điện thoại</th>
							<th>Vai trò</th>
							<th>Thao tác</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<UserRow key={user.id} user={user} index={index + 1} onDelete={onDelete} />
						))}
					</tbody>
				</table>

				{users.length === 0 && (
					<div className='empty-state'>
						<p>Chưa có người dùng nào.</p>
						<Link to='/users/add' className='btn btn-primary'>
							Thêm người dùng đầu tiên
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
