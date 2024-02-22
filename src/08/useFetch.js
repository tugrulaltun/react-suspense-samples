export const createResource = (promiseFn) => {
    let status = "pending";
    let result;
    let suspender = promiseFn().then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            result = e;
        }
    );

    return {
        read() {
            if (status === "pending") throw suspender;
            if (status === "error") throw result;
            return result;
        },
    };
};
