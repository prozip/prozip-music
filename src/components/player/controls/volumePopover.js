import {
    IconButton,
    Popover, PopoverContent, PopoverTrigger, PopoverBody,
    Slider, SliderFilledTrack, SliderThumb, SliderTrack,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { brandRing } from "../../../untils/brandRing"
import { StoreContext } from "../../../untils/store";
import { FaVolumeMute, FaVolumeDown, FaVolumeOff } from 'react-icons/fa'

export const VolumePopover = ({ label, icon, color }) => {
    const [isOpen, setOpen] = useState(false);
    const [volume, setVolume] = useState(50);
    const [savedVolume, setSavedVolume] = useState(50)
    const [timeoutValue, setTimeoutValue] = useState(null)

    const { play, playlistMenu, modal } = useContext(StoreContext);
    const { setPlay, isPlay } = play
    const {isOpenPlaylist, openPlaylist, closePlaylist} = playlistMenu
    const {isHotkeysOpen, openHotkeys, closeHotkeys} = modal.hotkeys

    const actions = {
        onMouseEnter: () => {
            if (timeoutValue) clearTimeout(timeoutValue)
            setOpen(true)
        },
        onMouseLeave: () => setOpen(false),
    }
    const handleClick = () => {
        if (volume == 0) {
            setVolume(savedVolume)
            play.audioRef.current.volume = savedVolume / 100
        } else {
            setSavedVolume(volume);
            setVolume(0);
            play.audioRef.current.volume = 0
        }
    }

    const handleVolumeChange = (val) => {
        if (val > 100) {
            val = 100;
        } else if (val < 0) {
            val = 0;
        }
        setVolume(val)
        play.audioRef.current.volume = val / 100
    }

    const getIcon = (
        volume == 0 ? <FaVolumeMute /> : volume < 30 ? <FaVolumeOff /> : volume < 70 ? <FaVolumeDown /> : icon
    )

    useEffect(() => {
        console.log('update')
        function onKeyDown(e) {
            console.log(e.keyCode)
            switch (e.keyCode) {
                case 37:
                    play.audioRef.current.currentTime -= 5;
                    break;
                case 38:
                    clearTimeout(timeoutValue)
                    setOpen(true)
                    handleVolumeChange(volume + 5)
                    setTimeoutValue(setTimeout(() => setOpen(false), 2000));
                    break;
                case 39:
                    play.audioRef.current.currentTime += 5;
                    break;
                case 40:
                    clearTimeout(timeoutValue)
                    setOpen(true)
                    handleVolumeChange(volume - 5)
                    setTimeoutValue(setTimeout(() => setOpen(false), 2000));
                    break;
            }
        }
        function onKeyUp(e) {
            e.preventDefault()
            console.log(e.keyCode)
            switch (e.keyCode) {
                case 32: // space bar
                    setPlay(!isPlay)
                    break;
                case 80: //playlist
                    if (isOpenPlaylist){
                        closePlaylist()
                    }else{
                        openPlaylist()
                    }
                    break;
                case 83:
                    console.log(isHotkeysOpen)
                    if (isHotkeysOpen){
                        closeHotkeys()
                    }else{
                        openHotkeys()
                    }

            }
        }
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, [volume, timeoutValue, isPlay, isOpenPlaylist]);

    return (
        <Popover isOpen={isOpen}>
            <PopoverTrigger>
                <IconButton
                    aria-label={label}
                    icon={getIcon}
                    rounded="full"
                    color={color}
                    {...brandRing}
                    {...(actions)}
                    onClick={handleClick}
                />
            </PopoverTrigger>
            <PopoverContent
                w="fit-content"
                borderRadius="3xl"
                paddingTop={1.5}
                bg="gray.light2"
                {...(actions)}
            >
                <PopoverBody>
                    <Slider
                        aria-label="slider-ex-3"
                        defaultValue={50}
                        orientation="vertical"
                        minH="28"
                        onChange={handleVolumeChange}
                        value={volume}
                        focusThumbOnChange={false}
                    >
                        <SliderTrack>
                            <SliderFilledTrack bg="brand.red" />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};