const dropdownInputField = document.querySelector('.dropdown__input');
const dropdownList = document.querySelector('.dropdown__list');
const dropdownListItems = document.querySelectorAll('.dropdown__item');

let previousValue;

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
    item.addEventListener('click', () => {
        previousValue = item.textContent;
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

    let currentValueMatches = dropdownListItemsValues.filter(function (item) {
        return item.toLowerCase() == dropdownInputField.value.toLowerCase();
    });

    if (currentValueMatches.length < 1) {
        dropdownInputField.value = '';
    }

    console.log(previousValue.length);


    dropdownList.classList.remove('open');

});

document.addEventListener('click', (e) => {
    const isDropdown = dropdownList.contains(e.target);
    // console.log(isDropdown);
    const isInput = dropdownInputField.contains(e.target);
    if (!isDropdown && !isInput) {
        dropdownList.classList.remove('open');
    }
});