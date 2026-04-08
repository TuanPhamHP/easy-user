import { useState, useEffect } from 'react';

const NODE_FLOWS = {
	browserRouter:  [],
	app:            [0, 1, 2, 3, 4, 5, 6],
	defaultLayout:  [2],
	login:          [2],
	protectedRoute: [0],
	protectedLayout:[1],
	userList:       [3, 5],
	userDetail:     [4],
	userAdd:        [4, 6],
	userEdit:       [4, 6],
};

const FLOWS = [
	{ from: 'App.jsx',          to: 'ProtectedRoute',        prop: 'isLoggedIn' },
	{ from: 'App.jsx',          to: 'ProtectedLayout',       prop: 'currentUser, onLogout' },
	{ from: 'App.jsx',          to: 'Login',                 prop: 'onLogin, isLoggedIn' },
	{ from: 'App.jsx',          to: 'UserList',              prop: 'users[], onDelete' },
	{ from: 'App.jsx',          to: 'UserDetail / UserEdit', prop: 'users[] + useParams(:id)' },
	{ from: 'UserList',         to: 'UserRow',               prop: 'user, index, onDelete' },
	{ from: 'UserAdd/UserEdit', to: 'UserForm',              prop: 'initialData, onSubmit, onCancel' },
];

const NODE_DETAILS = {
	browserRouter: {
		label: 'BrowserRouter', file: 'main.jsx', type: 'browser', path: null,
		icon: 'B', role: 'Browser Entry',
		visualBadges: [],
		contains: [
			'Toàn bộ ứng dụng <App />',
			'History API của trình duyệt',
			'Context cung cấp URL hiện tại cho mọi component con',
		],
		receives: ['Không nhận props từ bên ngoài'],
		returns: [
			'Router context cho tất cả component con',
			'Bao bọc <App /> để kích hoạt hệ thống routing',
		],
	},
	app: {
		label: '<App />', file: 'App.jsx', type: 'app', path: null,
		icon: 'A', role: 'State trung tâm',
		visualBadges: [
			{ cls: 'mnv-badge-state', items: ['users[]', 'isLoggedIn', 'currentUser'] },
			{ cls: 'mnv-badge-fn',    items: ['handleLogin()', 'handleLogout()', 'addUser()', 'updateUser()', 'deleteUser()'] },
		],
		contains: [
			'State: users[], isLoggedIn, currentUser',
			'Handler: handleLogin(), handleLogout()',
			'Handler: addUser(), updateUser(), deleteUser()',
			'<Routes> cấu hình toàn bộ routing',
		],
		receives: ['Không nhận props — đây là component gốc'],
		returns: [
			'Truyền isLoggedIn → <ProtectedRoute />',
			'Truyền currentUser, onLogout → <ProtectedLayout />',
			'Truyền onLogin, isLoggedIn → <Login />',
			'Truyền users[], handlers → các Page components',
		],
	},
	defaultLayout: {
		label: '<Default />', file: 'layout/Default.jsx', type: 'layout', path: null,
		icon: 'L', role: 'Public Layout',
		visualBadges: [],
		contains: ['<Outlet /> — placeholder render page con'],
		receives: ['Không nhận props'],
		returns: [
			'Wrapper đơn giản bao bọc trang công khai',
			'<Outlet /> được thay thế bằng <Login /> khi URL match',
		],
	},
	login: {
		label: '<Login />', file: 'pages/Login.jsx', type: 'page', path: '/login',
		icon: 'P', role: 'Page',
		visualBadges: [
			{ cls: 'mnv-badge-state', items: ['form {}', 'error'] },
			{ cls: 'mnv-badge-prop',  items: ['onLogin', 'isLoggedIn'] },
		],
		contains: [
			'State: form { username, password }',
			'State: error — thông báo lỗi',
			'handleChange() — cập nhật form',
			'handleSubmit() — gọi onLogin(), xử lý kết quả',
		],
		receives: [
			'onLogin(username, password) : boolean',
			'isLoggedIn : boolean',
		],
		returns: [
			'<Navigate to="/" /> nếu isLoggedIn = true',
			'Form HTML với 2 controlled input',
			'Gọi onLogin() khi submit → điều hướng hoặc hiện lỗi',
		],
	},
	protectedRoute: {
		label: '<ProtectedRoute />', file: 'components/ProtectedRoute.jsx', type: 'guard', path: null,
		icon: 'G', role: 'Route Guard',
		visualBadges: [
			{ cls: 'mnv-badge-prop', items: ['isLoggedIn'] },
		],
		contains: [
			'Logic if/else kiểm tra xác thực',
			'<Outlet /> — render route con nếu được phép',
		],
		receives: ['isLoggedIn : boolean'],
		returns: [
			'<Navigate to="/login" /> nếu isLoggedIn = false',
			'<Outlet /> nếu isLoggedIn = true',
		],
	},
	protectedLayout: {
		label: '<ProtectedLayout />', file: 'layout/ProtectedLayout.jsx', type: 'layout', path: null,
		icon: 'L', role: 'Protected Layout',
		visualBadges: [
			{ cls: 'mnv-badge-prop', items: ['currentUser', 'onLogout'] },
		],
		contains: [
			'<Navbar /> — thanh điều hướng + thông tin user',
			'<Outlet /> — vùng nội dung chính',
		],
		receives: [
			'currentUser : object',
			'onLogout : function',
		],
		returns: [
			'Navbar cố định ở trên',
			'<Outlet /> hiển thị page theo URL',
		],
	},
	userList: {
		label: '<UserList />', file: 'pages/UserList.jsx', type: 'page', path: '/',
		icon: 'P', role: 'Page',
		visualBadges: [
			{ cls: 'mnv-badge-prop', items: ['users[]', 'onDelete'] },
		],
		contains: [
			'Bảng HTML danh sách người dùng',
			'<UserRow /> cho mỗi user trong users[]',
			'Link "+ Thêm người dùng" → /users/add',
		],
		receives: [
			'users[] : array',
			'onDelete(id) : function',
		],
		returns: [
			'Bảng với tất cả users (qua <UserRow />)',
			'Truyền user, index, onDelete → mỗi <UserRow />',
			'Empty state nếu users[] rỗng',
		],
	},
	userDetail: {
		label: '<UserDetail />', file: 'pages/UserDetail.jsx', type: 'page', path: '/users/:id',
		icon: 'P', role: 'Page',
		visualBadges: [
			{ cls: 'mnv-badge-prop',  items: ['users[]'] },
			{ cls: 'mnv-badge-hook',  items: ['useParams()'] },
		],
		contains: [
			'useParams() — lấy :id từ URL',
			'users.find() — tìm user theo id',
			'Card hiển thị chi tiết 1 user',
		],
		receives: ['users[] : array'],
		returns: [
			'"Không tìm thấy" nếu id không khớp',
			'Card chi tiết: tên, email, SĐT, vai trò',
			'Link "Chỉnh sửa" → /users/edit/:id',
		],
	},
	userAdd: {
		label: '<UserAdd />', file: 'pages/UserAdd.jsx', type: 'page', path: '/users/add',
		icon: 'P', role: 'Page',
		visualBadges: [
			{ cls: 'mnv-badge-prop', items: ['onAdd'] },
			{ cls: 'mnv-badge-hook', items: ['useNavigate()'] },
		],
		contains: [
			'useNavigate() — điều hướng sau khi thêm',
			'<UserForm /> với initialData rỗng',
		],
		receives: ['onAdd(userData) : function'],
		returns: [
			'<UserForm /> trống để nhập user mới',
			'Sau submit: gọi onAdd() → navigate về /',
		],
	},
	userEdit: {
		label: '<UserEdit />', file: 'pages/UserEdit.jsx', type: 'page', path: '/users/edit/:id',
		icon: 'P', role: 'Page',
		visualBadges: [
			{ cls: 'mnv-badge-prop', items: ['users[]', 'onUpdate'] },
			{ cls: 'mnv-badge-hook', items: ['useParams()', 'useNavigate()'] },
		],
		contains: [
			'useParams() — lấy :id từ URL',
			'useNavigate() — điều hướng sau khi lưu',
			'<UserForm /> với initialData từ user tìm được',
		],
		receives: [
			'users[] : array',
			'onUpdate(id, data) : function',
		],
		returns: [
			'"Không tìm thấy" nếu id không khớp',
			'<UserForm /> điền sẵn dữ liệu user',
			'Sau submit: gọi onUpdate() → navigate về /',
		],
	},
};

