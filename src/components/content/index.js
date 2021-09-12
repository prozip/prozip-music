import { HStack, VStack } from "@chakra-ui/react"
import { useContext } from "react"
import { StoreContext } from "../../untils/store"
import { GenresCarousel } from "../genres-carousel"
import { SearchBar } from "../search-bar"
import { Sidebar } from "../sidebar"
import { TopPicks } from '../top-picks'
import { TopProducers } from '../top-producers'

export const Content = () => {

    const { audio } = useContext(StoreContext)
    const { isOpenPlayer } = audio

    return (
        <HStack
            width="full"
            flex={1}
            overflow="hidden"
        >
            <Sidebar></Sidebar>
            <VStack
                px={12}
                pt={7}
                width="full"
                height="100%"
                spacing={6}
                overflow="hidden"
                pb={isOpenPlayer ? 90 : 10}
                bg="#121212"
            >
                <SearchBar></SearchBar>
                <GenresCarousel></GenresCarousel>
                <HStack spacing={5} width="full" alignItems="flex-start" overflow="hidden" flex={1}>
                    <TopPicks flex={1} />
                    <TopProducers flexShrink={0} />
                </HStack>
            </VStack>
        </HStack>
    )
}