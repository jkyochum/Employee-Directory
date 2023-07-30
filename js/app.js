
function fetchData(url) {
    return fetch(url)
        .then(result => result.json())
        .catch(err => console.log(`There was a problem loading the data: ${err}`))

}

fetchData('https://randomuser.me/api/?results=12')
    .then(data => console.log(data))



//image, first and last name, email, city