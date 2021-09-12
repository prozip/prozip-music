import { HStack, Text, Avatar as ChakraAvatar, IconButton, useToast, Tooltip } from '@chakra-ui/react';
import { useContext } from 'react';
import { AiOutlineQuestionCircle, AiFillGithub } from 'react-icons/ai';
import { IoLanguage } from 'react-icons/io5'
import {VscDesktopDownload} from 'react-icons/vsc'
import { StoreContext } from '../../untils/store';

export const Avatar = () => {
    const toast = useToast()
    const {modal} = useContext(StoreContext)
    const {openDownload} = modal.download
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
                    as={VscDesktopDownload}
                    size="xs"
                    opacity={0.8}
                    _hover={{
                        opacity: 0.5
                    }}
                    onClick={() => {
                        openDownload()
                        console.log(openDownload)
                        // toast({
                        //     title: "Not availabe.",
                        //     description: "This feature will be enabled soon.",
                        //     status: "info",
                        //     duration: 3000,
                        //     isClosable: true,
                        // })
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
            <ChakraAvatar size='sm' name="Admin"/>
            <Text mr={3} pr={4}>Admin</Text>
        </HStack>
    )
};