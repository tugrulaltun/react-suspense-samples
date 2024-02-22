const fetchData = (userId) => {
    let status = 'pending';
    let result;
    let suspender = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            status = 'success';
            result = data;
        }, error => {
            status = 'error';
            result = error;
        });

    return {
        read() {
            if (status === 'pending') throw suspender;
            if (status === 'error') throw result;
            if (status === 'success') return result;
        },
    };
};

export default fetchData;
