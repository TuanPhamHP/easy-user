import { useState } from 'react';

// ─── Cấu trúc cây file ───────────────────────────────────────────────────────
const TREE = [
	{
		name: 'src',
		type: 'dir',
		children: [
			{
				name: 'components',
				type: 'dir',
				children: [
					{ name: 'ConfirmDialog.jsx', type: 'file', ext: 'jsx', cat: 'component' },
					{ name: 'Navbar.jsx', type: 'file', ext: 'jsx', cat: 'component' },
					{ name: 'ProtectedRoute.jsx', type: 'file', ext: 'jsx', cat: 'component' },
					{ name: 'UserForm.jsx', type: 'file', ext: 'jsx', cat: 'component' },
					{ name: 'UserRow.jsx', type: 'file', ext: 'jsx', cat: 'component' },
				],
			},
			{
				name: 'layout',
				type: 'dir',
				children: [
					{ name: 'Default.jsx', type: 'file', ext: 'jsx', cat: 'layout' },
					{ name: 'ProtectedLayout.jsx', type: 'file', ext: 'jsx', cat: 'layout' },
				],
			},
			{
				name: 'pages',
				type: 'dir',
				children: [
					{ name: 'FileTree.jsx', type: 'file', ext: 'jsx', cat: 'page' },
					{ name: 'LayoutDiagram.jsx', type: 'file', ext: 'jsx', cat: 'page' },
					{ name: 'Login.jsx', type: 'file', ext: 'jsx', cat: 'page' },
					{ name: 'UserAdd.jsx', type: 'file', ext: 'jsx', cat: 'page' },
					{ name: 'UserDetail.jsx', type: 'file', ext: 'jsx', cat: 'page' },
					{ name: 'UserEdit.jsx', type: 'file', ext: 'jsx', cat: 'page' },
					{ name: 'UserList.jsx', type: 'file', ext: 'jsx', cat: 'page' },
				],
			},
			{ name: 'App.css', type: 'file', ext: 'css', cat: 'style' },
			{ name: 'App.jsx', type: 'file', ext: 'jsx', cat: 'entry' },
			{ name: 'index.css', type: 'file', ext: 'css', cat: 'style' },
			{ name: 'main.jsx', type: 'file', ext: 'jsx', cat: 'entry' },
		],
	},
	{ name: 'index.html', type: 'file', ext: 'html', cat: 'config' },
	{ name: 'netlify.toml', type: 'file', ext: 'toml', cat: 'config' },
	{ name: 'package.json', type: 'file', ext: 'json', cat: 'config' },
	{ name: 'vite.config.js', type: 'file', ext: 'js', cat: 'config' },
];

// ─── Category config ─────────────────────────────────────────────────────────
const CAT = {
	entry: { label: 'Entry', color: '#34d399', bg: '#ecfdf5', text: '#065f46' },
	page: { label: 'Page', color: '#22d3ee', bg: '#ecfeff', text: '#164e63' },
	layout: { label: 'Layout', color: '#818cf8', bg: '#eef2ff', text: '#3730a3' },
	component: { label: 'Component', color: '#a78bfa', bg: '#f5f3ff', text: '#5b21b6' },
	style: { label: 'Style', color: '#f472b6', bg: '#fdf4ff', text: '#86198f' },
	config: { label: 'Config', color: '#94a3b8', bg: '#f8fafc', text: '#475569' },
};

// ─── File extension → icon char + color ──────────────────────────────────────
const EXT_ICON = {
	jsx: { char: '⚛', color: '#61dafb' },
	css: { char: '◈', color: '#f472b6' },
	js: { char: '▣', color: '#fbbf24' },
	json: { char: '{ }', color: '#94a3b8', small: true },
	toml: { char: '⚙', color: '#94a3b8' },
	html: { char: '◇', color: '#f97316' },
};

