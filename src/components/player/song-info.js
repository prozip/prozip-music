import { HStack, VStack, Heading, Text } from '@chakra-ui/react';
import { PlayerControl } from './player-control';
import { BsPipFill } from 'react-icons/bs'

export const SongInfo = () => {
	return (
		<HStack spacing={8}>
			<VStack spacing={2} alignItems="flex-start">
				<Heading size="sm">As broad as daylight</Heading>
				<Text fontSize={14} color="gray.light">Moonlight Walker</Text>
			</VStack>
			<PlayerControl
				label="PIP"
				icon={<BsPipFill />}
			/>
		</HStack>
	)
};
