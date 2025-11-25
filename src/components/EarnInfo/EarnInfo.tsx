import { useIncomePerSecond, useMoney, useTokenValue } from '../../store/store';
import './EarnInfo.css';

export default function EarnInfo() {
	const money = useMoney();
	const tokenValue = useTokenValue();
	const incomePerSecond = useIncomePerSecond();

	const incomePerHour = incomePerSecond * 3600;

	return (
		<div className='earn-card'>
			<div className='earn-header'>
				<h2 className='earn-title'>Неоновый фарм активен ⚡</h2>
				<div className='earn-chip'>бот крутит циферки</div>
			</div>

			<div className='earn-grid'>
				<div className='earn-item'>
					<div className='earn-label'>VILARSO в работе</div>
					<div className='earn-value'>{tokenValue.toLocaleString('ru-RU')}</div>
				</div>

				<div className='earn-item'>
					<div className='earn-label'>Доход, $ / час</div>
					<div className='earn-value earn-value-accent'>
						{incomePerHour.toFixed(2)}$
					</div>
				</div>

				<div className='earn-item'>
					<div className='earn-label'>Намайнено БАБЛА</div>
					<div className='earn-value'>{money.toFixed(2)}$</div>
				</div>
			</div>

			<p className='earn-footer'>
				Когда надоест наблюдать за графой “намайнено” — снизу можно забрать
				БАБЛО на TON-кошелёк.
			</p>
		</div>
	);
}
