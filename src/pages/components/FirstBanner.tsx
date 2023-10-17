import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface BannerProps {
	src: any;
	route: string;
}

const FirstBanner = ({ src, route }: BannerProps) => {
	const router = useRouter();
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		router.push(route);
	};
	return (
		<Container onClick={handleClick}>
			<Image alt='' src={src} />
		</Container>
	);
};

export default FirstBanner;

const Container = styled.div`
	width: 100%;
	transition: 0.3s;
	cursor: pointer;
	> img {
		width: 100%;
		border-radius: 12px;
	}
	// Tablet
	@media screen and (min-width: 600px) {
		width: 350px;
	}
	&:hover {
		-webkit-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
		-moz-box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
		box-shadow: 10px 10px 48px -15px rgba(2, 224, 87, 1);
	}
`;
