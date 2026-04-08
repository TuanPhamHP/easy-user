import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Default from './layout/Default';
import ProtectedLayout from './layout/ProtectedLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import UserAdd from './pages/UserAdd';
import UserEdit from './pages/UserEdit';
import LayoutDiagram from './pages/LayoutDiagram';
import './App.css';

const initialUsers = [
	{ id: 1, name: 'Nguyễn Văn An', email: 'an@gmail.com', phone: '0901234567', role: 'admin' },
	{ id: 2, name: 'Trần Thị Bình', email: 'binh@gmail.com', phone: '0912345678', role: 'user' },
	{ id: 3, name: 'Lê Văn Cường', email: 'cuong@gmail.com', phone: '0923456789', role: 'user' },
	{ id: 4, name: 'Phạm Thị Dung', email: 'dung@gmail.com', phone: '0934567890', role: 'editor' },
	{ id: 5, name: 'Hoàng Văn Em', email: 'em@gmail.com', phone: '0945678901', role: 'user' },
];

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [users, setUsers] = useState(initialUsers);

	const handleLogin = (username, password) => {
		if (username === 'admin' && password === '123456') {
			setIsLoggedIn(true);
			setCurrentUser({ name: 'Admin', username: 'admin' });
			return true;
		}
		return false;
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setCurrentUser(null);
	};

	const addUser = (userData) => {
		const newUser = { ...userData, id: Date.now() };
		setUsers([...users, newUser]);
	};

	const updateUser = (id, userData) => {
		setUsers(users.map((u) => (u.id === id ? { ...u, ...userData } : u)));
	};

	const deleteUser = (id) => {
		setUsers(users.filter((u) => u.id !== id));
	};

	return (
		<Routes>
			<Route element={<Default />}>
				<Route path='/login' element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
			</Route>
			<Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
				<Route element={<ProtectedLayout currentUser={currentUser} onLogout={handleLogout} />}>
					<Route index element={<UserList users={users} onDelete={deleteUser} />} />
					<Route path='/users/add' element={<UserAdd onAdd={addUser} />} />
					<Route path='/users/edit/:id' element={<UserEdit users={users} onUpdate={updateUser} />} />
					<Route path='/users/:id' element={<UserDetail users={users} />} />
					<Route path='/diagram' element={<LayoutDiagram />} />
				</Route>
			</Route>
			<Route path='*' element={<Navigate to={isLoggedIn ? '/' : '/login'} replace />} />
		</Routes>
	);
}

export default App;
