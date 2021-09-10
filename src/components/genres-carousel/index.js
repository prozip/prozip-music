import { HStack, VStack, Text, Box, LinkBox, LinkOverlay, useBreakpointValue, Image } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react'
// import { genres } from './genres-data';
// import { Image } from '../image'
import { StoreContext } from '../../untils/store';

export const GenresCarousel = () => {

    const { album, srcRaw } = useContext(StoreContext);
    const [genres, setGenres] = useState([])

    useEffect(() => {
        fetch(srcRaw + 'data.json', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => setGenres(data.data));
    }, [])

    const handleAlbumClick = (id, name) => {
        album.setCurrentAlbum(id)
        album.setAlbumName(name)
    }


    const imageSize = useBreakpointValue({ base: '80px', md: '96px', '2xl': '110px' }) ?? '192px';
    return (
        <HStack width="full" spacing={12} overflowX="scroll" rounded="lg" flexShrink={0} align="start">
            {genres.map(({ id, name, image }, index) => (
                <LinkBox as="article" pb={3} role="group" key={`${index}-${name}`}>
                    <VStack spacing={4}>
                        <Box rounded="lg" overflow="hidden"
                            width={imageSize} height={imageSize}
                            maxWidth={imageSize} maxH={imageSize}
                            onClick={() => handleAlbumClick(id, name)}
                        >
                            <LinkOverlay href="#">
                                <Image
                                    transition="ease-out"
                                    transitionProperty="all"
                                    transitionDuration="normal"
                                    _groupHover={{ transform: 'scale(1.1, 1.1)', opacity: '0.5' }}
                                    src={srcRaw + id + '/imgs/' + image}
                                    width={imageSize} height={imageSize}
                                    maxWidth={imageSize} maxH={imageSize}
                                    objectFit="cover"
                                    quality="80"
                                    alt=""
                                />
                            </LinkOverlay>
                        </Box>
                        <Text fontWeight="medium">{name}</Text>
                    </VStack>
                </LinkBox>
            ))}
        </HStack>
    );
};
