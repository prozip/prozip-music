import { Menu, MenuButton, MenuItem, MenuList, Box, Kbd, Text, Spacer, Icon, MenuDivider, IconButton } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { StoreContext } from "../../untils/store"
import { FaRedo, FaPlay, FaPause, FaRegKeyboard } from 'react-icons/fa'
import { RiPlayListFill } from 'react-icons/ri';

export const ContextMenu = () => {

    const { menu, modal, playlistMenu, audio } = useContext(StoreContext);
    const {isPlay, setPlay, audioInstance} = audio
    const { isMenuOpen, cursorPos } = menu;
    const { openHotkeys } = modal.hotkeys

    const actions = {
        "Reload page": () => window.location.reload(),
        "Hotkeys": () => openHotkeys(),
        // "Open playlist": () => openPlaylist(),
        "Play": () =>{
            console.log(audioInstance.current, isPlay)
            if (isPlay){
                audioInstance.current.pause()
            }else{
                audioInstance.current.play()
            }
        } 
    }

    const RenderMenuItem = ({ text, command, itemIcon }) => {
        return (
            <MenuItem
                // isDisabled={text == "Play" ? true : false} 
                onClick={actions[text]}
            >
                <Icon as={itemIcon} w={3.5} h={3.5}></Icon>
                <Text marginLeft="3">{text == "Play" & isPlay ? "Pause" : text}</Text>
                <Spacer></Spacer>
                <Kbd color="whiteAlpha.600">{command}</Kbd>
            </MenuItem>
        )
    }

    return (

        <Menu isOpen={isMenuOpen}>
            <MenuButton
                as={Box} position="fixed" top={cursorPos.y} left={cursorPos.x}>
            </MenuButton>
            <MenuList>
                <RenderMenuItem itemIcon={FaRedo} text="Reload page" command="F5"></RenderMenuItem>
                <RenderMenuItem itemIcon={isPlay ? FaPause : FaPlay} text="Play" command="Space"></RenderMenuItem>
                <RenderMenuItem itemIcon={RiPlayListFill} text="Open playlist" command="P"></RenderMenuItem>
                <RenderMenuItem itemIcon={FaRegKeyboard} text="Hotkeys" command="S"></RenderMenuItem>
                {/* <MenuDivider></MenuDivider> */}
            </MenuList>
        </Menu>
    )
}