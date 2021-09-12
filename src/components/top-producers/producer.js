import { VStack, Text, Box, useBreakpointValue, Image } from '@chakra-ui/react';

export const Producer = ({ name, image, badge }) => {
	const size = useBreakpointValue({ base: '48px', '2xl': '65px' }) ?? '80px';
	return (
		<VStack>
			<Box position="relative">
				<Image
					src={image}
					width={size}
					height={size}
					rounded="lg"
					objectFit="cover"
					alt=""
				/>
				{badge && (
					<Box
						bg="brand.red"
						position="absolute"
						top={-3}
						right={-3}
						rounded="full"
						width={6}
						height={6}
						borderWidth={4}
						borderColor="black"
					/>
				)}
			</Box>
			<Text fontSize="sm" fontWeight="medium">{name}</Text>
		</VStack>
	);
}