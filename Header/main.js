const phoneWrapper = document.getElementById('phone')
const listPhone = document.getElementById('drop-contacts')
const headerBurger = document.getElementById('header-menu-burger')
const tabList = document.getElementById('tabList')
const lists = document.querySelectorAll('.tabcontent')
const containerWrapper = document.querySelector('.wrapper-container')
const searchResults = document.querySelector('.header-search-result');

const customersBlock = document.getElementById('customers')
const dropCustomers = document.getElementById('drop-customers')


phoneWrapper.addEventListener('mouseenter', () => listPhone.style.display = 'block')
phoneWrapper.addEventListener('mouseleave', () => listPhone.style.display = 'none')

customersBlock.addEventListener('mouseenter', () => dropCustomers.style.display = 'block')
customersBlock.addEventListener('mouseleave', () => dropCustomers.style.display = 'none')

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    const tab = document.getElementById(cityName)
    if ( tab ) tab.style.display = "block";
    evt.currentTarget.className += " active";
}


headerBurger.addEventListener('click', () => {
    if ( tabList.style.display === 'none') {
        tabList.style.display = 'block'
        containerWrapper.style.display = 'flex'
    } else {
        tabList.style.display = 'none'
        containerWrapper.style.display = 'none'
    }

    for (let index = 0; index < lists.length; index++) {
        const element = lists[index];
        if ( tabList.style.display === 'block') {
            lists[0].style.display = 'block'
        } else {
            element.style.display = 'none'
        }
    }
})

function openNav() {
    document.getElementById("myNav").style.transform = "translate(0%)";
}

function closeNav() {
    document.getElementById("myNav").style.transform = "translate(-100%)";
}

const categoryWrapper = document.getElementById('category-wrapper')


const closeMenu = () => {
    tabList.style.display = 'none'
    for (let index = 0; index < lists.length; index++) {
        const element = lists[index];
        element.style.display = 'none'
    }
    containerWrapper.style.display = 'none'
}

function openCatalog() {
    const element = document.querySelector('.mobm-main');
    const category = document.querySelector('.mobm-category');
    element.setAttribute('hidden', 'true'); // Добавляем атрибут hidden

    category.removeAttribute('hidden');
    category.setAttribute('active', 'true');
}

function openDefaultMenu() {
    const element = document.querySelector('.mobm-main');
    const category = document.querySelector('.mobm-category');
    element.removeAttribute('hidden');
    category.setAttribute('hidden', 'true');
}

function openCityMobile(evnt, cityName) {
    const category = document.querySelector('.mobm-category');
    const tab = document.getElementById(cityName)
    if (tab) {
        category.setAttribute('hidden', 'true');
        tab.classList.add('active')
    }
}

function prevState() {
    const tabcontent = document.querySelectorAll('.tabcontent');
    for (let index = 0; index < tabcontent.length; index++) {
        const element = tabcontent[index];
        element.classList.remove('active')
    }

    const category = document.querySelector('.mobm-category');
    category.setAttribute('active', 'true');
    category.removeAttribute('hidden');
}



document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".header-search-input");

    let timeout = null;

    searchInput.addEventListener("input", function () {
        clearTimeout(timeout);
        const query = searchInput.value.trim();

        if (query.length > 3) {
            timeout = setTimeout(() => {
                searchResults.style.display = 'block'
                searchResults.innerHTML = ''
                fetchData(query);
            }, 300);
        }
        if (query.length === 0 || query.length <= 3) searchResults.innerHTML = ''
    });

    function fetchData(query) {
        fetch(`https://shop-avd.ru/index.php?route=unishop/search&filter_name=${query}&category_id=undefined`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            if (Number(data.products_total) === 0) {
                searchResults.innerHTML =
                `<li>
                    <div style="padding: 20px">Ничего не нашлось</div>
                </li>`;
                return
            }
            const products = data.products.filter(res => res.type === '0');
            const category = data.products.filter(res => res.type === '1' && res.name > '');


            category.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.classList.add('header-search-result-category');
                resultElement.innerHTML = `
                    <a href="${result.url}" target="_blank">
                        <p>${result.name}</p>
                        <span>${result.col_product} шт.</span>
                    </a>
                `;
                searchResults.appendChild(resultElement);
            });

            products.forEach(result => {
                const resultElement = document.createElement('ul');
                resultElement.classList.add('header-search-result-item');
                resultElement.innerHTML = `
                    <li>
                        <a href="${result.url}" target="_blank">
                            <img src="${result.image}">
                            <div class="header-search-result-item-name">
                                <div class="title-name">${result.name}</div>
                                <div style="display: flex; align-items: center;">
                                    <div>${result.price}</div>
                                    <svg class="icon-arrow" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-right"><line class="cls-1" x1="29.08" x2="3.08" y1="16" y2="16"/><line class="cls-1" x1="29.08" x2="25.08" y1="16" y2="21"/><line class="cls-1" x1="29.08" x2="25.08" y1="16" y2="11"/></g></svg>
                                </div>
                            </div>
                        </a>
                    </li>
                `;
                searchResults.appendChild(resultElement);
            });
        })
        .catch(error => {
            console.log("Ошибка запроса:", error);
        });
    }
});


window.addEventListener('click', (event) => {
    searchResults.style.display = 'none'
});
