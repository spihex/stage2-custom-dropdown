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
    dropdownInputField.placeholder = 'Начни писать';
    dropdownList.classList.add('open');
    dropdownListItems.forEach(dropdownList => {
        dropdownList.classList.remove('closed');
    });
});

dropdownInputField.addEventListener('blur', () => {

    totalHiddenItems = document.querySelectorAll('.dropdown__item.closed');

    if (dropdownListItemsValues.length === totalHiddenItems.length) {
        dropdownInputField.value = '';
    }

    // console.log(dropdownInputField.value);
    // console.log(dropdownListItems);

    dropdownListItems.forEach(item => {
        if (dropdownInputField.value.toLowerCase === item.textContent.toLowerCase())
            console.log(' совпадает!!!');
    });

    dropdownInputField.placeholder = 'Выбери что-нибудь';
    dropdownList.classList.remove('open');


});

document.addEventListener('click', (evt) => {
    const isDropdown = dropdownList.contains(evt.target);
    // console.log(isDropdown);
    const isInput = dropdownInputField.contains(evt.target);
    if (!isDropdown && !isInput) {
        dropdownList.classList.remove('open');
    }
});