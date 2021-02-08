const dropDownInputField = document.querySelector('.dropdown__input');
const dropdownList = document.querySelector('.dropdown__list');
const dropdownListItems = document.querySelectorAll('.dropdown__item');

// dropdownList.classList.add('open');
// dropDownInputField.focus(); // Demo purposes only
let valueArray = [];
dropdownListItems.forEach(item => {
    valueArray.push(item.textContent);
});

const closeDropdown = () => {
    dropdownList.classList.remove('open');
}

dropDownInputField.addEventListener('input', () => {
    dropdownList.classList.add('open');
    let inputValue = dropDownInputField.value.toLowerCase();
    let valueSubstring;
    if (inputValue.length > 0) {
        for (let j = 0; j < valueArray.length; j++) {
            if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
                dropdownListItems[j].classList.add('closed');
            } else {
                dropdownListItems[j].classList.remove('closed');
            }
        }
    } else {
        for (let i = 0; i < dropdownListItems.length; i++) {
            dropdownListItems[i].classList.remove('closed');
        }
    }
});

dropdownListItems.forEach(item => {
    item.addEventListener('click', (evt) => {
        dropDownInputField.value = item.textContent;
        dropdownListItems.forEach(dropdownList => {
            dropdownList.classList.add('closed');
        });
    });
})

dropDownInputField.addEventListener('focus', () => {
    dropDownInputField.placeholder = 'Type to filter';
    dropdownList.classList.add('open');
    dropdownListItems.forEach(dropdownList => {
        dropdownList.classList.remove('closed');
    });
});

dropDownInputField.addEventListener('blur', () => {
    dropDownInputField.placeholder = 'Select state';
    dropdownList.classList.remove('open');
});

document.addEventListener('click', (evt) => {
    const isDropdown = dropdownList.contains(evt.target);
    const isInput = dropDownInputField.contains(evt.target);
    if (!isDropdown && !isInput) {
        dropdownList.classList.remove('open');
    }
});