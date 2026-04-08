import { Outlet } from 'react-router-dom';

export default function Default() {
	return (
		<div className='default-layout'>
			<Outlet />
		</div>
	);
}
