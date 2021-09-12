import { extendTheme, theme as base, withDefaultSize, withDefaultVariant } from '@chakra-ui/react';

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

export const theme = extendTheme({
    config,
    colors: {
        "gray.dark": "#1C1C1C",
        "gray.light": "#646464",
        "gray.light2":"#2a2a2a",
        "gray.menu":"#282828",
        "brand.red": "#E14949",
        "ncolor":"rgba(0, 0, 0, 0)",
        "white.text":"rgba(255, 255, 255, 0.8)",
        "background.dark":"#121212",
        brand: {
            100: "#E14949",
            200: "#E14949",
            300: "#E14949",
            400: "#E14949",
            500: "#E14949",
            600: "#E14949",
            700: "#E14949",
            900: "#E14949",
        }
    },
    fonts: {
        heading: `Circular Std Bold, ${base.fonts?.heading}`,
        body: `Circular Std Book, ${base.fonts?.body}`,
    },
},
    withDefaultVariant({
        variant: 'ghost',
        components: ['Button', 'IconButton']
    })
);