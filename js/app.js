const body = document.querySelector('body');
const main = document.getElementById('main');
const cardHolder = document.getElementById('card-holder');
const modal = document.getElementById('modal');
const modalCard = document.getElementById('modal-card');
const btnExitModal = document.querySelector('#exit');
const employeeArray = [];
let currentIndex;


//Using fetch API to request data from randomuser.me
fetch('https://randomuser.me/api/?nat=us&results=12')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        createEmployeeCard(data.results);
    })
    .catch(err => console.log(`There was an error loading data: ${err}`))


//CREATOR FUNCTIONS
function createEmployeeCard(data) {
    // console.log(data[0]);
    for (let i = 0; i < 12; i++) {
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
        section.setAttribute('id', `${i}`);
        cardHolder.appendChild(section);
        employeeArray.push(data[i]);
    }
}

function createEmployeeModal(data) {
    // console.log(data);
    const fName = data.name.first;
    const lName = data.name.last;
    const email = data.email;
    const cell = data.cell;
    const streetNum = data.location.street.number;
    const streetName = data.location.street.name;
    const city = data.location.city;
    const state = data.location.state;
    const postCode = data.location.postcode;
    const birthDate = new Date(data.dob.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
    const html = `
        <div id="exit">x</div>
        <img src="${data.picture.large}">
        <h3>${fName} ${lName}</h3>
        <p>${email}</p>
        <p>${city}</p>
        <div id="border"></div>
        <p>${cell}</p>
        <p>${streetNum} ${streetName} ${city}, ${abbreviateState(state)} ${postCode}</p>
        <p>Birthday: ${birthDate}</p>
    `;
    modalCard.innerHTML = html;
}


//HELPER FUNCTIONS
function abbreviateState(state) {
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    for (let i = 0; i < states.length; i++) {
        if (states[i][0] === state) {
            return states[i][1];
        }
    }
    return 'Unavailable';
}


//EVENT LISTENERS


modal.addEventListener('click', e => {
    // console.log(e);
    if (e.target.id === 'exit') {
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
        main.style.pointerEvents = 'auto';
        body.style.overflow = 'auto';
    }
    if (e.target.id === 'left-arrow' || e.target.parentElement.id === 'left-arrow') {
        if (currentIndex === (employeeArray.length - employeeArray.length)) {
            createEmployeeModal(employeeArray[employeeArray.length - 1]);
            currentIndex = employeeArray.length - 1;
        }
        else {
            createEmployeeModal(employeeArray[currentIndex - 1]);
            currentIndex -= 1;
        }
    }
    if (e.target.id === 'right-arrow' || e.target.parentElement.id === 'right-arrow') {
        if (currentIndex === employeeArray.length - 1) {
            createEmployeeModal(employeeArray[employeeArray.length - employeeArray.length]);
            currentIndex = employeeArray.length - employeeArray.length;
        }
        else {
            createEmployeeModal(employeeArray[currentIndex + 1]);
            currentIndex += 1;
        }
    }
});

main.addEventListener('click', e => {
    if (e.target.parentElement.className === 'card' || e.target.className === 'card') {
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
        main.style.pointerEvents = 'none';
        // body.style.overflow = 'hidden';
        console.log(e);
        let id = '';
        if (e.target.parentElement.className === 'card') {
            id = parseInt(e.target.parentElement.id);
        }
        else {
            id = parseInt(e.target.id);
        }
        currentIndex = id;
        console.log(id);
        createEmployeeModal(employeeArray[id]);
    }
});


