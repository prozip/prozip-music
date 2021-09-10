import { VStack } from '@chakra-ui/react';

import { Content } from '../src/components/content';

import dynamic from 'next/dynamic';
import { ContextMenu } from '../src/components/contextMenu';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../src/untils/store';
import { AppModal } from '../src/components/modal';

const JinkePlayerNoSSR = dynamic(
	() => import('../src/components/jinke-player').then((mod) => mod.JinkePlayer),
	{ ssr: false }
)

const IndexPage = () => {

	const { menu } = useContext(StoreContext);
	const { openMenu, closeMenu, setCursorPos } = menu

	const handleContextClick = (e) => {
		if (e.button == 2) {
			e.preventDefault()
			setCursorPos({ x: e.clientX, y: e.clientY })
			openMenu()
		} else {
			closeMenu()
		}
	}

	return (
		<VStack
			height="100vh"
			bg="background.dark"
			width="full"
			overflow="hidden"
			spacing={0}
			onContextMenu={handleContextClick}
			onClick={() => closeMenu()}
		>
			<Content />
			{/* <PlayerNoSSR /> */}
			<JinkePlayerNoSSR />
			<ContextMenu />
			<AppModal />
		</VStack>
	);
};

export default IndexPage;