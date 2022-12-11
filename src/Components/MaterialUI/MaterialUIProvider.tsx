import { FC, ReactNode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';

type Props = {
    children: ReactNode
}

declare module '@mui/material/styles' {

    // allow custom values to the theme
    interface Theme {

    }

    interface ThemeOptions {

    }

}

const MaterialUIProvider: FC<Props> = ({ children }) => {

    //Customize the color palette, typography
    const theme = createTheme({
        palette: {
            primary: {
                main: '#282828'
            }
        },
        typography: {
            fontFamily: 'Khand'
        }
    })

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default MaterialUIProvider