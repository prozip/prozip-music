import { HStack } from '@chakra-ui/react';

import { PlayerControl } from './player-control';

export const PlayerControls = ({ controls }) => {
	return (
		<HStack spacing={4}>
			{controls.map(({ label, icon }) => (
				<PlayerControl key={label} label={label} icon={icon} />
			))}
		</HStack>
	);
};
