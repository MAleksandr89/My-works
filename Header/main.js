const phoneWrapper = document.getElementById('phone')
const listPhone = document.getElementById('drop-contacts')
const headerBurger = document.getElementById('header-menu-burger')
const tabList = document.getElementById('tabList')
const lists = document.querySelectorAll('.tabcontent')

const containerWrapper = document.querySelector('.wrapper-container')

phoneWrapper.addEventListener('mouseenter', () => listPhone.style.display = 'block')
phoneWrapper.addEventListener('mouseleave', () => listPhone.style.display = 'none')

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

window.addEventListener('click', (event) => {
    if (!categoryWrapper.contains(event.target) && !headerBurger.contains(event.target)) {
        tabList.style.display = 'none'

        for (let index = 0; index < lists.length; index++) {
            const element = lists[index];
            element.style.display = 'none'
        }
    }
})

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