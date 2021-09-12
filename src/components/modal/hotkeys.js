import { useDisclosure, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Lorem, ModalFooter, Button, VStack, Text, HStack, Spacer, Divider, Heading } from '@chakra-ui/react'
import { useContext } from 'react'
import { StoreContext } from '../../untils/store'
import { Kbd } from "@chakra-ui/react"


import { useRef } from 'react'

export const HotkeysModal = () => {

	const { modal } = useContext(StoreContext);
	const { isHotkeysOpen, closeHotkeys } = modal.hotkeys
	const tmpFocusRef = useRef()


	return (
		<Modal
			isOpen={isHotkeysOpen} onClose={closeHotkeys}
			initialFocusRef={tmpFocusRef}
			closeOnEsc={true}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Keyboard shortcuts - COMING SOON</ModalHeader>
				<ModalCloseButton autoFocus={false} />
				<ModalBody>
					<VStack>
						<Heading size="md" mb={2}>Core Actions</Heading>
						<Stack direction="row" h="90px" w="100%" mt={4}>
							<VStack w="100%">
								<Text>Open Playlist</Text>
								<Text>Show/Hide this</Text>
								<Text>Reload page</Text>
							</VStack>
							<Divider orientation="vertical" />
							<VStack w="100%">
								<Text><Kbd>p</Kbd></Text>
								<Text><Kbd>s</Kbd></Text>
								<Text><Kbd>F5</Kbd></Text>
							</VStack>
						</Stack>
						<Heading size="md" pt="10" mb={4}>Player Actions</Heading>
						<Stack direction="row" h="120px" w="100%" mt={4}>
							<VStack w="100%">
								<Text>Play/Pause</Text>
								<Text>Forward/Back 5 sec</Text>
								<Text>Next/Previous song</Text>
								<Text>Increase/Decrease volume</Text>
							</VStack>
							<Divider orientation="vertical" />
							<VStack w="100%">
								<Text><Kbd>Space</Kbd></Text>
								<Text>
									<Kbd>←</Kbd> <Kbd>→</Kbd>
								</Text>
								<Text>Coming soon</Text>
								<Text>
									<Kbd>↑</Kbd> <Kbd>↓</Kbd>
								</Text>
							</VStack>
						</Stack>
					</VStack>
					<Button ref={tmpFocusRef} opacity={0}>temp btn</Button>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={closeHotkeys}>
						Close
					</Button>
					<Button>Action</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}