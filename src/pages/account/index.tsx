import Navbar from '../components/Navbar';

const Account = () => {
	const router = useRouter();
	const { user } = useUser();

	useEffect(() => {
		console.log(user);
		if (!user) {
			router.push('/login');
		}
	}, [user]);

	return (
		<>
			<Container>
				<Navbar />
				<MainContent>
					<SignalsContainer>
						<Title>
							Email :<div>caicrochask8@gmail.com</div>
						</Title>
						<Title>
							CPF :<div>032.155.634-10</div>
						</Title>
						<Title>
							Plano atual :<div>FREE</div>
						</Title>
					</SignalsContainer>
				</MainContent>
			</Container>
		</>
	);
};

export default Account;

import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '@/assets/styles/colors';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserContext';
const tablet: string = '600px';

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
	gap: 12px;
	// Tablet
	@media screen and (min-width: 600px) {
		width: 350px;
	}
`;

export const Title = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	color: ${colors.green};
	> div {
		padding-bottom: 8px;
		border-bottom: 1px solid ${colors.green};
		color: white;
	}
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
