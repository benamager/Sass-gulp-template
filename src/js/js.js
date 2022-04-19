const getFromAPI = (function(){
    function getAllProducts(){
        fetch("/api/products")
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return {
        getAllProducts
    }
})()

getFromAPI.getAllProducts()