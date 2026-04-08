import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ProtectedLayout({ currentUser, onLogout }) {
	return (
		<div className='protected-layout'>
			<Navbar currentUser={currentUser} onLogout={onLogout} />
			<main className='main-content'>
				<Outlet />
			</main>
		</div>
	);
}
