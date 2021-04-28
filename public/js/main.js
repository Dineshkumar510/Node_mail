const contactform = document.querySelector('.form-container');

let name = document.getElementById('name');
let email = document.getElementById('email');
let country = document.getElementById('country');
let subject = document.getElementById('subject');

contactform.addEventListener('submit', (e)=> {
    e.preventDefault();

    let FormData = {
        name: name.value,
        email: email.value,
        country: country.value,
        subject: subject.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST','/');
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert("Email sent");
            name.value = '';
            email.value = '';
            country.value = '';
            subject.value = '';
        }
        else {
            alert("something went wrong!");
        }
    }

    xhr.send(JSON.stringify(FormData));

})