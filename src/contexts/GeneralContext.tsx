/* eslint-disable react-hooks/exhaustive-deps */
import { deleteCookie, getCookie } from 'cookies-next';
import React, { useContext, useState, createContext, useEffect } from 'react';
import LoadingPage from '@/pages/components/Loading';
import Notification from '@/pages/components/Notification';
import { getLossValueBase, getValueBase } from '@/lib/api';
import BlockPage from '@/pages/components/Blockpage';
import { useRouter } from 'next/router';
import { StaticImageData } from 'next/image';

interface ContextProps {
	isLoading: boolean;
	setIsLoading: any;
	showAlert: (type: string, message: string) => void;
	gameChoosed: GameProps;
	setGameChoosed: any;
	setAlertbaloonData: any;
	alertBaloonData: any;
	getAnalytics: () => void;
	plan: any;
	analytics: any;
	loss: any;
}

export interface GameProps {
	img: string | StaticImageData;
	img2?: string;
	status?: string;
	name: string;
	route: string;
	botToken: string;
	chatId: string;
}

export const GeneralContext = createContext<ContextProps>({} as ContextProps);

export const GeneralProvider = ({ children }: any) => {
	const router = useRouter();
	const currentUrl = router.asPath;
	const [plan, setPlan] = useState<any>(false);
	const [gameChoosed, setGameChoosed] = useState<GameProps>({
		img: '',
		img2: '',
		name: '',
		route: '',
		botToken: '',
		chatId: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [analytics, setAnalytics] = useState<number>(0);
	const [loss, setLoss] = useState<number>(0);
	const [alertBaloonData, setAlertbaloonData] = useState({
		type: '',
		message: '',
	});

	const closeAlert = (obj?: any) => {
		const data = { ...obj } || { ...alertBaloonData };
		data.opened = false;
		setAlertbaloonData(data);
	};

	const showAlert = (type: string, message: string) => {
		const data = {
			type,
			message,
		};
		setAlertbaloonData(data);
		setTimeout(() => closeAlert(data), 4000);
	};

	async function getAnalytics() {
		try {
			const response = await getValueBase().then((res) => res);
			const lossReponse = await getLossValueBase().then((res) => res);
			setAnalytics(response * 100000);
			setLoss(lossReponse * 40000);
		} catch (error) {
			console.error(error);
			// handle error
		}
	}

	useEffect(() => {
		if (!analytics) {
			getAnalytics();
		}
	}, []);

	return (
		<GeneralContext.Provider
			value={{
				plan,
				getAnalytics,
				analytics,
				loss,
				gameChoosed,
				setGameChoosed,
				isLoading,
				setIsLoading,
				showAlert,
				setAlertbaloonData,
				alertBaloonData,
			}}>
			{alertBaloonData.type !== '' ? (
				<Notification message={alertBaloonData.message} />
			) : null}
			{isLoading ? <LoadingPage /> : null}
			{children}
		</GeneralContext.Provider>
	);
};

export const useGeneral = (): ContextProps => useContext(GeneralContext);
