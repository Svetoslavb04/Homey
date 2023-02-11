export type Subscriber = {
    event: string,
    callback: Function
}

class EventBus {

    private subscribers: Subscriber[] = []

    constructor(subscribers: Subscriber[] = []) {

        this.subscribers = subscribers

    }

    publish(event: string) {

        this.subscribers
            .filter(s => s.event.toLowerCase() === event.toLowerCase())
            .forEach(s => {
                s.callback();
            })

    }

    subscribe(subscriber: Subscriber) {

        this.subscribers.push(subscriber)

    }
}

export const customEvents = {
    sidebarStateChange: 'sidebarStateChange'
}

export default EventBus