import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";

const Container = styled.div`
	justify-self: center;
	align-self: center;
	text-align: center;

	padding: 1.5rem;
`;

const Header = styled.h1`
	font-size: 36px;

	@media (min-width: 768px) {
		font-size: 48px;
	}

	@media (min-width: 1200px) {
		font-size: 72px;
	}
`;

const Content = styled.p`
	font-size: 18px;
	color: white;

	max-width: 800px;

	@media (min-width: 768px) {
		font-size: 24px;
	}
`;

const Link = styled.a`
	color: #77f;
	text-decoration: none;
	transition: all 0.1s;
	&:hover {
		filter: brightness(1.1);
	}
`;

const Socials = styled.p`
	grid-row: 2;
	justify-self: center;
	align-self: center;
	text-align: center;
`;

const GlobalStyle = createGlobalStyle`
	@keyframes rotate {
		from {
			filter: hue-rotate(0deg);
		}

		to {
			filter: hue-rotate(360deg);
		}
	}

	html,
	body, #__next {
		font-family: 'Poppins', sans-serif;
		color: white;
		width: 100%;
		height: 100%;

		margin: 0;

		background-color:#99c3ff;
		background-image:  
			radial-gradient(circle at 11% 80%, hsla(200,93%,79%,1) 0, transparent 52%),  
			radial-gradient(circle at 38% 22%, hsla(141,71%,70%,1) 0, transparent 55%),  
			radial-gradient(circle at 53% 15%, hsla(137,81%,63%,1) 0, transparent 56%),  
			radial-gradient(circle at 98% 53%, hsla(40,64%,70%,1) 0, transparent 49%),  
			radial-gradient(circle at 83% 78%, hsla(190,84%,75%,1) 0, transparent 59%),  
			radial-gradient(circle at 9% 19%, hsla(300,84%,60%,1) 0, transparent 54%),  
			radial-gradient(circle at 87% 66%, hsla(300,63%,73%,1) 0, transparent 60%);;

		animation: rotate linear infinite 75s;
	}


`;

const Root = styled.div`
	display: grid;
	grid: 70% 30% / auto;
	width: 100%;
	height: 100%;
`;

export default function App() {
	return (
		<Root>
			<Head>
				<title>fur.ink &middot; Coming Soon</title>
			</Head>
			<GlobalStyle />
			<Container>
				<Header>Get yourselves ready...</Header>
				<Content>
					<Link href="https://www.fur.ink/">fur.ink</Link> is a platform for
					artists to post their work, and commission openings. With integrations
					for other social media platforms, fur.ink provides a centralized
					method to distribute commission information.
				</Content>
			</Container>
			<Socials>
				made with 💜 by{" "}
				<Link href="https://twitter.com/SkyezerFox">kaylen</Link>
			</Socials>
		</Root>
	);
}