// ─── Modal component ────────────────────────────────────────────────────────
function NodeModal({ nodeId, onClose }) {
	const d = NODE_DETAILS[nodeId];

	useEffect(() => {
		const onKey = (e) => { if (e.key === 'Escape') onClose(); };
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onClose]);

	if (!d) return null;

	return (
		<div className='modal-backdrop' onClick={onClose}>
			<div className={`modal-dialog modal-${d.type}`} onClick={(e) => e.stopPropagation()}>

				{/* Header */}
				<div className='modal-hd'>
					<div className='modal-hd-left'>
						<span className={`nd-type-badge nd-badge-${d.type}`}>{d.type}</span>
						<code className='modal-hd-title'>{d.label}</code>
						<span className='modal-hd-file'>{d.file}</span>
					</div>
					<button className='modal-close-btn' onClick={onClose} title='Đóng (Esc)'>✕</button>
				</div>

				{/* Body: 2 blocks */}
				<div className='modal-bd'>

					{/* ── Block 1: Node Visual ── */}
					<div className={`modal-node-visual mnv-${d.type}`}>
						<div className='mnv-icon'>{d.icon}</div>
						<div className='mnv-name'>{d.label}</div>
						<div className='mnv-role'>{d.role}</div>

						{d.path && (
							<div className='mnv-path-pill'>{d.path}</div>
						)}

						{d.visualBadges.map((group, gi) => (
							<div key={gi} className='mnv-badge-group'>
								{group.items.map((item) => (
									<span key={item} className={`mnv-badge ${group.cls}`}>{item}</span>
								))}
							</div>
						))}
					</div>

					{/* ── Block 2: Detail ── */}
					<div className='modal-detail'>
						<div className='mdd-section mdd-contains'>
							<div className='mdd-hd'><span>📦</span> Chứa</div>
							<ul className='mdd-list'>
								{d.contains.map((item, i) => <li key={i}>{item}</li>)}
							</ul>
						</div>
						<div className='mdd-section mdd-receives'>
							<div className='mdd-hd'><span>⬇️</span> Nhận vào (Props)</div>
							<ul className='mdd-list'>
								{d.receives.map((item, i) => <li key={i}>{item}</li>)}
							</ul>
						</div>
						<div className='mdd-section mdd-returns'>
							<div className='mdd-hd'><span>⬆️</span> Trả ra (Return)</div>
							<ul className='mdd-list'>
								{d.returns.map((item, i) => <li key={i}>{item}</li>)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function LayoutDiagram() {
	const [selected, setSelected] = useState(null);

	const toggle = (id) => setSelected(id);

	const nodeClass = (id, base) => {
		const dimmed = selected && selected !== id;
		return `dnode ${base} ${dimmed ? 'dnode-dimmed' : ''}`;
	};

	const flowClass = (i) => {
		if (!selected) return 'flow-item';
		return NODE_FLOWS[selected]?.includes(i) ? 'flow-item flow-item-lit' : 'flow-item flow-item-faded';
	};

	return (
		<div className='page-container'>
			<div className='page-header'>
				<div>
					<h2 className='page-title'>Sơ đồ cấu trúc Layout</h2>
					<p className='page-subtitle'>Bấm vào một khối để xem chi tiết</p>
				</div>
			</div>

			{/* LEGEND */}
			<div className='diagram-legend card'>
				<span className='legend-item'><span className='legend-dot dot-browser'></span>Browser</span>
				<span className='legend-item'><span className='legend-dot dot-app'></span>App (State)</span>
				<span className='legend-item'><span className='legend-dot dot-layout'></span>Layout</span>
				<span className='legend-item'><span className='legend-dot dot-guard'></span>Route Guard</span>
				<span className='legend-item'><span className='legend-dot dot-page'></span>Page</span>
				<span className='legend-item'><span className='legend-dot dot-outlet'></span>&lt;Outlet /&gt;</span>
			</div>

			{/* DIAGRAM */}
			<div className='diagram-wrapper card'>
				<div className='diagram-row diagram-animate' style={{ '--delay': '0ms' }}>
					<div className={nodeClass('browserRouter', 'dnode-browser')} onClick={() => toggle('browserRouter')}>
						<div className='dnode-tag'>main.jsx</div>
						<div className='dnode-title'>BrowserRouter</div>
						<div className='dnode-desc'>Bao bọc toàn bộ app, cung cấp context router</div>
					</div>
				</div>

				<div className='diagram-connector-v'></div>

				<div className='diagram-row diagram-animate' style={{ '--delay': '80ms' }}>
					<div className={nodeClass('app', 'dnode-app')} onClick={() => toggle('app')} style={{ minWidth: 300 }}>
						<div className='dnode-tag'>App.jsx</div>
						<div className='dnode-title'>&lt;App /&gt; — State trung tâm</div>
						<div className='dnode-props'>
							<span className='dprop dprop-state'>users[]</span>
							<span className='dprop dprop-state'>isLoggedIn</span>
							<span className='dprop dprop-state'>currentUser</span>
						</div>
						<div className='dnode-props' style={{ marginTop: 5 }}>
							<span className='dprop dprop-fn'>handleLogin()</span>
							<span className='dprop dprop-fn'>handleLogout()</span>
							<span className='dprop dprop-fn'>addUser()</span>
							<span className='dprop dprop-fn'>updateUser()</span>
							<span className='dprop dprop-fn'>deleteUser()</span>
						</div>
					</div>
				</div>

				<div className='diagram-connector-v'></div>

				<div className='diagram-row diagram-row-branches diagram-animate' style={{ '--delay': '160ms' }}>
					{/* Public branch */}
					<div className='diagram-branch'>
						<div className='branch-label branch-public'>Public</div>
						<div className={nodeClass('defaultLayout', 'dnode-layout')} onClick={() => toggle('defaultLayout')}>
							<div className='dnode-tag'>layout/Default.jsx</div>
							<div className='dnode-title'>&lt;Default /&gt;</div>
							<div className='dnode-desc'>Wrapper đơn giản cho trang công khai</div>
							<div className='dnode-outlet'><span className='outlet-badge'>&lt;Outlet /&gt;</span></div>
						</div>
						<div className='diagram-connector-v'></div>
						<div className={nodeClass('login', 'dnode-page')} onClick={() => toggle('login')}>
							<div className='dnode-tag'>pages/Login.jsx</div>
							<div className='dnode-title'>Login</div>
							<div className='dnode-path'>/login</div>
							<div className='dnode-props'>
								<span className='dprop dprop-in'>onLogin</span>
								<span className='dprop dprop-in'>isLoggedIn</span>
							</div>
						</div>
					</div>

					<div className='branch-divider'></div>

					{/* Protected branch */}
					<div className='diagram-branch'>
						<div className='branch-label branch-protected'>Protected</div>
						<div className={nodeClass('protectedRoute', 'dnode-guard')} onClick={() => toggle('protectedRoute')}>
							<div className='dnode-tag'>components/ProtectedRoute.jsx</div>
							<div className='dnode-title'>&lt;ProtectedRoute /&gt;</div>
							<div className='dnode-desc'>
								Kiểm tra <code>isLoggedIn</code><br />
								<span className='guard-false'>false</span> → redirect <code>/login</code><br />
								<span className='guard-true'>true</span> → render <span className='outlet-badge'>&lt;Outlet /&gt;</span>
							</div>
							<div className='dnode-props'>
								<span className='dprop dprop-in'>isLoggedIn</span>
							</div>
						</div>
						<div className='diagram-connector-v'></div>
						<div className={nodeClass('protectedLayout', 'dnode-layout')} onClick={() => toggle('protectedLayout')}>
							<div className='dnode-tag'>layout/ProtectedLayout.jsx</div>
							<div className='dnode-title'>&lt;ProtectedLayout /&gt;</div>
							<div className='dnode-desc'>Chứa Navbar + vùng nội dung chính</div>
							<div className='dnode-props'>
								<span className='dprop dprop-in'>currentUser</span>
								<span className='dprop dprop-in'>onLogout</span>
							</div>
							<div className='dnode-outlet'><span className='outlet-badge'>&lt;Outlet /&gt;</span></div>
						</div>
						<div className='diagram-connector-v'></div>
						<div className='diagram-pages-row'>
							{[
								{ id: 'userList',   tag: 'UserList.jsx',   title: 'UserList',   path: '/',              props: [['dprop-in','users[]'],['dprop-in','onDelete']] },
								{ id: 'userDetail', tag: 'UserDetail.jsx', title: 'UserDetail', path: '/users/:id',      props: [['dprop-in','users[]'],['dprop-hook','useParams()']] },
								{ id: 'userAdd',    tag: 'UserAdd.jsx',    title: 'UserAdd',    path: '/users/add',      props: [['dprop-in','onAdd']] },
								{ id: 'userEdit',   tag: 'UserEdit.jsx',   title: 'UserEdit',   path: '/users/edit/:id', props: [['dprop-in','users[]'],['dprop-in','onUpdate'],['dprop-hook','useParams()']] },
							].map(({ id, tag, title, path, props }) => (
								<div key={id} className={nodeClass(id, 'dnode-page')} onClick={() => toggle(id)}>
									<div className='dnode-tag'>pages/{tag}</div>
									<div className='dnode-title'>{title}</div>
									<div className='dnode-path'>{path}</div>
									<div className='dnode-props'>
										{props.map(([cls, label]) => (
											<span key={label} className={`dprop ${cls}`}>{label}</span>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* PROPS FLOW */}
			<div className='card diagram-animate' style={{ padding: 24, marginTop: 16, '--delay': '240ms' }}>
				<h3 className='section-title'>
					Luồng dữ liệu (Props Flow)
					{selected && <span className='flow-hint'>— đang lọc theo khối được chọn</span>}
				</h3>
				<div className='flow-list'>
					{FLOWS.map((f, i) => (
						<div key={i} className={flowClass(i)}>
							<span className='flow-from'>{f.from}</span>
							<span className='flow-arrow'>→</span>
							<span className='flow-to'>{f.to}</span>
							<span className='flow-prop'>{f.prop}</span>
						</div>
					))}
				</div>
			</div>

			{/* MODAL */}
			{selected && <NodeModal key={selected} nodeId={selected} onClose={() => setSelected(null)} />}
		</div>
	);
}
