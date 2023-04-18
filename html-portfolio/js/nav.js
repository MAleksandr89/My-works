const navIcon = document.querySelector(".nav-icon");
const nav = document.querySelector(".mobile-nav");

navIcon.addEventListener("click", function () {
  this.classList.toggle("nav-icon--active");
  nav.classList.toggle("active");
});

// Находим ссылки внутри мобильной навигации
const navLinks = document.querySelectorAll(".mobile__nav-text a");

// Обходим ссылки методом forEach
navLinks.forEach(function (item) {
  // Для каждой ссылки добавляем прослушку по событию "Клик"
  item.addEventListener("click", function () {
    navIcon.classList.remove("nav-icon--active"); // Убираем активный класс у иконки моб. навигации
    nav.classList.remove("active"); // Убираем активный класс у блока моб. навигации
  });
});
