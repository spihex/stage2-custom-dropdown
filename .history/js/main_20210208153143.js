let dropdownInputField = document.querySelector('.dropdown__input');
let dropdownList = document.querySelector('.dropdown__list');
let dropdown = document.querySelector('.dropdown')
let previousValue;
let dropdownListItemsValues = [];

document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            dropdownList.innerHTML = '';

            data.forEach(item => {
                dropdownList.innerHTML += ` <li class="dropdown__item">${item.label}</li>`;
                dropdownListItemsValues.push(item.label);
            });

            dropdownListItems = document.querySelectorAll('.dropdown__item');

        })
});


document.addEventListener('mousedown', (e) => {
    let isDropdown = dropdownList.contains(e.target);
    let isInput = dropdownInputField.contains(e.target);
    if (!isDropdown && !isInput) {
        dropdownList.classList.remove('open');
    }

    if (e.button === 0) {

        if (e.target.classList.contains('dropdown__item')) {
            previousValue = e.target.textContent;
            dropdownInputField.value = e.target.textContent;

            dropdownListItems.forEach(dropdownList => {
                dropdownList.classList.add('closed');
            });
        }

    }
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


dropdownInputField.addEventListener('focus', () => {
    dropdownInputField.placeholder = 'Напиши что-нибудь';
    dropdownList.classList.add('open');
    dropdownListItems.forEach(dropdownList => {
        dropdownList.classList.remove('closed');
    });

    if ((dropdown.offsetTop) + 220 >= window.innerHeight) {
        // console.log('не вмещается');
        dropdownList.style.top = 'initial';
        dropdownList.style.bottom = '0';

    }


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
