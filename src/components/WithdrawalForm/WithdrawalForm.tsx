import { useState } from 'react';
import { useWithdrawAndReset, useMoney } from '../../store/store';
import Modal from '../Modal/Modal';
import { jokes, finalMessage } from './jokes';
import './WithdrawalForm.css';

export default function WithdrawalForm({
	setIsFarmActive,
}: {
	setIsFarmActive: (val: boolean) => void;
}) {
	const [isValid, setIsValid] = useState(false);
	const [wallet, setWallet] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [jokeIndex, setJokeIndex] = useState(0);
	const [isFinished, setIsFinished] = useState(false);
	const [withdrawalValue, setWithdrawalValue] = useState('0');

	const withdrawAndReset = useWithdrawAndReset();
	const money = useMoney();

	const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.trim();
		setWallet(val);
		setIsValid(val.length >= 10);
	};

	const handleOpenModal = (e: React.FormEvent) => {
		e.preventDefault();
		if (!isValid) return;

		setJokeIndex(0);
		setIsFinished(false);
		setIsModalOpen(true);
		setWithdrawalValue(money.toFixed(2));
	};

	const handleConfirm = () => {
		if (!isFinished && jokeIndex < jokes.length - 1) {
			setJokeIndex(prev => prev + 1);
			return;
		}

		if (!isFinished && jokeIndex === jokes.length - 1) {
			setIsFinished(true);
			return;
		}

		if (isFinished) {
			withdrawAndReset();
			setIsFarmActive(false);

			setIsModalOpen(false);
		}
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};

	const currentText = isFinished
		? `${finalMessage}\n\nКошелёк: ${wallet}\nСумма вывода: ${withdrawalValue}$`
		: jokes[jokeIndex];

	return (
		<div className='withdrawal-wrapper'>
			<label className='withdrawal-label' htmlFor='imp'>
				TON-кошелёк для вывода
			</label>
			<input
				type='text'
				id='imp'
				className='withdrawal-input'
				placeholder='Например: UQ...'
				onChange={handleWalletChange}
				value={wallet}
			/>

			<form onSubmit={handleOpenModal} className='withdrawal-actions'>
				<button className='get-money' type='submit' disabled={!isValid}>
					забрать БАБЛО!
				</button>
			</form>

			<Modal
				isOpen={isModalOpen}
				text={currentText}
				isFinished={isFinished}
				onClose={handleClose}
				onConfirm={handleConfirm}
			/>
		</div>
	);
}
