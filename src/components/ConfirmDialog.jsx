import { useEffect } from 'react';

// Props: message (string), onConfirm (function), onCancel (function)
export default function ConfirmDialog({ message, onConfirm, onCancel }) {
	useEffect(() => {
		const onKey = (e) => { if (e.key === 'Escape') onCancel(); };
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onCancel]);

	return (
		<div className='confirm-backdrop' onClick={onCancel}>
			<div className='confirm-dialog' onClick={(e) => e.stopPropagation()}>
				<div className='confirm-icon'>!</div>
				<p className='confirm-message'>{message}</p>
				<div className='confirm-actions'>
					<button className='btn btn-outline' onClick={onCancel}>
						Hủy
					</button>
					<button className='btn btn-danger' onClick={onConfirm}>
						Xóa
					</button>
				</div>
			</div>
		</div>
	);
}
