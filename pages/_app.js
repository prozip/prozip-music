import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme';
import '../styles.css'
import StoreProvider from '../src/untils/store';
import 'react-jinke-music-player/lib/styles/index.less'
// import 'react-jinke-music-player/assets/index.css'



function MyApp({ Component, pageProps }) {

	return (
		<ChakraProvider theme={theme}>
			<StoreProvider>
				<Component {...pageProps} />
			</StoreProvider>
		</ChakraProvider>
	)
}

export default MyApp
