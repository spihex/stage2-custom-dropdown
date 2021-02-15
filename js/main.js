class Dropdown {

    constructor(options) {

        this.selector = options.container;
        this.container = document.querySelector(options.container);
        this.dropdownInputField = document.querySelector(this.selector + ' .dropdown__input');

        this.dropdownList = document.querySelector(this.selector + ' .dropdown__list');
        this.dataSource = options.dataSource;
        this.previousValue;
        this.dropdownListItemsValues = [];
        this.dropdownListItems;


        this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.dropdownInputField.addEventListener('input', this.onInput.bind(this));
        this.dropdownInputField.addEventListener('blur', this.onBlur.bind(this));
        this.dropdownInputField.addEventListener('focus', this.onFocus.bind(this));



        this.init(this.dataSource);

    }

    init(source) {

        fetch(source)
            .then(response => response.json())
            .then(data => {
                this.dropdownList.innerHTML = '';
                data.forEach(item => {
                    this.dropdownList.innerHTML += ` <li class="dropdown__item">${item.label}</li>`;
                    this.dropdownListItemsValues.push(item.label);
                });

                this.dropdownListItems = document.querySelectorAll(this.selector + ' .dropdown__item');

            })


        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    onScroll() {
        this.dropdownInputField.blur();
    }

    onResize() {
        this.dropdownInputField.blur();
    }

    onFocus() {
        this.dropdownInputField.placeholder = 'Напиши что-нибудь';
        this.dropdownInputField.value = '';
        this.dropdownList.classList.add('open');
        this.dropdownListItems.forEach(dropdownList => {
            dropdownList.classList.remove('closed');
        });

        if ((this.container.offsetTop) + 220 >= window.innerHeight) {
            //220 - minimum height of dropdown list

            this.dropdownList.style.top = 'initial';
            this.dropdownList.style.bottom = '0';

        } else {

            this.dropdownList.style.top = '0';
            this.dropdownList.style.bottom = 'initial';

        }
    }

    onBlur() {
        this.dropdownInputField.placeholder = 'Выбери что-нибудь';
        this.dropdownList.classList.remove('open');

        let dropdownInputFieldValue = this.dropdownInputField.value;

        let currentValueMatches = this.dropdownListItemsValues.filter(function(item) {
            return item.toLowerCase() == dropdownInputFieldValue.toLowerCase();
        });

        if (currentValueMatches.length < 1) {
            this.dropdownInputField.value = '';

        }
        if (this.previousValue)
            this.dropdownInputField.value = this.previousValue;
    }

    onInput() {
        this.dropdownList.classList.add('open');

        let inputValue = this.dropdownInputField.value.toLowerCase();
        if (inputValue.length > 0) {
            for (let i = 0; i < this.dropdownListItemsValues.length; i++) {
                if (!(inputValue.substring(0, inputValue.length) === this.dropdownListItemsValues[i].substring(0, inputValue.length).toLowerCase())) {
                    this.dropdownListItems[i].classList.add('closed');
                } else {
                    this.dropdownListItems[i].classList.remove('closed');
                }
            }
        } else {
            for (let i = 0; i < this.dropdownListItems.length; i++) {
                this.dropdownListItems[i].classList.remove('closed');
            }
        }
    }

    onMouseDown(e) {

        let isDropdown = this.dropdownList.contains(e.target);
        let isInput = this.dropdownInputField.contains(e.target);

        if (!isDropdown && !isInput) {
            this.dropdownList.classList.remove('open');
        }

        if (e.button === 0) {

            if (e.target.classList.contains('dropdown__item')) {
                this.previousValue = e.target.textContent;
                this.dropdownInputField.value = e.target.textContent;

                this.dropdownListItems.forEach(dropdownList => {
                    dropdownList.classList.add('closed');
                });
            }

        }
    }

}