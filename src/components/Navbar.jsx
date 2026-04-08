import { Link, useNavigate } from 'react-router-dom';

// Props: currentUser (object), onLogout (function)
export default function Navbar({ currentUser, onLogout }) {
	const navigate = useNavigate();

	const handleLogout = () => {
		onLogout();
		navigate('/login');
	};

	return (
		<nav className='navbar'>
			<div className='navbar-brand'>
				<Link to='/'>Easy-User</Link>
			</div>
			<div className='navbar-menu'>
				<Link to='/'>Người dùng</Link>
				<Link to='/diagram'>Sơ đồ</Link>
			</div>
			<div className='navbar-user'>
				<span className='navbar-username'>Xin chào, {currentUser?.name}</span>
				<button onClick={handleLogout} className='btn btn-outline-white'>
					Đăng xuất
				</button>
			</div>
		</nav>
	);
}
