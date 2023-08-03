const body = document.querySelector('body');
const main = document.getElementById('main');
const cardHolder = document.getElementById('card-holder');
const modalOverlay = document.getElementById('modal');
const modalCard = document.getElementById('modal-card');
const btnExitModal = document.querySelector('#exit');
// function fetchData(url) {
//     return fetch(url)
//         .then(result => result.json())
//         .catch(err => console.log(`There was a problem loading the data: ${err}`))

// }

// function checkStatus(res) {
//     if (res === 'ok')
// }


function createEmployeeCard(data) {

    // console.log(data[0]);
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
        cardHolder.appendChild(section);
    }
}

function formatDate(date) {
    console.log(date);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getYear();
    const dateString = `${month + 1}/${day}/${year}`;
    return dateString;
}

function createEmployeeModal(data) {
    console.log(data[0]);

    const fName = data[0].name.first;
    const lName = data[0].name.last;
    const email = data[0].email;
    const cell = data[0].cell;
    const streetNum = data[0].location.street.number;
    const streetName = data[0].location.street.name;
    const city = data[0].location.city;
    const state = data[0].location.state;
    const postCode = data[0].location.postcode;
    const birthDate = new Date(data[0].dob.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
    const html = `
        <div id="exit">x</div>
        <img src="${data[0].picture.large}">
        <h3>${fName} ${lName}</h3>
        <p>${email}</p>
        <p>${city}</p>
        <div id="border"></div>
        <p>${cell}</p>
        <p>${streetNum} ${streetName} ${city}, ${state} ${postCode}</p>
        <p>Birthday: ${birthDate}</p>
    `;
    modalCard.innerHTML = html;
}


//image, first and last name, email, cell number, Detailed Address:
//street name and number, city, state, postcode, birthdate
Promise.all([
    fetch('https://randomuser.me/api/?results=12')
        .then(res => res.json())
        .then(res => {
            createEmployeeModal(res.results);

            createEmployeeCard(res.results);
        })
        // .then(r => console.log(r.results))
        .catch(err => `There was an error loading data: ${err}`)
])


//EVENT LISTENERS
modalCard.addEventListener('click', e => {
    console.log(e);
    if (e.target.id === 'exit') {
        modalOverlay.style.opacity = '0';
        modalOverlay.style.pointerEvents = 'none';
        main.style.pointerEvents = 'auto';
        body.style.overflow = 'auto';
    }
});

main.addEventListener('click', e => {
    if (e.target.parentElement.className === 'card' || e.target.className === 'card') {
        console.log(e);
        modalOverlay.style.opacity = '1';
        modalOverlay.style.pointerEvents = 'auto';
        main.style.pointerEvents = 'none';
        body.style.overflow = 'hidden';
    }
});


