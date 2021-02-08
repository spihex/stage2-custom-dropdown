const dropdownInputField = document.querySelector('.dropdown__input');
const dropdownList = document.querySelector('.dropdown__list');
const dropdownListItems = document.querySelectorAll('.dropdown__item');

let dropdownListItemsValues = [];
dropdownListItems.forEach(item => {
    dropdownListItemsValues.push(item.textContent);
});


dropdownInputField.addEventListener('input', () => {
    dropdownList.classList.add('open');
    let inputValue = dropdownInputField.value.toLowerCase();
    if (inputValue.length > 0) {
        for (let j = 0; j < dropdownListItemsValues.length; j++) {
            if (!(inputValue.substring(0, inputValue.length) === dropdownListItemsValues[j].substring(0, inputValue.length).toLowerCase())) {
                dropdownListItems[j].classList.add('closed');
                console.log('при любом условии');
            } else {
                dropdownListItems[j].classList.remove('closed');
                console.log('это когда совпадение');
            }
        }
    } else {
        for (let i = 0; i < dropdownListItems.length; i++) {
            dropdownListItems[i].classList.remove('closed');
            console.log('это когда пусто');
        }
    }
});

dropdownListItems.forEach(item => {
    item.addEventListener('click', (evt) => {
        dropdownInputField.value = item.textContent;
        dropdownListItems.forEach(dropdownList => {
            dropdownList.classList.add('closed');
        });
    });
})

dropdownInputField.addEventListener('focus', () => {
    dropdownInputField.placeholder = 'Type to filter';
    dropdownList.classList.add('open');
    dropdownListItems.forEach(dropdownList => {
        dropdownList.classList.remove('closed');
    });
});

dropdownInputField.addEventListener('blur', () => {
    dropdownInputField.placeholder = 'Select state';

    dropdownList.classList.remove('open');

    // console.log(dropdownListItemsValues.length);
    // xxx = document.querySelectorAll('.dropdown__item.closed');
    // console.log(xxx.length);
});

document.addEventListener('click', (evt) => {
    const isDropdown = dropdownList.contains(evt.target);
    // console.log(isDropdown);
    const isInput = dropdownInputField.contains(evt.target);
    if (!isDropdown && !isInput) {
        dropdownList.classList.remove('open');
    }
});