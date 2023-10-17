import { colors } from '@/assets/styles/colors';
import styled from 'styled-components';
import TimerIcon from '../../assets/timer.png';
import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';

const Timer = () => {
	const { state } = useUser();
	return (
		<Container>
			<Image style={{ width: 18, height: 18 }} src={TimerIcon} alt='' />
			{state.minutes}:{state.seconds}
		</Container>
	);
};

export default Timer;

const Container = styled.div`
	padding: 4px 8px;
	display: flex;
	gap: 12px;
	align-items: center;
`;
