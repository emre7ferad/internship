export type LoadingListener = (count: number) => void;

let count = 0;
const listeners = new Set<LoadingListener>();

const notify = () => {
    listeners.forEach(l => l(count));
};

export const loadingBus = {
    start() {
        count += 1;
        notify();
    },
    stop() {
        if (count > 0) {
            count -= 1;
            notify();
        }
    },
    getCount() {
        return count;
    },
    subscribe(listener: LoadingListener) {
        listeners.add(listener);

        listener(count);
        return () => { 
            listeners.delete(listener);
        };
    }
};