// ─── Chi tiết từng file ───────────────────────────────────────────────────────
const FILE_INFO = {
	'src/main.jsx': {
		desc: 'Điểm khởi động của ứng dụng. Render <App /> vào thẻ #root trong index.html và bọc BrowserRouter để kích hoạt routing.',
		contains: [
			'createRoot() — tạo React root gắn vào #root',
			'<StrictMode> — bật chế độ kiểm tra trong lúc develop',
			'<BrowserRouter> — cung cấp router context',
			'<App /> — render toàn bộ ứng dụng',
		],
		imports: ['react-dom/client', 'react-router-dom', './App.jsx', './index.css'],
		usedBy: [],
	},
	'src/App.jsx': {
		desc: 'Component gốc, đóng vai trò State trung tâm. Giữ toàn bộ dữ liệu (users, auth) và cấu hình tất cả Routes.',
		contains: [
			'useState: users[], isLoggedIn, currentUser',
			'Handlers: handleLogin, handleLogout, addUser, updateUser, deleteUser',
			'<Routes> cấu hình toàn bộ routing của app',
		],
		imports: ['react', 'react-router-dom', 'tất cả Pages', 'tất cả Layouts', 'ProtectedRoute'],
		usedBy: ['main.jsx'],
	},
	'src/App.css': {
		desc: 'File CSS chính chứa toàn bộ styling: buttons, badges, navbar, table, forms, modal, diagram.',
		contains: [
			'Reset & base styles',
			'Button variants: primary, outline, danger, warning',
			'Navbar, Card, Table, Badge',
			'Form styles, Modal/Dialog styles',
			'Diagram & FileTree styles',
		],
		imports: [],
		usedBy: ['App.jsx'],
	},
	'src/index.css': {
		desc: 'File CSS cơ bản chỉ reset margin của body. Mọi styling thực tế nằm ở App.css.',
		contains: ['body { margin: 0 }'],
		imports: [],
		usedBy: ['main.jsx'],
	},
	'src/components/ConfirmDialog.jsx': {
		desc: 'Dialog xác nhận tái sử dụng được. Hiện backdrop + modal với nội dung và 2 nút Hủy / Xóa. Đóng khi nhấn Escape hoặc click backdrop.',
		contains: [
			'useEffect — lắng nghe phím Escape',
			'Backdrop overlay (click để đóng)',
			'Nút Hủy → gọi onCancel',
			'Nút Xóa → gọi onConfirm',
		],
		imports: ['react'],
		usedBy: ['UserRow.jsx'],
	},
	'src/components/Navbar.jsx': {
		desc: 'Thanh điều hướng cố định phía trên cho các trang protected. Hiển thị tên user và nút đăng xuất.',
		contains: [
			'useNavigate — điều hướng về /login sau logout',
			'Link đến trang Người dùng, Sơ đồ, Cấu trúc file',
			'Nút Đăng xuất → gọi onLogout() rồi navigate',
		],
		imports: ['react-router-dom'],
		usedBy: ['ProtectedLayout.jsx'],
	},
	'src/components/ProtectedRoute.jsx': {
		desc: 'Route guard bảo vệ các trang cần đăng nhập. Nhận isLoggedIn qua props, redirect về /login nếu chưa xác thực.',
		contains: ['if (!isLoggedIn) → <Navigate to="/login" />', '<Outlet /> nếu đã đăng nhập'],
		imports: ['react-router-dom'],
		usedBy: ['App.jsx'],
	},
	'src/components/UserForm.jsx': {
		desc: 'Form tái sử dụng cho cả thêm mới và chỉnh sửa user. Nhận initialData để điền sẵn khi edit, validate trước khi submit.',
		contains: [
			'useState: form {name, email, phone, role}',
			'useState: errors — lỗi validation',
			'validate() — kiểm tra bắt buộc + định dạng email',
			'handleChange() — cập nhật form & xóa lỗi',
			'Select dropdown cho vai trò',
		],
		imports: ['react'],
		usedBy: ['UserAdd.jsx', 'UserEdit.jsx'],
	},
	'src/components/UserRow.jsx': {
		desc: 'Một hàng trong bảng danh sách user. Chứa state để hiện ConfirmDialog khi nhấn Xóa.',
		contains: [
			'useState: showConfirm — kiểm soát dialog xóa',
			'Badge màu theo vai trò (admin/editor/user)',
			'Link Xem → /users/:id',
			'Link Sửa → /users/edit/:id',
			'Nút Xóa → mở ConfirmDialog',
		],
		imports: ['react', 'react-router-dom', './ConfirmDialog'],
		usedBy: ['UserList.jsx'],
	},
	'src/layout/Default.jsx': {
		desc: 'Layout đơn giản cho các trang công khai (không cần đăng nhập). Chỉ bao bọc và render <Outlet />.',
		contains: ['<Outlet /> — nơi render page con (Login)'],
		imports: ['react-router-dom'],
		usedBy: ['App.jsx'],
	},
	'src/layout/ProtectedLayout.jsx': {
		desc: 'Layout cho các trang cần đăng nhập. Gồm Navbar cố định phía trên và <Outlet /> cho nội dung trang.',
		contains: ['<Navbar /> — truyền currentUser và onLogout', '<Outlet /> — hiển thị page theo URL'],
		imports: ['react-router-dom', './Navbar'],
		usedBy: ['App.jsx'],
	},
	'src/pages/Login.jsx': {
		desc: 'Trang đăng nhập với form controlled. Redirect về / nếu đã đăng nhập. Gọi onLogin() khi submit.',
		contains: [
			'useState: form {username, password}',
			'useState: error',
			'<Navigate to="/" /> nếu isLoggedIn',
			'Form submit → onLogin() → navigate hoặc hiện lỗi',
		],
		imports: ['react', 'react-router-dom'],
		usedBy: ['App.jsx via Default layout'],
	},
	'src/pages/UserList.jsx': {
		desc: 'Trang chính hiển thị danh sách tất cả users dưới dạng bảng. Mỗi hàng là một <UserRow />.',
		contains: [
			'Bảng HTML với thead/tbody',
			'<UserRow /> cho mỗi user trong users[]',
			'Empty state khi danh sách rỗng',
			'Link "+ Thêm người dùng" → /users/add',
		],
		imports: ['react-router-dom', './UserRow'],
		usedBy: ['App.jsx'],
	},
	'src/pages/UserDetail.jsx': {
		desc: 'Trang chi tiết 1 user, tìm user bằng id lấy từ URL qua useParams().',
		contains: [
			'useParams() — lấy :id từ URL',
			'users.find() — tìm user theo id',
			'Card chi tiết: tên, email, SĐT, vai trò',
			'Not found state nếu id không tồn tại',
		],
		imports: ['react-router-dom'],
		usedBy: ['App.jsx'],
	},
	'src/pages/UserAdd.jsx': {
		desc: 'Trang thêm user mới. Render <UserForm /> trống, sau khi submit gọi onAdd() rồi navigate về /.',
		contains: ['useNavigate() — điều hướng sau khi thêm', '<UserForm /> với initialData rỗng'],
		imports: ['react-router-dom', './UserForm'],
		usedBy: ['App.jsx'],
	},
	'src/pages/UserEdit.jsx': {
		desc: 'Trang chỉnh sửa user. Lấy :id từ URL, tìm user tương ứng, render <UserForm /> điền sẵn dữ liệu.',
		contains: [
			'useParams() — lấy :id từ URL',
			'useNavigate() — điều hướng sau khi lưu',
			'<UserForm initialData={user} /> — điền sẵn',
		],
		imports: ['react-router-dom', './UserForm'],
		usedBy: ['App.jsx'],
	},
	'src/pages/LayoutDiagram.jsx': {
		desc: 'Trang sơ đồ hoá cấu trúc layout và routing. Bấm vào khối để xem modal chi tiết (chứa gì, nhận gì, trả ra gì).',
		contains: [
			'useState: selected — khối đang chọn',
			'NODE_DETAILS — dữ liệu mô tả từng component',
			'NODE_FLOWS — map node → flow items liên quan',
			'NodeModal — dialog chi tiết 2 khối',
		],
		imports: ['react'],
		usedBy: ['App.jsx'],
	},
	'src/pages/FileTree.jsx': {
		desc: 'Trang này — hiển thị cây thư mục của project theo dạng interactive tree. Bấm file để xem mô tả.',
		contains: [
			'useState: expandedFolders (Set)',
			'useState: selectedFile (path string)',
			'TreeNode — component đệ quy render cây',
			'FileDetail — panel chi tiết bên phải',
		],
		imports: ['react'],
		usedBy: ['App.jsx'],
	},
	'index.html': {
		desc: 'File HTML gốc duy nhất của app (Single Page Application). Vite inject script bundle vào đây. React mount vào thẻ <div id="root">.',
		contains: ['<div id="root"> — nơi React mount vào', '<script type="module" src="/src/main.jsx"> — entry point'],
		imports: [],
		usedBy: ['Vite build system'],
	},
	'package.json': {
		desc: 'Cấu hình project: tên, dependencies (react, react-router-dom), devDependencies (vite, eslint), và npm scripts.',
		contains: [
			'scripts: dev, build, preview, lint',
			'dependencies: react ^19, react-dom ^19, react-router-dom ^7',
			'devDependencies: vite, @vitejs/plugin-react, eslint',
		],
		imports: [],
		usedBy: ['npm / Netlify build'],
	},
	'netlify.toml': {
		desc: 'Cấu hình deploy lên Netlify. Chỉ định lệnh build, thư mục publish, và redirect rule quan trọng cho SPA routing.',
		contains: [
			'[build] command = "npm run build"',
			'[build] publish = "dist"',
			'[[redirects]] /* → /index.html 200 — bắt buộc cho React Router',
		],
		imports: [],
		usedBy: ['Netlify CI/CD'],
	},
	'vite.config.js': {
		desc: 'Cấu hình Vite build tool. Khai báo plugin React để hỗ trợ JSX transform và Fast Refresh trong lúc dev.',
		contains: ['plugins: [@vitejs/plugin-react]', 'Fast Refresh — hot reload khi lưu file'],
		imports: ['vite', '@vitejs/plugin-react'],
		usedBy: ['Vite'],
	},
};

