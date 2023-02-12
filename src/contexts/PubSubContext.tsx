import { createContext, FC, ReactNode, useContext, useMemo } from 'react'
import EventBus from '../utils/pubsub';

export const PubSubContext = createContext<EventBus | null>(null);

type Props = {
    children: ReactNode
}

export const PubSubProvider: FC<Props> = ({ children }) => {

    const bus = useMemo<EventBus>(() => new EventBus(), []);

    return (
        <PubSubContext.Provider value={bus}>
            {children}
        </PubSubContext.Provider>
    )
}

export const usePubSubContext = () => useContext(PubSubContext);