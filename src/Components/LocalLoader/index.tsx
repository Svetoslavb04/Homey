import './LocalLoader.scss'
import { CircularProgress } from '@mui/material'
import { FC } from 'react'

const LocalLoader: FC<{ transperantBackground?: boolean }> = ({ transperantBackground = false }) => {
    return (
        <div className={`local-loader${transperantBackground ? ' local-loader-transperant' : ''}`}>
            <div className='local-loader-logo-wrapper'>
                <CircularProgress color='secondary' />
            </div>
        </div>
    )
}

export default LocalLoader