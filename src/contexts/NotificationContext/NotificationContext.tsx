import './NotificationContext.scss';

import { createContext, useState, useContext, ReactNode, FC } from "react";

import { AlertColor } from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Notification from "../../Components/Core/Notification";

export interface INotification {
    type: AlertColor, message: string
}

type NotificationStateElement = {
    timeoutId: NodeJS.Timeout
} & INotification

type NotificationContextValue = {
    popNotification: (notification: INotification) => void,
    hideNotification: (message: string) => void,
    notifications: INotification[],
    setNotifications: (notifications: NotificationStateElement[]) => void
}

export const NotificationContext = createContext<NotificationContextValue>({
    popNotification() { },
    hideNotification() { },
    notifications: [],
    setNotifications() { }
});

export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [notifications, setNotifications] = useState<NotificationStateElement[]>([]);

    const hideNotification = (message: string) =>
        setNotifications(notifications => notifications.filter(n => n.message !== message));

    const popNotification = (newNotification: INotification) => {

        const notificationIndex = notifications.findIndex(n => n.message === newNotification.message);

        if (notificationIndex > -1) {

            clearTimeout(notifications[notificationIndex].timeoutId);

            const notification = notifications[notificationIndex];

            if (notification) {

                notification.timeoutId = setTimeout(() => {
                    setNotifications(notifications => notifications.filter(n => n.message !== newNotification.message));
                }, 3000);

                notifications.splice(notificationIndex, 1, notification);

                setNotifications([...notifications]);

            }

            return;
        }

        const notification = {
            ...newNotification,
            timeoutId: setTimeout(() => {
                setNotifications(notifications => notifications.filter(n => n.message !== newNotification.message));
            }, 3000)
        }

        setNotifications(oldNotifications => [...oldNotifications, notification]);

    }

    return (
        <NotificationContext.Provider
            value={{ popNotification, hideNotification, notifications, setNotifications }}
        >
            {children}
            <div className='notifications'>
                <TransitionGroup>
                    {
                        notifications.map(n => (
                            <Slide key={n.message} mountOnEnter unmountOnExit direction='left'>
                                <div>
                                    <Notification
                                        message={n.message}
                                        type={n.type}
                                    />
                                </div>
                            </Slide>
                        ))
                    }
                </TransitionGroup>
            </div>
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => useContext(NotificationContext);