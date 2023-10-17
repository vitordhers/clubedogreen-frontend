import { colors } from '@/assets/styles/colors';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface component {
	show: boolean;
}

// Define the keyframe animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Define the spinner component
const Spinner = styled.div`
	display: inline-block;
	width: 40px;
	height: 40px;
	border: 3px solid ${colors.green};
	border-top-color: black;
	border-radius: 50%;
	animation: ${spin} 1s ease-in-out infinite;
`;

// Define the container component
const LoadingContainer = styled.div<component>`
	display: ${(props) => (props.show ? 'flex' : 'none')};
	padding: 0 24px;
	position: absolute;
	z-index: 999;
	background: ${colors.black};
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	gap: 12px;
	font-weight: 600;
	color: ${colors.green};
`;

const Text = styled.div`
	text-align: center;
	font-weight: 300;
	// Tablet
	@media screen and (min-width: 500px) {
		width: 350px;
	}
`;

const Button = styled.div`
	width: 100%;
	padding: 12px 18px;
	text-align: center;
	background: ${colors.green};
	color: ${colors.black};
	border-radius: 12px;
	margin-top: 24px;
	// Tablet
	@media screen and (min-width: 500px) {
		width: 350px;
	}
`;

const BlockPage: React.FC = () => {
	const router = useRouter();
	const currentUrl = router.asPath;

	const requestFullscreen = () => {
		const element = document.documentElement;

		if (element.requestFullscreen) {
			element.requestFullscreen();
		}
	};

	useEffect(() => {
		// requestFullscreen();
		const handleKeyPress = (event: any) => {
			if (event.key === 'Enter') {
				requestFullscreen();
			}
		};

		document.addEventListener('keypress', handleKeyPress);

		return () => {
			document.removeEventListener('keypress', handleKeyPress);
		};
	}, []);

	return (
		<LoadingContainer
			show={currentUrl !== '/plans' && currentUrl !== '/account'}>
			Você excedeu o limite de uso diário
			<Text>
				Faça um upgrade para um de nossos planos e volte a lucrar no mesmo
				instante !!
			</Text>
			<Button onClick={() => router.push('/plans')}>Fazer upgrade</Button>
		</LoadingContainer>
	);
};

export default BlockPage;
