import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { colors } from '@/assets/styles/colors';
import openEye from '../img/eye-open.svg';
import closeEye from '../img/eye-hidden.svg';
import { useRouter } from 'next/router';

export interface RegisterProps {
	name: string;
	email: string;
	password: string;
	cpf: string;
}

const registerProps = {} as RegisterProps;

const MainRegister = () => {
	const [showPass, setShowPass] = useState<boolean>(false);
	const { register, user } = useUser();
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState('');

	const [newUser, setNewUser] = useState<RegisterProps[]>([registerProps]);

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

	return (
		<Container>
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
			<Logo>
				<Image alt='' src={logo} />
			</Logo>
			<Logo style={{ gap: 24 }}>
				<div style={{ fontSize: '2rem', fontWeight: 700, color: colors.green }}>
					Criar conta
				</div>
				<span
					onClick={() => router.push('/login')}
					style={{ color: colors.green }}>
					Ja possui uma conta ? Entrar
				</span>
			</Logo>
			<InputContainer>
				<Input
					placeholder='Seu nome'
					value={newUser[0].name}
					onChange={(event) => onChangeUser('name', event.target.value)}
				/>
				<Input
					placeholder='Seu email'
					value={newUser[0].email}
					onChange={(event) => onChangeUser('email', event.target.value)}
				/>
				<Input
					placeholder='Seu cpf'
					value={cpfFormater(newUser[0].cpf)}
					onChange={(event) => onChangeUser('cpf', event.target.value)}
				/>
				<div
					style={{
						borderRadius: '10px',
						backgroundColor: colors.black50,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Input
						type={showPass ? 'text' : 'password'}
						placeholder='Sua senha'
						value={newUser[0].password}
						onChange={(event) => onChangeUser('password', event.target.value)}
					/>
					<div
						onClick={() => setShowPass(!showPass)}
						style={{ width: 'fit-content', padding: '0 12px ' }}>
						<Image
							alt=''
							src={showPass ? openEye : closeEye}
							style={{ width: '28px' }}
						/>
					</div>
				</div>
			</InputContainer>
			<InputContainer
				style={{
					height: '100%',
					alignItems: 'center',
					justifyContent: 'flex-end',
				}}>
				<Btn_Entrar onClick={() => register(newUser[0])}>
					Criar conta
				</Btn_Entrar>
			</InputContainer>
		</Container>
	);
};

export default MainRegister;

import styled, { css } from 'styled-components';
import { cpfFormater } from '@/lib/cpfFormatter';
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
