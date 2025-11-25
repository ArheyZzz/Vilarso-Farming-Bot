import { useState, type ChangeEvent } from 'react';
import './FormInput.css';
import { useSetToken } from '../../store/store';

export default function FormInput({
	isFarmActive,
	setIsFarmActive,
}: {
	isFarmActive: boolean;
	setIsFarmActive: (val: boolean) => void;
}) {
	const [value, setValue] = useState('');
	const setToken = useSetToken();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.replace(',', '.');
		setValue(val);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const num = Number(value);
		if (Number.isNaN(num) || num <= 0) return;

		setToken(num);
		setIsFarmActive(true);
	};

	return (
		<form className='form-card' onSubmit={handleSubmit}>
			<h2 className='form-title'>Сколько VILARSO отдаём в неоновый фарм? 💿</h2>

			<div className='form-row'>
				<label className='form-label' htmlFor='input'>
					Количество токенов
				</label>
				<input
					id='input'
					className='token-value-input'
					type='text'
					inputMode='decimal'
					placeholder='Например: 1000000'
					value={value}
					onChange={handleChange}
					disabled={isFarmActive}
				/>
			</div>

			<div className='form-actions'>
				<button
					className='form-submit-btn'
					type='submit'
					disabled={isFarmActive || !value}
				>
					Запустить БОТа
				</button>
			</div>
		</form>
	);
}
