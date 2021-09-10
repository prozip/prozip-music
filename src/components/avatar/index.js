import { HStack, Text, Avatar as ChakraAvatar, IconButton, useToast, Tooltip } from '@chakra-ui/react';
import { AiOutlineQuestionCircle, AiFillGithub } from 'react-icons/ai';
import { IoLanguage } from 'react-icons/io5'
import {MdPictureInPictureAlt} from 'react-icons/md'

export const Avatar = () => {
    const toast = useToast()
    return (
        <HStack flexShrink={0}>

            <HStack mr={6} spacing="4">
                <IconButton
                    as={AiFillGithub}
                    size="xs"
                    opacity={0.8}
                    _hover={{
                        opacity: 0.5
                    }}
                    onClick={() => window.open('https://github.com/prozip/prozip-music', '_blank')}
                >
                </IconButton>
                <IconButton
                    as={MdPictureInPictureAlt}
                    size="xs"
                    opacity={0.8}
                    _hover={{
                        opacity: 0.5
                    }}
                    onClick={() => {
                        toast({
                            title: "Not availabe.",
                            description: "This feature will be enabled soon.",
                            status: "info",
                            duration: 3000,
                            isClosable: true,
                        })
                    }}
                >
                </IconButton>
                <IconButton
                    as={AiOutlineQuestionCircle}
                    size="xs"
                    opacity={0.8}
                    _hover={{
                        opacity: 0.5
                    }}
                    onClick={() => {
                        toast({
                            title: "Not availabe.",
                            description: "This feature will be enabled soon.",
                            status: "info",
                            duration: 3000,
                            isClosable: true,
                        })
                    }}
                >
                </IconButton>
            </HStack>
            <ChakraAvatar size='sm' name="Admin" src="https://bit.ly/broken-link" />
            <Text mr={3} pr={4}>Admin</Text>
        </HStack>
    )
};