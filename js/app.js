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

    console.log(data[0]);
    for (let i = 0; i < 13; i++) {
        const section = document.createElement('section');
        const fName = data[i].name.first;
        const lName = data[i].name.last;
        const email = data[i].email;
        const city = data[i].location.city;
        const html = `
            <img src="${data[i].picture.large}">
            <h3>${fName} ${lName}</h3>
            <p>${email}</p>
            <p>${city}</p>
        `;
        section.innerHTML = html;
        section.className = 'card';
        main.appendChild(section);
    }

}

Promise.all([
    fetch('https://randomuser.me/api/?results=12')
        .then(res => res.json())
        .then(res => createEmployee(res.results))
        .then(r => console.log(r.results))
        .catch(err => `There was an error loading data: ${err}`)
])


//image, first and last name, email, city
