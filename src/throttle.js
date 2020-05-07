export default function throttle(callback, limit) {
    let wait = false;
    return function() {
        if (!wait) {
            wait = true;
            setTimeout(function() {
                wait = false;
                callback.call();
            }, limit);
        }
    };
}