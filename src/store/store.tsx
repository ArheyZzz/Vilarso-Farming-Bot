import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
	tokenValue: number;
	money: number;
	incomePerSecond: number;
	setToken: (value: number) => void;
	addIncome: () => void;
	withdrawAndReset: () => void;
}

const useStore = create<StoreState>()(
	persist(
		(set, get) => ({
			tokenValue: 0,
			money: 0,
			incomePerSecond: 0,

			setToken: (value: number) => {
				// 1 000 000 токенов → 10$ в секунду
				const income = (value / 1_000_000) * 10;

				set({
					tokenValue: value,
					incomePerSecond: income,
				});
			},

			addIncome: () => {
				const { money, incomePerSecond } = get();
				set({ money: money + incomePerSecond });
			},

			withdrawAndReset: () => {
				set({
					tokenValue: 0,
					incomePerSecond: 0,
					money: 0,
				});
			},
		}),
		{
			name: 'money-count',
		}
	)
);

export const useTokenValue = () => useStore(state => state.tokenValue);
export const useIncomePerSecond = () =>
	useStore(state => state.incomePerSecond);
export const useMoney = () => useStore(state => state.money);
export const useSetToken = () => useStore(state => state.setToken);
export const useAddIncome = () => useStore(state => state.addIncome);
export const useWithdrawAndReset = () =>
	useStore(state => state.withdrawAndReset);
