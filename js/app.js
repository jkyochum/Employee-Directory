fetch('https://randomuser.me/api/?results=12')
    .then(result => result.json())
    .then(result => console.log(result))



//image, first and last name, email, city