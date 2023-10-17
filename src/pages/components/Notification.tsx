import { colors } from '@/assets/styles/colors';
import { useGeneral } from '@/contexts/GeneralContext';
import { useUser } from '@/contexts/UserContext';
import { useEffect } from 'react';
import styled from 'styled-components';

interface NotificationProps {
	message: string;
}

const Notification = ({ message }: NotificationProps) => {
	const { setAlertbaloonData, alertBaloonData } = useGeneral();
	useEffect(() => {
		if (alertBaloonData.type !== '') {
			setTimeout(
				() =>
					setAlertbaloonData({
						type: '',
						message: '',
					}),
				1000 * 5
			);
		}
	}, []);

	return (
		<Container
			onClick={() =>
				setAlertbaloonData({
					type: '',
					message: '',
				})
			}>
			<Message>{message}</Message>
			<Close>X</Close>
		</Container>
	);
};

export default Notification;

const Container = styled.div`
	border-radius: 12px;
	display: flex;
	background: ${colors.primaryColor};
	width: 350px;
	padding: 12px 24px;
	position: absolute;
	top: 5%;
	left: 50%;
	transform: translate(-50%, -50%);
	// Tablet
	@media screen and (min-width: 600px) {
		left: 200px;
	}
`;

export const Close = styled.div`
	color: white;
	font-weight: 600;
`;

export const Message = styled.div`
	width: 100%;
	color: white;
`;
