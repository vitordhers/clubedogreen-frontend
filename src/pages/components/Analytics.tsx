import { colors } from '@/assets/styles/colors';
import { useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import redChart from '../../assets/red-chart.png';
import redArrow from '../../assets/red-arrow.png';
import greenArrow from '../../assets/green-arrow.png';
import greenChart from '../../assets/green-chart.png';
import backgroundImg from '../../assets/background_peoples.png';
import { useGeneral } from '@/contexts/GeneralContext';

const Analytics = () => {
	const { analytics, loss } = useGeneral();

	return (
		<TimerComponent>
			<div style={{ display: 'flex' }}>
				<Detail>Ganhos e perdas do</Detail>
				<div style={{ color: colors.green, paddingLeft: 5 }}>dia!</div>
			</div>
			<Column>
				<Item>
					<div style={{ display: 'flex' }}>
						<Title>Greens</Title>
						<div>
							<Image
								alt=''
								style={{ width: 45, height: 25 }}
								src={greenChart}
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							width: '100%',
							gap: '4px',
							alignItems: 'center',
						}}>
						<div>
							<Image alt='' style={{ width: '8px' }} src={greenArrow} />
						</div>
						<div style={{ color: colors.green }}>
							+ {(100 - (loss / analytics) * 20).toFixed(2)}%
						</div>
						<div>|</div>
						<div style={{ color: colors.white, fontWeight: '200' }}>
							{analytics.toFixed(0)}
						</div>
					</div>
				</Item>
				<Item style={{ width: 24 }}></Item>
				<Item>
					<div style={{ display: 'flex' }}>
						<Title>Loss</Title>
						<div>
							<Image alt='' style={{ width: 45, height: 25 }} src={redChart} />
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							width: '100%',
							gap: '4px',
							alignItems: 'center',
						}}>
						<div>
							<Image alt='' style={{ width: '8px' }} src={redArrow} />
						</div>
						<div style={{ color: 'red' }}>
							- {((loss / analytics) * 20).toFixed(2)}%
						</div>
						<div>|</div>
						<div style={{ color: colors.white, fontWeight: '200' }}>
							{loss.toFixed(0)}
						</div>
					</div>
				</Item>
			</Column>
		</TimerComponent>
	);
};

export default Analytics;

const TimerComponent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	// Tablet
	@media screen and (min-width: 600px) {
		width: 350px;
	}
`;

const Detail = styled.p`
	color: white;
	div-align: center;
	padding-bottom: 5px;
`;

const Title = styled.h1`
	flex: 1;
	font-size: 14px;
	color: white;
	font-weight: 700;
	div-align: left;
`;

const Subtitle = styled.h2`
	color: ${colors.green};
	font-weight: 400;
	div-align: left;
	font-size: 12px;
	padding-left: 5px;
`;

interface ColumnProps {
	imageUrl: string;
}

const Column = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding-top: 12px;
	padding-bottom: 12px;
	border-radius: 12px;
	background-image: url(${backgroundImg.src});
	background-size: cover;
`;

const Item = styled.div`
	width: 40%;
`;

const ChartIcon = styled.div`
	width: 6px;
	height: 14px;
`;

const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export {
	TimerComponent,
	Image,
	Detail,
	Title,
	Subtitle,
	Column,
	Item,
	ChartIcon,
	IconContainer,
};
