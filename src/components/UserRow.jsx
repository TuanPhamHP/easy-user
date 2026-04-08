import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';

const roleBadge = {
	admin: 'badge-danger',
	editor: 'badge-warning',
	user: 'badge-success',
};

// Props: user (object), index (number), onDelete (function)
export default function UserRow({ user, index, onDelete }) {
	const [showConfirm, setShowConfirm] = useState(false);

	return (
		<>
			<tr>
				<td>{index}</td>
				<td className='td-name'>{user.name}</td>
				<td>{user.email}</td>
				<td>{user.phone}</td>
				<td>
					<span className={`badge ${roleBadge[user.role] || 'badge-default'}`}>{user.role}</span>
				</td>
				<td>
					<div className='action-btns'>
						<Link to={`/users/${user.id}`} className='btn btn-sm btn-outline'>
							Xem
						</Link>
						<Link to={`/users/edit/${user.id}`} className='btn btn-sm btn-warning'>
							Sửa
						</Link>
						<button onClick={() => setShowConfirm(true)} className='btn btn-sm btn-danger'>
							Xóa
						</button>
					</div>
				</td>
			</tr>

			{showConfirm && (
				<ConfirmDialog
					message={`Bạn có chắc muốn xóa "${user.name}"?`}
					onConfirm={() => onDelete(user.id)}
					onCancel={() => setShowConfirm(false)}
				/>
			)}
		</>
	);
}
