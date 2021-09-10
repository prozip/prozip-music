import { useContext, useMemo, useState, useEffect } from 'react';
import {
	Table, Thead, Tbody, Tr, Th, Td, Heading, IconButton, Flex, VStack,
	Menu, MenuButton, MenuList, MenuItem, Text, useDisclosure, color, Icon, Box, Spinner, useToast
} from "@chakra-ui/react"
import { useTable } from 'react-table'
import { FaEllipsisH, FaPlay } from 'react-icons/fa';
import { IoMdPause } from 'react-icons/io'
import { brandRing } from '../../untils/brandRing'
import { TableContextMenu } from './table-context-menu';
import { StoreContext } from '../../untils/store';
import { timeConvert } from '../../untils/function';

const HeaderCell = ({ value }) => (
	<Heading paddingLeft={1} size="xs" textTransform="none" color="gray.light"><pre>{value}</pre></Heading>
)

export const TopPicks = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [selectedRow, setSelectedRow] = useState()
	const [focusRow, setFocusRow] = useState()
	const [playingAlbum, setPlayingAlbum] = useState(null)
	const [playingRow, setPlayingRow] = useState()
	const toast = useToast()

	const { menu, album, srcRaw, audioList, audio } = useContext(StoreContext)
	const { audioInstance, isPlay } = audio
	const { currentAlbum, albumName } = album
	const [cursorPos, setCursorPos] = useState({})
	const [list, setList] = useState([])
	const { audioLists, setAudioLists } = audioList

	useEffect(() => {
		setList([])
		if (playingAlbum != currentAlbum) {
			setSelectedRow(undefined)
		} else {
			setSelectedRow(playingRow)
		}
		fetch(srcRaw + currentAlbum + '/data.json', {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',

				'Content-Type': 'application/json'
			},
			mode: 'cors'
		})
			.then(response => response.json())
			.then(data => setList(data.data));
	}, [currentAlbum])


	const addToAudioList = (rowIndex) => {
		let data = list[rowIndex]
		let musicSrc = srcRaw + currentAlbum + "/" + data.src
		const found = audioLists.findIndex(element => element.musicSrc == musicSrc);
		if (found==-1){
			setAudioLists([
				...audioLists,
				{
					name: data.title,
					singer: data.artist,
					cover: srcRaw + currentAlbum + '/imgs/' + currentAlbum + '_' + rowIndex + '.png',
					musicSrc,
				},
			])
			return audioLists.length
		}else{
			return found
		}
	}

	const playAudioIndex = (rowIndex, audioIndex) => {
		setSelectedRow(rowIndex)
		setPlayingAlbum(currentAlbum)
		setPlayingRow(rowIndex)
		audioInstance.current.playByIndex(audioIndex)
	}


	const handleRowClick = (rowIndex) => {
		console.log(rowIndex, selectedRow, playingAlbum)
		if (rowIndex == selectedRow & playingAlbum == currentAlbum) {
			audioInstance.current.togglePlay()
		} else {
			let audioIndex = addToAudioList(rowIndex)
			playAudioIndex(rowIndex, audioIndex)
		}
	}

	const handleContextMenu = (e) => {
		if (!isOpen) {
			menu.closeMenu()
			e.preventDefault()
			e.stopPropagation()
			setCursorPos({ x: e.clientX, y: e.clientY });
			onOpen()
		} else {
			onClose()
		}
	}

	const handleMenuClick = (e, row, option) => {
		e.stopPropagation()
		switch (option) {
			case "add":
				addToAudioList(row)
				toast({
					title: "Completed",
					description: "Audio added to current Playlist.",
					status: "success",
					duration: 2000,
					isClosable: true,
				})
				break;
			case "save":
				toast({
					title: "Not available",
					description: "This feature still in development.",
					status: "info",
					duration: 2500,
					isClosable: true,
				})
				break;
			case "download":
				let data = list[row]
				const link = document.createElement('a')
				link.href = srcRaw + currentAlbum + "/" + data.src
				link.download = data.title + " - " + data.artist
				document.body.appendChild(link)
				link.click()
				toast({
					title: "Completed",
					description: "Audio will start downloads automatically.",
					status: "success",
					duration: 2000,
					isClosable: true,
				})
				break;
			case "share":
				toast({
					title: "Not available",
					description: "This feature still in development.",
					status: "info",
					duration: 2500,
					isClosable: true,
				})
				break;
		}
	}

	const data = useMemo(() => list, [list]);
	const columns = useMemo(() => [
		{
			Header: () => <HeaderCell value="#" />,
			accessor: 'id',
			width: "45px",
			Cell: (value) => (
				<>
					<Text className="childId" fontSize="md" fontWeight="500" opacity={0.8}>{parseInt(value.row.id) + 1}</Text>
					<Icon
						as={FaPlay}
						className="childIdPlay"
						display="none"
						w={3} h={3}
					>
					</Icon>
					<Icon
						as={IoMdPause}
						className="childIdPause"
						display="none"
						w={4} h={5}
					>
					</Icon>
				</>
			)
		},
		{
			Header: () => <HeaderCell />,
			accessor: 'src',
			width: '3.8rem',
			Cell: (value) => (
				<VStack
					alignItems="flex-start"
					justifyContent="center"
					backgroundImage={srcRaw + currentAlbum + '/imgs/' + currentAlbum + '_' + value.row.id + '.png'}
					backgroundPosition="center"
					backgroundRepeat="no-repeat"
					width="35px"
					height="35px"
					minWidth="35px"
					minHeight="35px"
					rounded="md"
					marginTop="1px"
				>
					{/* {console.log(srcRaw + currentAlbum + '/imgs/' + currentAlbum + '_' + value.row.id + '.png')} */}
					<Box rounded="md" className="iconOpacity" display="none">
						<Icon
							// opacity="0"
							className="equalizer"
							padding="1.5"
							style={{ margin: 'auto', background: 'rgba(241, 242, 243, 0)', display: 'block' }}
							width="35px" height="35px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
							<g transform="rotate(180 50 50)"><rect x="12" y="12.5" width="16" height="40" fill="#e14949">
								<animate attributeName="height" calcMode="spline" values="50;75;10;50" times="0;0.33;0.66;1" dur="1s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" repeatCount="indefinite" begin="-0.75s"></animate>
							</rect><rect x="32" y="12.5" width="16" height="40" fill="#e14949">
									<animate attributeName="height" calcMode="spline" values="50;75;10;50" times="0;0.33;0.66;1" dur="1s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" repeatCount="indefinite" begin="-0.5s"></animate>
								</rect><rect x="52" y="12.5" width="16" height="40" fill="#e14949">
									<animate attributeName="height" calcMode="spline" values="50;75;10;50" times="0;0.33;0.66;1" dur="1s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" repeatCount="indefinite" begin="-0.25s"></animate>
								</rect><rect x="72" y="12.5" width="16" height="40" fill="#e14949">
									<animate attributeName="height" calcMode="spline" values="50;75;10;50" times="0;0.33;0.66;1" dur="1s" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" repeatCount="indefinite" begin="0s"></animate>
								</rect></g>
						</Icon>
					</Box>
				</VStack>
			),
		},
		{
			Header: () => <HeaderCell value="Title" />,
			accessor: 'title',
			width: "fit-content",
			Cell: ({ value }) => <Text fontSize="md" fontWeight="500">{value}</Text>
		}, {
			Header: () => <HeaderCell value="Artist" />,
			accessor: 'artist',
			width: '',
			Cell: ({ value }) => <Text color="#b3b3b3">{value}</Text>
		}, {
			Header: () => <HeaderCell value="Time" />,
			accessor: 'duration',
			width: '0px',
			Cell: ({ value }) => <Text color="#b3b3b3">{timeConvert(value)}</Text>
		}, {
			Header: () => <HeaderCell value="" />,
			id: 'buy',
			width: '0px',
			paddingRight: '0px',
			accessor: 'id',
			Cell: (value) => (
				<Menu
					boxShadow="0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)"
					autoSelect={false}
				>
					<MenuButton as={IconButton}
						icon={<FaEllipsisH />}
						aria-label="Buy Song"
						rounded="full"
						color="#b3b3b3"
						onClick={(e) => e.stopPropagation()}
						className="no_focus_style"
						{...brandRing}
					>
					</MenuButton>
					<MenuList
						zIndex="2"
						borderWidth={0} bg="gray.menu" maxW="12rem" minW="12rem">
						<MenuItem onClick={(e) => handleMenuClick(e, value.row.id, "add")} color="white.text">Add to playlist</MenuItem>
						<MenuItem onClick={(e) => handleMenuClick(e, value.row.id, "save")} color="white.text">Save to Liked</MenuItem>
						<MenuItem onClick={(e) => handleMenuClick(e, value.row.id, "download")} color="white.text">Download</MenuItem>
						<MenuItem onClick={(e) => handleMenuClick(e, value.row.id, "share")} color="white.text">Share</MenuItem>
					</MenuList>
				</Menu>
			),

		}], [currentAlbum]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data })

	return (
		<VStack align="flex-start" height="full" {...props}>
			<Heading size="lg">{albumName}</Heading>
			<TableContextMenu
				cursorPos={cursorPos}
				isOpen={isOpen} onOpen={onOpen} onClose={onClose}
				focusRow={focusRow}
				handleMenuClick={handleMenuClick}
			/>

			{list.length == 0 ?
				<Box width="full" height="full" top="35%" left="50%" position="relative">
					<Spinner size="xl" position="absolute"></Spinner>
				</Box>
				:
				<Flex
					overflowY="visible" overflowX={list.length < 6 ? "visible" : "hidden"}
					width="full" paddingRight={8}>
					<Table {...getTableProps()} position="relative">
						<Thead>
							{headerGroups.map((headerGroup) => (
								<Tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column, colIndex) => (
										<Th width={column.width} {...column.getHeaderProps()}
											paddingLeft={5} paddingRight={0}
											position="sticky"
											bg='background.dark'
											zIndex="1"
											overflow="hidden"
											top={0}
											{...colIndex == 0 || 1 || 2 ? { paddingLeft: "4" } : {}}
										>
											{column.render("Header")}
										</Th>
									))}
								</Tr>
							))}
						</Thead>
						<Tbody {...getTableBodyProps()} marginTop="2" paddingBottom="2">
							{rows.map((row, rowIndex) => {
								prepareRow(row)
								return (
									<Tr
										{...row.getRowProps()}
										transition="ease"
										transitionProperty="background"
										transitionDuration="0.1s"
										whiteSpace="unset"
										fontStyle="normal"
										onContextMenu={handleContextMenu}
										onTransitionEnd={(e) => e.preventDefault()}
										tabIndex="0"
										_hover={{
											background: 'gray.light2',
											cursor: 'pointer',
										}}
										_focusWithin={{
											bg: 'gray.700',
											color: "brand.red"
										}}
										onFocus={() => setFocusRow(rowIndex)}
										className={rowIndex == selectedRow & isPlay ? "playing" : rowIndex == selectedRow ? "pause" : "row"}
										onClick={() => handleRowClick(rowIndex)}
									>

										{row.cells.map((cell, colIndex) => (
											<Td {...cell.getCellProps()}
												py={2} paddingInlineEnd={0} minWidth={cell.column.width}
												border={0}
												paddingRight={0}
												{...colIndex == 0 || 1 || 2 ? { paddingLeft: "4" } : {}}
												_first={{
													roundedTopLeft: "md",
													roundedBottomLeft: "md",
												}}
												_last={{
													roundedTopRight: "md",
													roundedBottomRight: "md"
												}}
											>
												{cell.render("Cell")}
											</Td>
										))}
									</Tr>
								)
							})}
						</Tbody>
					</Table>
				</Flex>
			}
		</VStack>
	)
};
