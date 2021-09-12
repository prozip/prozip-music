import { Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Lorem, ModalFooter, Button, VStack, Text, HStack, Spacer, Divider, Heading } from '@chakra-ui/react'
import { useContext } from 'react'
import { StoreContext } from '../../untils/store'


import { useRef } from 'react'

export const DownloadModal = () => {

	const { modal } = useContext(StoreContext);
	const { isDownloadOpen, closeDownload } = modal.download
	const tmpFocusRef = useRef()


	return (
		<Modal
			isOpen={isDownloadOpen} onClose={closeDownload}
			initialFocusRef={tmpFocusRef}
			closeOnEsc={true}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Keyboard shortcuts - COMING SOON</ModalHeader>
				<ModalCloseButton autoFocus={false} />
				<ModalBody>
					<Button ref={tmpFocusRef} opacity={0}>temp btn</Button>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={closeDownload}>
						Close
					</Button>
					<Button>Action</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}