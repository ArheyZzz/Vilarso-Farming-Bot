import './Modal.css';

interface ModalProps {
	isOpen: boolean;
	text: string;
	isFinished: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export default function Modal({
	isOpen,
	text,
	isFinished,
	onClose,
	onConfirm,
}: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className='modal-backdrop'>
			<div className='modal'>
				<h2 className='modal-title'>Подтверждение вывода</h2>

				<div className='modal-body'>
					{text.split('\n').map((line, idx) => (
						<p key={idx}>{line}</p>
					))}
				</div>

				<div className='modal-actions'>
					{!isFinished && (
						<button
							type='button'
							className='modal-btn modal-btn-secondary'
							onClick={onClose}
						>
							Отмена
						</button>
					)}

					<button
						type='button'
						className='modal-btn modal-btn-primary'
						onClick={onConfirm}
					>
						{isFinished ? 'Закрыть' : 'Подтвердить'}
					</button>
				</div>
			</div>
		</div>
	);
}
