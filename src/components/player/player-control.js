import {
	IconButton,
	Tooltip
} from "@chakra-ui/react";
import { useContext } from "react";

import { brandRing } from "../../untils/brandRing";
import { StoreContext } from "../../untils/store";

export const PlayerControl = ({ label, icon, color }) => {
	const { playlistMenu, pip, audio } = useContext(StoreContext);
	const {audioInstance, isPlay} = audio
	const { pipRef, isPictureInPictureActive, togglePictureInPicture } = pip

	const actions = {
		"Play": {
			onClick: () => audioInstance.current.togglePlay()
		},
		"Next": {
			onClick: () =>audioInstance.current.playNext()
		},
		"Previous": {
			onClick: () =>audioInstance.current.playPrev()
		},
		"PIP": {
			onClick: () => {
				if (isPlay) {
					pipRef.current.play()
				}
				togglePictureInPicture(!isPictureInPictureActive)
			}
		}
	}

	return (
		<Tooltip
			label={label == "Play" & isPlay ? "Pause" : label} 
			placement="top">
			<IconButton
				aria-label={label}
				icon={icon}
				rounded="full"
				color={color}
				size="lg"
				className="no_focus_style"
				{...brandRing}
				{...(actions[label])}
			/>
		</Tooltip>
	)
};
