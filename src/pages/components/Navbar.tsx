import logo from '../../assets/logo.png';
import openIcon from '../../assets/arrow-down.png';
import closeIcon from '../../assets/arrow-up.png';
import Image from 'next/image';
import Timer from './timer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const tablet: string = '600px';

const Navbar = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const router = useRouter();
	const { user } = useUser();
	const { logout } = useUser();

	const handleToggleDropdown = () => {
		setOpen(!open);
	};

	useEffect(() => {
		if (user) {
			setIsLogged(true);
		}
	}, [user]);

	return (
		<Container>
			<SubContainer>
				<div>
					{/*user && JSON.parse(`${user}`).Plantype !== 'FREE' ? null : <Timer/>*/}
				</div>
				<div>
					<Image
						onClick={() => router.push('/')}
						style={{ width: 64 }}
						src={logo}
						alt=''
					/>
				</div>
				<div style={{ justifyContent: 'flex-end' }}>
					<DropdownWrapper>
						<Image
							onClick={() => handleToggleDropdown()}
							style={{ width: 18, height: 18 }}
							src={!open ? openIcon : closeIcon}
							alt=''
						/>
						{isLogged ? (
							<DropdownContent isOpen={open}>
								{/* <div onClick={() => router.push('/account')}>Minha conta</div>*/}
								<div onClick={() => router.push('/plans')}>Planos</div>
								<div onClick={() => logout()}>Sair</div>
							</DropdownContent>
						) : (
							<DropdownContent isOpen={open}>
								<div onClick={() => router.push('/login')}>Entrar</div>
							</DropdownContent>
						)}
					</DropdownWrapper>
				</div>
			</SubContainer>
		</Container>
	);
};

export default Navbar;

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	// Tablet
	@media screen and (min-width: ${tablet}) {
		width: 350px;
	}
`;

const Container2 = styled.div`
	width: 50%;
	background: ${colors.black};
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
`;

const SubContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 1fr;
	grid-column-gap: 24px;
	> div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	// Tablet
	@media screen and (min-width: ${tablet}) {
		width: 480px;
	}
`;

import React from 'react';
import { colors } from '@/assets/styles/colors';
import styled, { keyframes } from 'styled-components';
import { useUser } from '@/contexts/UserContext';
import TimerV2 from './timerV2';

interface thisProps {
	isOpen: boolean;
}

const DropdownAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DropdownWrapper = styled.div`
	position: relative;
`;

export const DropdownButton = styled.button`
	background-color: #ffffff;
	border: 1px solid #cccccc;
	border-radius: 4px;
	color: #333333;
	cursor: pointer;
	font-size: 16px;
	padding: 8px 16px;
`;

export const DropdownContent = styled.div<thisProps>`
	animation: ${DropdownAnimation} 0.3s ease-in-out;
	background-color: ${colors.black};
	border-left: 1px solid ${colors.green};
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
	margin-top: 8px;
	position: absolute;
	top: 100%;
	width: fit-content;
	font-size: 14px;
	z-index: 1;

	& > * {
		padding: 8px 16px;
	}
`;
