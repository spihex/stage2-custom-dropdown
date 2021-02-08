const inputField = document.querySelector('.chosen-value');
const dropdownList = document.querySelector('.value-list');
const dropdownArray = [...document.querySelectorAll('li')];
console.log(typeof dropdownArray)
dropdownList.classList.add('open');
inputField.focus(); // Demo purposes only
let valueArray = [];
dropdownArray.forEach(item => {
    valueArray.push(item.textContent);
});

const closeDropdown = () => {
    dropdownList.classList.remove('open');
}

inputField.addEventListener('input', () => {
    dropdownList.classList.add('open');
    let inputValue = inputField.value.toLowerCase();
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
        inputField.value = item.textContent;
        dropdownArray.forEach(dropdownList => {
            dropdownList.classList.add('closed');
        });
    });
})

inputField.addEventListener('focus', () => {
    inputField.placeholder = 'Type to filter';
    dropdownList.classList.add('open');
    dropdownArray.forEach(dropdownList => {
        dropdownList.classList.remove('closed');
    });
});

inputField.addEventListener('blur', () => {
    inputField.placeholder = 'Select state';
    dropdownList.classList.remove('open');
});

document.addEventListener('click', (evt) => {
    const isDropdown = dropdownList.contains(evt.target);
    const isInput = inputField.contains(evt.target);
    if (!isDropdown && !isInput) {
        dropdownList.classList.remove('open');
    }
});