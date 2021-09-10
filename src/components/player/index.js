import { Box, Container, HStack } from "@chakra-ui/layout"
import { Slide } from "@chakra-ui/react";
import { useContext } from "react";
import { FaStepBackward, FaStepForward, FaPlay, FaVolumeUp, FaPause } from 'react-icons/fa';
import { FiRepeat } from 'react-icons/fi';
import { RiPlayListFill } from 'react-icons/ri';
import {VscThreeBars} from 'react-icons/vsc'
import { StoreContext } from "../../untils/store";

import { Disc } from "./disc"
import { PlayerControls } from "./player-controls"
import { PlayerProgress } from "./player-progress"
import { SongInfo } from "./song-info"


export const Player = () => {
	const { play } = useContext(StoreContext)
	const { isPlay, isOpen } = play

	
	return (
		<Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
			<Box
				width="full"
				bg="gray.dark"
				height={{ base: 20, '2xl': 20 }}
				flexShrink={0}
			>
				<Container centerContent height="full" maxW="7xl">
					<HStack width="full" height="full" justifyContent="flex-start" spacing={12}>
						<Disc />
						<SongInfo />
						<PlayerControls
							controls={[
								{ label: 'Previous', icon: <FaStepBackward /> },
								{ label: 'Play', icon: isPlay ? <FaPause /> : <FaPlay /> },
								{ label: 'Next', icon: <FaStepForward /> },
							]}
						/>
						<PlayerProgress />
						<PlayerControls
							controls={[
								{ label: 'Control volume', icon: <FaVolumeUp /> },
								{ label: 'Enable repeat', icon: <FiRepeat /> },
								{ label: 'Playlist', icon: <RiPlayListFill /> },
								{ label: 'More options', icon: <VscThreeBars /> },
							]}
						/>
					</HStack>
				</Container>
			</Box>
		</Slide>
	)
}