import { colors } from '@/assets/styles/colors';
import styled from 'styled-components';
import TimerIcon from '../../assets/timer.png';
import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';
import { useGeneral } from '@/contexts/GeneralContext';
import { useTimer } from '@/contexts/TimerContext';
import { useEffect, useState } from 'react';

const TimerV2 = () => {
	const { time, limit, setTime, isRunning } = useTimer();

	return (
		<Container>
			<Image style={{ width: 18, height: 18 }} src={TimerIcon} alt='' />
		</Container>
	);
};

export default TimerV2;

const Container = styled.div`
	padding: 4px 8px;
	display: flex;
	gap: 12px;
	align-items: center;
`;
