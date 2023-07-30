
// function fetchData(url) {
//     return fetch(url)
//         .then(result => result.json())
//         .catch(err => console.log(`There was a problem loading the data: ${err}`))

// }

// function checkStatus(res) {
//     if (res === 'ok')
// }


// function createEmployee() {
//     const employeeList = fetchData('https://randomuser.me/api/?results=12');

// }


// fetchData('https://randomuser.me/api/?results=12')
//     .then(data => console.log(data))
Promise.all([
    fetch('https://randomuser.me/api/?results=12')
        .then(res => res.json())
        .then(res => document.getElementByTagName('main').innerHTML = res)
])


//image, first and last name, email, city