// ─── TreeNode (recursive) ─────────────────────────────────────────────────────
function TreeNode({ node, path, depth, expanded, selected, onToggle, onSelect }) {
	const fullPath = path ? `${path}/${node.name}` : node.name;
	const isOpen = expanded.has(fullPath);
	const isSelected = selected === fullPath;

	if (node.type === 'dir') {
		return (
			<div>
				<div
					className={`ft-item ft-dir ${isSelected ? 'ft-selected' : ''}`}
					style={{ paddingLeft: depth * 16 + 10 }}
					onClick={() => onToggle(fullPath)}
				>
					<span className={`ft-arrow ${isOpen ? 'ft-arrow-open' : ''}`}>›</span>
					<span className='ft-dir-icon'>{isOpen ? '📂' : '📁'}</span>
					<span className='ft-name ft-name-dir'>{node.name}</span>
				</div>
				{isOpen && (
					<div className='ft-children'>
						{node.children.map(child => (
							<TreeNode
								key={child.name}
								node={child}
								path={fullPath}
								depth={depth + 1}
								expanded={expanded}
								selected={selected}
								onToggle={onToggle}
								onSelect={onSelect}
							/>
						))}
					</div>
				)}
			</div>
		);
	}

	// File node
	const icon = EXT_ICON[node.ext] || { char: '○', color: '#94a3b8' };
	const cat = CAT[node.cat] || CAT.config;
	const hasInfo = !!FILE_INFO[fullPath];

	return (
		<div
			className={`ft-item ft-file ${isSelected ? 'ft-selected' : ''} ${hasInfo ? 'ft-clickable' : ''}`}
			style={{ paddingLeft: depth * 16 + 10 }}
			onClick={() => hasInfo && onSelect(fullPath)}
		>
			<span className={`ft-file-icon ${icon.small ? 'ft-file-icon-sm' : ''}`} style={{ color: icon.color }}>
				{icon.char}
			</span>
			<span className='ft-name'>{node.name}</span>
			<span className='ft-cat-badge' style={{ color: cat.color, backgroundColor: cat.bg }}>
				{cat.label}
			</span>
		</div>
	);
}

