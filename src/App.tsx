import { useEffect, useState } from 'react';
import './App.css';
import { useAddIncome } from './store/store';
import FormInput from './components/FormInput/FormInput';
import EarnInfo from './components/EarnInfo/EarnInfo';
import WithdrawalForm from './components/WithdrawalForm/WithdrawalForm';

function App() {
	const [isFarmActive, setIsFarmActive] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const addIncome = useAddIncome();

	// Прелоадер при загрузке приложения
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	// Таймер фарма
	useEffect(() => {
		if (!isFarmActive) return;

		const interval = setInterval(() => {
			addIncome();
		}, 1000);

		return () => clearInterval(interval);
	}, [isFarmActive, addIncome]);

	// Прелоадер (поверх всего)
	if (isLoading) {
		return (
			<div className='app-root app-root--loading'>
				<div className='preloader'>
					<div className='preloader-orb' />
					<div className='preloader-text'>
						<span className='preloader-line'>Инициализация бота…</span>
						<span className='preloader-line preloader-line-faded'>
							Подключение к VILARSO-матрице
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={`app-root ${isFarmActive ? 'app-root--farm' : ''}`}>
			<div className='matrix-layer' aria-hidden='true' />
			<div className='app-shell'>
				<div className='app-shell-inner'>
					<header className='app-header'>
						<h1 className='app-title'>Долгожданный VILARSO бот</h1>

						<div className='app-badge'>
							<span className='app-badge-dot' />
							<span>
								{isFarmActive
									? 'кибер-матрица активна'
									: 'VILARSO - доходность в реальном времени'}
							</span>
						</div>
					</header>

					{!isFarmActive && (
						<>
							<FormInput
								isFarmActive={isFarmActive}
								setIsFarmActive={setIsFarmActive}
							/>
							<p className='helper-text'>
								Введи количество VILARSO и начни зарабатывать реальные деньги,
								не вставая со стула - всё как ты хотел!
							</p>
						</>
					)}

					{isFarmActive && (
						<div className='farm-card'>
							<EarnInfo />
							<WithdrawalForm setIsFarmActive={setIsFarmActive} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
