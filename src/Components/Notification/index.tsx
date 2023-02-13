import { FC } from "react";

import { useNotificationContext } from "../../contexts/NotificationContext/NotificationContext";

import IconButton from "@mui/material/IconButton";
import Alert, { AlertColor } from "@mui/material/Alert";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    type: AlertColor,
    message: string
}

export const Notification: FC<Props> = ({ type, message }) => {

    const { hideNotification } = useNotificationContext();

    return (
        <div className="notification">
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={hideNotification.bind(null, message)}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                severity={type ? type : 'success'}
            >
                {message}
            </Alert>
        </div>
    )
}

export default Notification