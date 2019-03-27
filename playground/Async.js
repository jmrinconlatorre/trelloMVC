console.log("jasfj")

const fetchServer = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, {
            data: [1, 2, 3, 4]
        });
    })
}



const datoUnicoAsyncAwait = async () => {
    const inicio = Date.now();
    const res = await fetchServer().then(res => {
        console.log(Date.now() - inicio);
        console.log(res);
    })

}

datoUnicoPromise();