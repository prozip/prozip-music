import { List, ListItem, VStack } from '@chakra-ui/react';

import { Logo } from '../logo'
import { navItems } from './nav-data';
import { NavItem } from './nav-item';


export const Sidebar = () => {
    return (
            <VStack
                alignItems="flex-start"
                width="full"
                height="full"
                maxW={{ base: 56, '2xl': 60 }}
                borderRightColor="gray.dark"
                borderRightWidth={2}
                flexShrink={0}
                bg="#000000"
            >

                <Logo />

                <List width="full" overflowY="auto">
                    {navItems.map((item, index) => (
                        <ListItem key={item.label}>
                            <NavItem item={item} isActive={index === 0} />
                        </ListItem>
                    ))}
                </List>
            </VStack>
    );
};