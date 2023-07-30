const main = document.getElementById('main');
// function fetchData(url) {
//     return fetch(url)
//         .then(result => result.json())
//         .catch(err => console.log(`There was a problem loading the data: ${err}`))

// }

// function checkStatus(res) {
//     if (res === 'ok')
// }

function createEmployee(data) {

    console.log(data[0].picture.large);
    for (let i = 0; i < 13; i++) {
        const section = document.createElement('section');
        const html = `
            <img src="${data[i].picture.large}">
        `;
        section.innerHTML = html;
        section.className = 'card';
        main.appendChild(section);
    }

}


// fetchData('https://randomuser.me/api/?results=12')
//     .then(data => console.log(data))
Promise.all([
    fetch('https://randomuser.me/api/?results=12')
        .then(res => res.json())
        // .then(res => console.log(res.results))
        .then(res => createEmployee(res.results))
])


//image, first and last name, email, city
