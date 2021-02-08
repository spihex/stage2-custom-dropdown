const dropdownInputField = document.querySelector('.dropdown__input');
const dropdownList = document.querySelector('.dropdown__list');
const dropdownArray = document.querySelectorAll('.dropdown__item');


let valueArray = [];
dropdownArray.forEach(item => {
    valueArray.push(item.textContent);
});

const closeDropdown = () => {
    dropdownList.classList.remove('open');
}

dropdownInputField.addEventListener('input', () => {
    dropdownList.classList.add('open');
    let inputValue = dropdownInputField.value.toLowerCase();
    let valueSubstring;
    if (inputValue.length > 0) {
        for (let j = 0; j < valueArray.length; j++) {
            if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
                dropdownArray[j].classList.add('closed');
            } else {
                dropdownArray[j].classList.remove('closed');
            }
        }
    } else {
        for (let i = 0; i < dropdownArray.length; i++) {
            dropdownArray[i].classList.remove('closed');
        }
    }
});

dropdownArray.forEach(item => {
    item.addEventListener('click', (evt) => {
        dropdownInputField.value = item.textContent;
        dropdownArray.forEach(dropdownList => {
            dropdownList.classList.add('closed');
        });
    });
})

dropdownInputField.addEventListener('focus', () => {
    dropdownInputField.placeholder = 'Type to filter';
    dropdownList.classList.add('open');
    dropdownArray.forEach(dropdownList => {
        dropdownList.classList.remove('closed');
    });
});

dropdownInputField.addEventListener('blur', () => {
    dropdownInputField.placeholder = 'Select state';
    dropdownList.classList.remove('open');
});

document.addEventListener('click', (evt) => {
    const isDropdown = dropdownList.contains(evt.target);
    const isInput = dropdownInputField.contains(evt.target);
    if (!isDropdown && !isInput) {
        dropdownList.classList.remove('open');
    }
});