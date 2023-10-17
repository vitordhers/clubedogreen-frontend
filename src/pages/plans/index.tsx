import { colors } from '@/assets/styles/colors';
import Navbar from '../components/Navbar';
import banner from '../../assets/banner-plans.png';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
const tablet: string = '600px';

const Plans = () => {
	return (
		<>
			<Head>
				{/* Add your meta tags here */}
				{/* <link rel='manifest' href='/manifest.json' /> */}
				<meta name='title' content='yes' />
				<title>Clube do green</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover'
				/>
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta
					name='apple-mobile-web-app-status-bar-style'
					content='black-translucent'
				/>
			</Head>
			<Container>
				<Navbar />
				<MainContent>
					<Banner alt='' src={banner} />
					<SignalsContainer>
						<Link
							passHref
							href='https://checkout.perfectpay.com.br/pay/PPU38CLQ4RL'>
							<Title>
								<SubTitle
									style={{
										width: '100%',
										border: 'none',
										backgroundColor: 'transparent',
										color: colors.white,
										fontWeight: 700,
									}}>
									VIP - 1 MÊS
								</SubTitle>
								<SubTitle style={{ width: '150px', textAlign: 'center' }}>
									R$ 37,90
								</SubTitle>
							</Title>
						</Link>
						<Link href='https://checkout.perfectpay.com.br/pay/PPU38CLQ4UP'>
							<Title>
								<SubTitle
									style={{
										width: '100%',
										border: 'none',
										backgroundColor: 'transparent',
										color: colors.white,
										fontWeight: 700,
									}}>
									VIP - 6 MESES
								</SubTitle>
								<SubTitle style={{ width: '150px', textAlign: 'center' }}>
									R$ 197,00
								</SubTitle>
							</Title>
						</Link>
						<Link href='https://checkout.perfectpay.com.br/pay/PPU38CLQ507'>
							<Title onClick={() => console.log('3')}>
								<SubTitle
									style={{
										width: '100%',
										border: 'none',
										backgroundColor: 'transparent',
										color: colors.white,
										fontWeight: 700,
									}}>
									VIP - 12 MESES
								</SubTitle>
								<SubTitle style={{ width: '180px', textAlign: 'center' }}>
									R$ 317,90
								</SubTitle>
							</Title>
						</Link>
					</SignalsContainer>
				</MainContent>
			</Container>
		</>
	);
};

export default Plans;

export const Global = styled.div`
	width: 100%;
	height: fit-content;
`;

export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	color: ${colors.textColor};
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5%;
	padding: 12px 8%;
	// Tablet
	@media screen and (min-width: ${tablet}) {
		padding: 12px 8%;
	}
`;

export const Logo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	> img {
		width: 100px;
	}
	> span {
		transition: 0.3s;
		cursor: pointer;
		&:hover {
			opacity: 0.5;
		}
	}
	// Tablet
	@media screen and (min-width: ${tablet}) {
		width: 100%;
	}
`;

export const MainContent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 24px;
	align-items: center;
	// Tablet
	@media screen and (min-width: ${tablet}) {
		width: 580px;
		height: 100%;
	}
`;

export const SignalsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 24px;
	// Tablet
	@media screen and (min-width: 600px) {
		width: 350px;
	}
`;

export const Title = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	border-radius: 12px;
	background-color: ${colors.primaryColor};
	color: ${colors.green};
	padding: 12px 24px;
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		-webkit-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
		-moz-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
		box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
	}
`;

export const SubTitle = styled.div`
	width: fit-content;
	padding: 6px 18px;
	font-size: 14px;
	color: ${colors.green};
	border-bottom: 0.5px solid ${colors.green};
`;

export const List = styled.div`
	width: 100%;
	padding: 24px 0;
	// Tablet
	@media screen and (min-width: 600px) {
		width: 350px;
	}
`;

export const Icons = styled(Image)`
	border-radius: 12px;
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		-webkit-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
		-moz-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
		box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
	}
`;

export const Banner = styled(Image)`
	width: 100%;
	border-radius: 12px;
	// Tablet
	@media screen and (min-width: 600px) {
		width: 350px;
	}
`;

export const Item = styled.div`
	width: 100%;
	background: ${colors.green};
	color: ${colors.black};
	font-weight: 600;
	text-align: center;
	padding: 12px 24px;
	border-radius: 12px;
	-webkit-box-shadow: 10px 10px 48px -15px rgba(3, 224, 87, 1);
	-moz-box-shadow: 10px 10px 48px -15px rgba(, 224, 87, 1);
	box-shadow: 10px 10px 48px -15px rgba(3, 224, 87, 1);
`;
