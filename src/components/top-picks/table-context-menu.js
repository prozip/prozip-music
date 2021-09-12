import { Menu, MenuItem, MenuList, MenuButton, Box } from '@chakra-ui/react'

export const TableContextMenu = ({ cursorPos, isOpen, onOpen, onClose, focusRow, handleMenuClick }) => {


    const handleAddClick = (e) => {
        handleMenuClick(e, focusRow, 'add')
    }

    const handleSaveClick = (e) => {
        handleMenuClick(e, focusRow, 'save')
    }
    
    const handleDownloadClick = (e) => {
        handleMenuClick(e, focusRow, 'download')
    }
    
    const handleShareClick = (e) => {
        handleMenuClick(e, focusRow, 'share')
    }

    return (
        <Menu
            boxShadow="0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)"
            autoSelect={false}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <MenuButton
                as={Box} position="fixed" top={cursorPos.y} left={cursorPos.x}>
            </MenuButton>
            <MenuList
                borderWidth={0} bg="gray.menu" maxW="12rem" minW="12rem"
            >
                <MenuItem onClick={handleAddClick}>Add to playlist</MenuItem>
                <MenuItem onClick={handleSaveClick}>Save to Liked</MenuItem>
                <MenuItem onClick={handleDownloadClick}>Download</MenuItem>
                <MenuItem onClick={handleShareClick}>Share</MenuItem>
            </MenuList>
        </Menu>
    )
}