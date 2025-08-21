export type ErrorPayload = {
    message: string;
    detail?: string;
    status?: number;
    url?: string;
};

type Listener = (payload: ErrorPayload) => void;

const listeners = new Set<Listener>();

export const errorBus = {
    publish(payload: ErrorPayload) {
        listeners.forEach(l => l(payload));
    },
    subscribe(listener: Listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
};