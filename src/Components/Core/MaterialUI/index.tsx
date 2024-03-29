import { FC, ReactNode } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'; //Create theme and use it with the provider
import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; //CSS Normalization

type Props = {
    children: ReactNode //Special type to allow child components
}

declare module '@mui/material/styles' {

    // allow custom values to the theme
    interface Theme {
    }

    interface ThemeOptions {
    }

}

const MaterialUIProvider: FC<Props> = ({ children }) => {

    //Customize the color palette, typography...
    const theme = createTheme({
        palette: {
            primary: {
                main: '#282828'
            },
            secondary: {
                main: '#c5aa7e'
            }
        },
        typography: {
            fontFamily: 'Khand, Arial',
            
        }
    })

    return (
        <StyledEngineProvider injectFirst> {/* injectFirst - Prioritize custom CSS over MaterialUI's */}
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default MaterialUIProvider