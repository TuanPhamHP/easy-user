import { Navigate, Outlet } from 'react-router-dom';

// Props: isLoggedIn (boolean) - trạng thái đăng nhập từ App
export default function ProtectedRoute({ isLoggedIn }) {
	if (!isLoggedIn) {
		return <Navigate to='/login' replace />;
	}
	return <Outlet />;
}
