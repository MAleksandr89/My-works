//Передвижение между картачками - вперед, назад.
//2.Проверка на ввод данных
//3.Получение и сбор данных с карточек
//4.Записывать все дажнные
//5.Работа прогрессбара
//6.Подсвеька рамки для радио и чекбокса

// Обьект со всеми ответами
let answer = {
  2: null,
  3: null,
  4: null,
  5: null,
};
//1. Передвижение между картачками - вперед, назад.
//Движение вперед
let btnNext = document.querySelectorAll('[data-nav = "next"]');
btnNext.forEach(function (i) {
  i.addEventListener("click", function (e) {
    let thisCard = this.closest("[data-card]");
    let thisCardNumber = parseInt(thisCard.dataset.card);

    if (thisCard.dataset.validate == "novalidate") {
      navigate("next", thisCard);
      updateProgressBar("next", thisCardNumber);
    } else {
      saveAnswer(thisCardNumber, getherCardDate(thisCardNumber));

      if (isFilled(thisCardNumber) && checkOnRequired(thisCardNumber)) {
        navigate("next", thisCard);
        updateProgressBar("next", thisCardNumber);
      } else {
        alert("Сделайте ответ чтобы пройти далее");
      }
    }
  });
});

//Движение назад
let btnPrev = document.querySelectorAll('[data-nav = "prev"]');
btnPrev.forEach(function (i) {
  i.addEventListener("click", function (e) {
    let thisCard = this.closest("[data-card]");
    let thisCardNumber = parseInt(thisCard.dataset.card);

    navigate("prev", thisCard);
    updateProgressBar("prev", thisCardNumber);
  });
});
//функция новигация по карточкам
function navigate(direction, thisCard) {
  let thisCardNub = parseInt(thisCard.dataset.card);
  let nextCard;
  if (direction == "next") {
    nextCard = thisCardNub + 1;
  } else if (direction == "prev") {
    nextCard = thisCardNub - 1;
  }
  thisCard.classList.add("hidden");
  document
    .querySelector(`[data-card = "${nextCard}"]`)
    .classList.remove("hidden");
}

function getherCardDate(number) {
  let question;
  let result = [];
  //находим карточку по номеру и data атрибут
  let currenCard = document.querySelector(`[data-card = "${number}"]`);
  //Находим главный вопрос
  question = currenCard.querySelector("[data-question]").innerText;
  //1.находим все заполненные значения радиокнопок
  let radioValues = currenCard.querySelectorAll('[type="radio"]');

  radioValues.forEach(function (item) {
    if (item.checked) {
      result.push({
        name: item.name,
        value: item.value,
      });
    }
  });

  //Находим все чекбоксы
  let checkBoxValues = currenCard.querySelectorAll('[type="checkbox"]');
  checkBoxValues.forEach(function (item) {
    if (item.checked) {
      result.push({
        name: item.name,
        value: item.value,
      });
    }
  });
  //Находим все инпуты
  let inputValues = currenCard.querySelectorAll(
    '[type="text"], [type="email"], [type="number"]'
  );
  inputValues.forEach(function (item) {
    if (item.value != "") {
      result.push({
        name: item.name,
        value: item.value,
      });
    }
  });

  let data = {
    question: question,
    answer: result,
  };

  return data;
}

function saveAnswer(number, data) {
  answer[number] = data;
}

function isFilled(number) {
  if (answer[number].answer.length > 0) {
    return true;
  } else {
    return false;
  }
}

//Функция для проверки email
function validateEmail(email) {
  var pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  return pattern.test(email);
}
//проверка заполненностей required чекбоксов и инпутов с email.
function checkOnRequired(number) {
  let currenCard = document.querySelector(`[data-card="${number}"]`);
  let requiredFields = currenCard.querySelectorAll("[required]");

  let isValidArray = [];

  requiredFields.forEach(function (item) {
    if (item.type == "checkbox" && item.checked == false) {
      isValidArray.push(false);
    } else if (item.type == "email") {
      if (validateEmail(item.value)) {
        isValidArray.push(true);
      } else {
        isValidArray.push(false);
      }
    }
  });
  if (isValidArray.indexOf(false) == -1) {
    return true;
  } else {
    return false;
  }
}

//Подсветка радиокнопок
document.querySelectorAll(".radio-group").forEach(function (i) {
  i.addEventListener("click", function (e) {
    let label = e.target.closest("label");
    if (label) {
      label
        .closest(".radio-group")
        .querySelectorAll("label")
        .forEach(function (i) {
          i.classList.remove("radio-block--active");
        });
      label.classList.add("radio-block--active");
    }
  });
});
//Подсветка чекбоксов
document
  .querySelectorAll('label.checkbox-block input[type="checkbox"]')
  .forEach(function (i) {
    i.addEventListener("change", function () {
      if (i.checked) {
        i.closest("label").classList.add("checkbox-block--active");
      } else {
        i.closest("label").classList.remove("checkbox-block--active");
      }
    });
  });

function updateProgressBar(direction, cardNumber) {
  let cardTotalNumber = document.querySelectorAll("[data-card]").length;

  //Текущая карточка
  //Проверка направления перемещения
  if (direction == "next") {
    cardNumber = cardNumber + 1;
  } else if (direction == "prev") {
    cardNumber = cardNumber - 1;
  }

  let progress = ((cardNumber * 100) / cardTotalNumber).toFixed();
  let progressBar = document
    .querySelector(`[data-card="${cardNumber}"]`)
    .querySelector(".progress");

  if (progressBar) {
    progressBar.querySelector(
      ".progress__label strong"
    ).innerText = `${progress}%`;
    progressBar.querySelector(
      ".progress__line-bar"
    ).style = `width: ${progress}%`;
  }

  //Progress__label
}
