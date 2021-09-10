import {
	HStack, Text, Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb, Box
} from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../untils/store';
import { timeConvert } from '../../untils/function';
export const PlayerProgress = () => {

	const { play, audioList, pip } = useContext(StoreContext)
	const { isPlay, setPlay, audioRef, currentSong, setCurrentSong } = play
	const { playList } = audioList
	const { pipRef, isPictureInPictureActive, isPictureInPictureAvailable, togglePictureInPicture } = pip

	const [isMouseEnter, setMouseEnter] = useState(false)
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [isChanging, setChanging] = useState(false);

	const handleEndChange = (percent) => {
		console.log('end ' + percent)
		setCurrentTime(duration * percent / 100)
	}

	// handle play click
	useEffect(() => {
		console.log('current play: ', isPlay)
		if (isPlay) {
			audioRef.current.play();
			if (isPictureInPictureActive) {
				pipRef.current.play()
			}
		} else {
			audioRef.current.pause();
			if (isPictureInPictureActive) {
				pipRef.current.pause()
			}
		}
	}, [isPlay])

	// handle time slider change
	useEffect(() => {
		if (isChanging) {
			audioRef.current.currentTime = currentTime;
		}
	}, [currentTime])
	
	// init pip navigator
	useEffect(() => {
		navigator.mediaSession.setActionHandler('previoustrack', function () {
            console.log('> User clicked "Previous Track" icon.');
        });
        navigator.mediaSession.setActionHandler('nexttrack', function () {
            console.log('> User clicked "Next Track" icon.');
        });
	}, [])


	// handle ended 
	const handleEnded = () => {
		setPlay(false);
		if (playList.length == 0) return
		var newIndex = 0
		if (currentSong.index != playList.length - 1) {
			newIndex = currentSong.index + 1
		}
		setCurrentSong({
			index: newIndex,
			data: audioList.playList[newIndex]
		})
	}


	const handleLoadedData = () => {
		setDuration(audioRef.current.duration);
		setPlay(true)
	}


	return (
		<HStack spacing={3} flex={1}
			onMouseEnter={() => setMouseEnter(true)}
			onMouseLeave={() => setMouseEnter(false)}>
			<Text fontSize={12} color="gray.light" minW="10">{timeConvert(currentTime)}</Text>
			<Slider
				aria-label="slider-ex-1"
				defaultValue={1}
				focusThumbOnChange={false}
				onChange={(percent) => { setChanging(true); handleEndChange(percent) }}
				onChangeEnd={(val) => { setChanging(false); console.log(val) }}
				{...(isChanging ? {} : { value: duration ? (currentTime / duration * 100) : 0 })}
			>
				<SliderTrack boxSize={isMouseEnter ? 1.5 : 1} rounded="full">
					<Box
						height={isMouseEnter ? 1.5 : 1}
						left={0}
						insetY={0}
						bg="brand.red"
						rounded={isMouseEnter ? "none" : "full"}
						width={(duration ? (currentTime / duration * 100) : 0) + "%"}
					/>
					<SliderFilledTrack bg="ncolor" />
				</SliderTrack>
				<SliderThumb
					{...(isMouseEnter ? {} : { bg: "ncolor" })}
					boxSize={isMouseEnter ? 3 : 0} />
			</Slider>
			<Text fontSize={12} color="gray.light">{timeConvert(duration)}</Text>
			<audio
				ref={audioRef}
				src={currentSong.data != null ? currentSong.data.src : ""}
				onLoadedData={handleLoadedData}
				{...(isChanging ? {} : { onTimeUpdate: () => setCurrentTime(audioRef.current.currentTime) })}
				onEnded={handleEnded}
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
		</HStack>
	)
};
