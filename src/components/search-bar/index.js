import {
    HStack,
    Spacer,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

import { Avatar } from "../avatar";
import { brandRing } from "../../untils/brandRing";
import { useState } from "react";

export const SearchBar = () => {
    const [isMouseEnter, setMouseEnter] = useState(false);

    return (
        <HStack width="full">
            <InputGroup
                maxW="xl"
                rounded="3xl"
                overflow="hidden"
                onMouseEnter={() => setMouseEnter(true)}
                onMouseLeave={() => setMouseEnter(false)}
                {...(isMouseEnter ? { bg: "gray.light2" } : {})}
            >
                <InputLeftElement
                    pointerEvents="none"
                    children={<RiSearchLine />}
                />
                <Input
                    variant="outline"
                    rounded="3xl"
                    placeholder="Search for sounds, tracks"
                    {...brandRing}
                />
            </InputGroup>
            <Spacer minW={12} />
            <Avatar />
        </HStack>
    );
};