// ─── FileDetail panel ─────────────────────────────────────────────────────────
function FileDetail({ path }) {
	if (!path) {
		return (
			<div className='ft-detail-empty'>
				<div className='ft-detail-empty-icon'>📄</div>
				<p>Chọn một file để xem mô tả</p>
			</div>
		);
	}

	const info = FILE_INFO[path];
	const fileName = path.split('/').pop();
	const ext = fileName.split('.').pop();
	const icon = EXT_ICON[ext] || { char: '○', color: '#94a3b8' };

	// Find cat from TREE
	const parts = path.split('/');
	let node = null;
	let nodes = TREE;
	for (const part of parts) {
		node = nodes.find(n => n.name === part);
		if (node?.children) nodes = node.children;
	}
	const cat = node ? CAT[node.cat] || CAT.config : CAT.config;

	if (!info) {
		return (
			<div className='ft-detail-empty'>
				<p style={{ color: '#94a3b8' }}>Không có mô tả cho file này.</p>
			</div>
		);
	}

	return (
		<div className='ft-detail'>
			{/* Header */}
			<div className='ft-detail-hd' style={{ borderTopColor: cat.color }}>
				<span className='ft-detail-icon' style={{ color: icon.color }}>
					{icon.char}
				</span>
				<div>
					<div className='ft-detail-filename'>{fileName}</div>
					<div className='ft-detail-path'>{path}</div>
				</div>
				<span className='ft-cat-badge ft-detail-badge' style={{ color: cat.color, backgroundColor: cat.bg }}>
					{cat.label}
				</span>
			</div>

			{/* Description */}
			<div className='ft-detail-body'>
				<p className='ft-detail-desc'>{info.desc}</p>

				<div className='ft-detail-section'>
					<div className='ft-detail-section-title' style={{ color: '#475569', borderColor: '#e2e8f0' }}>
						📦 Chứa
					</div>
					<ul className='ft-detail-list ft-list-contains'>
						{info.contains.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>

				{info.imports.length > 0 && (
					<div className='ft-detail-section'>
						<div className='ft-detail-section-title' style={{ color: '#4338ca', borderColor: '#c7d2fe' }}>
							⬇️ Import từ
						</div>
						<ul className='ft-detail-list ft-list-imports'>
							{info.imports.map((item, i) => (
								<li key={i}>
									<code>{item}</code>
								</li>
							))}
						</ul>
					</div>
				)}

				{info.usedBy.length > 0 && (
					<div className='ft-detail-section'>
						<div className='ft-detail-section-title' style={{ color: '#15803d', borderColor: '#bbf7d0' }}>
							⬆️ Được dùng bởi
						</div>
						<ul className='ft-detail-list ft-list-usedby'>
							{info.usedBy.map((item, i) => (
								<li key={i}>
									<code>{item}</code>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

// ─── Collect all default-open folders ────────────────────────────────────────
const DEFAULT_EXPANDED = new Set(['src', 'src/components', 'src/layout', 'src/pages']);

// ─── Main page ────────────────────────────────────────────────────────────────
export default function FileTree() {
	const [expanded, setExpanded] = useState(DEFAULT_EXPANDED);
	const [selected, setSelected] = useState(null);

	const toggleFolder = path => {
		setExpanded(prev => {
			const next = new Set(prev);
			next.has(path) ? next.delete(path) : next.add(path);
			return next;
		});
	};

	const selectFile = path => {
		setSelected(prev => (prev === path ? null : path));
	};

	const expandAll = () => {
		const paths = new Set();
		const collect = (nodes, parent) => {
			nodes.forEach(n => {
				if (n.type === 'dir') {
					const p = parent ? `${parent}/${n.name}` : n.name;
					paths.add(p);
					collect(n.children, p);
				}
			});
		};
		collect(TREE, '');
		setExpanded(paths);
	};

	const collapseAll = () => setExpanded(new Set());

	return (
		<div className='page-container'>
			<div className='page-header'>
				<div>
					<h2 className='page-title'>Cấu trúc file</h2>
					<p className='page-subtitle'>Bấm vào file để xem mô tả chi tiết</p>
				</div>
				<div style={{ display: 'flex', gap: 8 }}>
					<button className='btn btn-outline btn-sm' onClick={expandAll}>
						Mở tất cả
					</button>
					<button className='btn btn-outline btn-sm' onClick={collapseAll}>
						Thu gọn
					</button>
				</div>
			</div>

			{/* Legend */}
			<div className='diagram-legend card' style={{ marginBottom: 16 }}>
				{Object.entries(CAT).map(([key, c]) => (
					<span key={key} className='legend-item'>
						<span className='legend-dot' style={{ backgroundColor: c.color, borderRadius: 3 }}></span>
						{c.label}
					</span>
				))}
			</div>

			{/* Split panel */}
			<div className='ft-panel'>
				{/* Left: tree */}
				<div className='ft-tree card'>
					<div className='ft-root-label'>
						<span style={{ marginRight: 6 }}>📦</span>easy-users-reactjs
					</div>
					{TREE.map(node => (
						<TreeNode
							key={node.name}
							node={node}
							path=''
							depth={1}
							expanded={expanded}
							selected={selected}
							onToggle={toggleFolder}
							onSelect={selectFile}
						/>
					))}
				</div>

				{/* Right: detail */}
				<div className='ft-detail-panel card'>
					<FileDetail path={selected} />
				</div>
			</div>
		</div>
	);
}
