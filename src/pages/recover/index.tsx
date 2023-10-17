import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { colors } from '@/assets/styles/colors';
import { useRouter } from 'next/router';

export interface SubLoginProps {
	email: string;
}

const registerProps = {} as SubLoginProps;

const MainLogin = () => {
	const [showPass, setShowPass] = useState<boolean>(false);
	const router = useRouter();
	const { login, user, getRecoveryPassword } = useUser();
	const [errorMessage, setErrorMessage] = useState('');
	const [newUser, setNewUser] = useState<SubLoginProps[]>([registerProps]);

	const onChangeUser = (propname: string, e: string) => {
		const arr = [...newUser];
		const item: any = arr[0];
		item[propname] = e;
		setNewUser(arr);
	};

	useEffect(() => {
		if (user) {
			router.push('/');
		}
	}, [user]);
	//
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
				<Logo onClick={() => router.push('/login')}>
					<Image alt='' src={logo} />
				</Logo>
				<Logo style={{ gap: 24 }}>
					<div
						style={{ fontSize: '2rem', fontWeight: 700, color: colors.green }}>
						Recuperar senha
					</div>
				</Logo>
				<InputContainer>
					<Input
						placeholder='Seu email'
						onChange={(event) => onChangeUser('email', event.target.value)}
						value={newUser[0]?.email}
					/>
				</InputContainer>
				<InputContainer
					style={{
						height: '100%',
						alignItems: 'center',
						justifyContent: 'flex-end',
					}}>
					<Btn_Entrar onClick={() => getRecoveryPassword(newUser[0].email)}>
						Entrar
					</Btn_Entrar>
				</InputContainer>
			</Container>
		</>
	);
};

export default MainLogin;

import styled, { css } from 'styled-components';
import { useUser } from '@/contexts/UserContext';
import Head from 'next/head';
const tablet: string = '600px';

export const Global = styled.div`
	width: 100%;
	height: fit-content;
`;

export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: ${colors.black};
	color: ${colors.textColor};
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5%;
	padding: 24px 8%;
	// Tablet
	@media screen and (min-width: ${tablet}) {
		height: 100vh;
	}
`;

export const Logo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
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

export const InputContainer = styled.div`
	width: 100%;
	display: flex;
	padding: 24px 0;
	flex-direction: column;
	gap: 38px;
	// Tablet
	@media screen and (min-width: ${tablet}) {
		width: 480px;
	}
`;

export const Input = styled.input`
	width: 100%;
	font-size: 0.9rem;
	margin: 0;
	border-radius: 10px;
	border: none;
	padding: 12px 24px;
	background-color: ${colors.white};
	color: black;
	box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.1);
	text-shadow: 0px 0px 12px rgba(255, 255, 255, 0.1);
	::placeholder {
		color: black;
		font-weight: 300;
		font-size: 0.9rem;
		@media (max-width: ${tablet}) and (min-width: 0) {
			font-size: 1rem;
		}
	}
	&:focus {
		outline: none;
	}
`;

export const RecoveryPass = styled.div`
	font-size: 12px;
	color: ${colors.green};
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		opacity: 0.5;
	}
`;

export const Btn_Entrar = styled.div`
	width: 100%;
	color: ${colors.primaryColor};
	background: ${colors.green};
	text-align: center;
	cursor: pointer;
	padding: 12px 0;
	border-radius: 0.5rem;
	transition: 0.3s;
	&:hover {
		color: ${colors.green};
		background: transparent;
		border: 1px solid ${colors.green};
	}
	// Tablet
	@media screen and (min-width: ${tablet}) {
		margin: 20% 0;
	}
`;
