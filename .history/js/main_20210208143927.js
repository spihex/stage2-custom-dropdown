const dropdownInputField = document.querySelector('.dropdown__input');
const dropdownList = document.querySelector('.dropdown__list');
const dropdownListItems = document.querySelectorAll('.dropdown__item');

let previousValue;


// dropdownListItems.forEach(item => {
//     dropdownListItemsValues.push(item.textContent);
// });

document.addEventListener("DOMContentLoaded", function () {
    fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            console.log(users);

            dropdownList.innerHTML = '';
            let dropdownListItemsValues = [];

            users.forEach(user => {
                dropdownList.innerHTML += ` <li class="dropdown__item">${user.name}</li>`;
                dropdownListItemsValues.push(user.name);

            });

        })

});



dropdownInputField.addEventListener('input', () => {
    dropdownList.classList.add('open');
    let inputValue = dropdownInputField.value.toLowerCase();
    if (inputValue.length > 0) {
        for (let i = 0; i < dropdownListItemsValues.length; i++) {
            if (!(inputValue.substring(0, inputValue.length) === dropdownListItemsValues[i].substring(0, inputValue.length).toLowerCase())) {
                dropdownListItems[i].classList.add('closed');
            } else {
                dropdownListItems[i].classList.remove('closed');
            }
        }
    } else {
        for (let i = 0; i < dropdownListItems.length; i++) {
            dropdownListItems[i].classList.remove('closed');
        }
    }
});

dropdownListItems.forEach(item => {
    item.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            previousValue = item.textContent;
            dropdownInputField.value = item.textContent;

            dropdownListItems.forEach(dropdownList => {
                dropdownList.classList.add('closed');
            });
        }
    });
})

dropdownInputField.addEventListener('focus', () => {
    dropdownInputField.placeholder = 'Напиши что-нибудь';
    dropdownList.classList.add('open');
    dropdownListItems.forEach(dropdownList => {
        dropdownList.classList.remove('closed');
    });
});

dropdownInputField.addEventListener('blur', () => {

    dropdownInputField.placeholder = 'Выбери что-нибудь';
    dropdownList.classList.remove('open');

    let currentValueMatches = dropdownListItemsValues.filter(function (item) {
        return item.toLowerCase() == dropdownInputField.value.toLowerCase();
    });

    if (currentValueMatches.length < 1) {
        dropdownInputField.value = '';

    }
    if (previousValue)
        dropdownInputField.value = previousValue;

});

document.addEventListener('click', (e) => {
    let isDropdown = dropdownList.contains(e.target);
    let isInput = dropdownInputField.contains(e.target);
    if (!isDropdown && !isInput) {
        dropdownList.classList.remove('open');
    }
});