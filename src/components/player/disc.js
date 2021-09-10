import { animate, motion, useAnimation } from 'framer-motion';
import { Box, Flex } from '@chakra-ui/react';

import { Image } from '../image'

const MotionBox = motion(Box);

export const Disc = () => {

	return (
		<MotionBox
			animate={{rotate: 360}}
			transition= {{
				duration: 3,
				repeat: Infinity,
				type: 'tween',
				ease: 'linear',
			}}
			rounded="full"
			overflow="hidden"
			position="relative"
			maxW={16}
			maxH={16}
			width="full"
			height="full"
		>
			<Image
				width="80px"
				height="80px"
				src="/images/dog-1.jpg"
				objectFit="cover"
				alt=""
			/>
			<Flex
				position="absolute"
				inset={0}
				alignItems="center"
				justifyContent="center"
			>
				<Box
					width={5}
					height={5}
					bg="gray.dark"
					rounded="full"
				/>
			</Flex>
		</MotionBox>
	)
};
