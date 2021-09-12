import { useContext } from 'react'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import { StoreContext } from '../../untils/store';
import router, { useRouter } from 'next/router'
import { CgInpicture } from 'react-icons/cg'
import { BsPipFill } from 'react-icons/bs'

import { FaStepBackward, FaStepForward, FaPlay, FaVolumeUp, FaPause } from 'react-icons/fa';

import { PlayerControls } from '../player/player-controls';
import { HStack } from '@chakra-ui/react';

export const JinkePlayer = () => {
    const { audioList, audio, album, pip } = useContext(StoreContext)
    const { pipRef, isPictureInPictureActive, isPictureInPictureAvailable, togglePictureInPicture } = pip
    const { audioInstance, isOpenPlayer, setOpenPlayer, isPlay, setPlay } = audio
    const { audioLists, setAudioLists } = audioList
    const { currentAlbum } = album


    const handleModeChange = (mode) => {
        if (mode == "mini") {
            setOpenPlayer(false)
        } else {
            setOpenPlayer(true)
        }
    }

    const handlePlayIndexChange = (playIndex) => {
        router.push({
            pathname: "/",
            query: {
                album: currentAlbum,
            }
        }, undefined,
            { shallow: true }
        )
    }

    const handlePlayClick = () =>{
        setPlay(true)
        if (isPictureInPictureActive) {
            pipRef.current.play()
        }
    }

    const handlePauseClick = () =>{
        setPlay(false)
        if (isPictureInPictureActive) {
            pipRef.current.pause()
        }
    }

    return (
        <>
            <ReactJkMusicPlayer
                getAudioInstance={(instance) => {
                    audioInstance.current = instance
                }}
                showMediaSession
                showMiniProcessBar={true}
                audioLists={audioLists}
                spaceBar={true}
                defaultVolume={0.7}
                onModeChange={handleModeChange}
                onPlayIndexChange={handlePlayIndexChange}
                onAudioPlay={handlePlayClick}
                onAudioPause={handlePauseClick}
                onAudioAbort={() => setAudioLists([])}
                defaultPosition={{
                    top: "80vh",
                    left: "91vw"
                }}
                showLyric={false}
                showThemeSwitch={false}
                showReload={false}
                showPlay={false}
                showDownload={false}
                extendsContent={
                    <HStack
                        paddingLeft="28"
                        width="full" height="full" justifyContent="flex-start" spacing={12}>
                        <PlayerControls
                            controls={[
                                { label: 'Previous', icon: <FaStepBackward /> },
                                { label: 'Play', icon: isPlay ? <FaPause /> : <FaPlay /> },
                                { label: 'Next', icon: <FaStepForward /> },
                            ]}
                        />
                        <PlayerControls
                            controls={[
                                { label: 'PIP', icon: <BsPipFill /> },
                            ]}
                        />
                    </HStack>
                }
            />
            <video
                ref={pipRef}
                id="pip_video"
                style={{ display: 'none' }}
                preload="auto"
                controls loop muted
                tabIndex="0"
                onPause={() => setPlay(false)}
                onPlay={() => setPlay(true)}
            >
                <source src="/pip_video.mp4"></source>
                <source src="/pip_video.mp4"></source>
                <source src="/pip_video.mp4"></source>
            </video>
        </>
    )
}