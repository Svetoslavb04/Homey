import { FC } from 'react'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';

type Props = {
    children: JSX.Element
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
                main: '#323232'
            }
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