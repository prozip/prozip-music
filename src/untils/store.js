import { useDisclosure } from "@chakra-ui/react";
import { createContext, useRef, useState } from "react";
import usePictureInPicture from 'react-use-pip'


export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    //play
    const [isPlay, setPlay] = useState(false)
    const [isOpenPlayer, setOpenPlayer] = useState(false)
    const audioInstance = useRef(null);
    const pipRef = useRef(null);
    const { isPictureInPictureActive, isPictureInPictureAvailable, togglePictureInPicture } = usePictureInPicture(pipRef)
    const {
        isOpen: isMenuOpen,
        onOpen: openMenu,
        onClose: closeMenu
    } = useDisclosure()
    const {
        isOpen: isHotkeysOpen,
        onOpen: openHotkeys,
        onClose: closeHotkeys,
    } = useDisclosure()
    const {
        isOpen: isInfoOpen,
        onOpen: openInfo,
        onClose: closeInfo,
    } = useDisclosure()
    const {
        isOpen: isOpenPlaylist,
        onOpen: openPlaylist,
        onClose: closePlaylist,
    } = useDisclosure()
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
    const [audioLists, setAudioLists] = useState([
        // {
        //     name: 'Despacito',
        //     singer: 'Luis Fonsi',
        //     cover:
        //         'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
        //     musicSrc:
        //         'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3',
        // }
    ])
    const [currentAlbum, setCurrentAlbum] = useState("02-nhac-viet")
    const [albumName, setAlbumName] = useState("Nhạc Việt")

    const store = {
        srcRaw: "/music_collections/src/",
        audio: { audioInstance, isOpenPlayer, setOpenPlayer, isPlay, setPlay },
        audioList: { audioLists, setAudioLists },
        menu: { isMenuOpen, openMenu, closeMenu, cursorPos, setCursorPos },
        modal: {
            info: { isInfoOpen, openInfo, closeInfo },
            hotkeys: { isHotkeysOpen, openHotkeys, closeHotkeys },
        },
        playlistMenu: { isOpenPlaylist, openPlaylist, closePlaylist },
        pip: { pipRef, isPictureInPictureActive, isPictureInPictureAvailable, togglePictureInPicture },
        album: { currentAlbum, setCurrentAlbum, albumName, setAlbumName }
    }
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}
export default StoreProvider

