export function render() {
  const markUp = `<div class="cards-wrapper">
                        <div class="container p-0 pt-5">
                            <div id="listingContainer" class="row">
                            </div>
                        </div>
                    </div>`;

  document.querySelector("#app").insertAdjacentHTML("beforeend", markUp);
}

export function renderCard(obj, isFaved) {
  const listingContainer = document.querySelector("#listingContainer");

  const markUp = `<article class="col-md-4">
                <a href="#/item/${obj.id}" class="card" data-id="${obj.id}">
                    <div class="card__header">
                        <div class="card__title">
                        ЖК ${obj.complex_name}
                        </div>
                        <div class="
                        card__like
                        ${isFaved ? "card__like--active" : ""}">
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                    <div class="card__img">
                        <img src="${obj.image}" alt="План квартиры" />
                    </div>
                    <div class="card__desc">
                        <div class="card__price">
                            <div class="card__price-total">
                            ${obj.price_total} ₽
                            </div>
                            <div class="card__price-per-meter">
                            ${obj.price_sq_m} ₽/м2
                            </div>
                        </div>

                        <!-- card__params params -->
                        <div class="card__params params">
                            <div class="params__item">
                                <div class="params__definition">
                                    Комнат
                                </div>
                                <div class="params__value">${obj.rooms}</div>
                            </div>
                            <div class="params__item">
                                <div class="params__definition">
                                    Площадь
                                </div>
                                <div class="params__value">${obj.square}</div>
                            </div>
                        </div>
                        <!-- //card__params params -->
                    </div>
                    <div class="card__footer">
                        <div class="card__art">${obj.scu}</div>
                        <div class="card__floor">Этаж ${obj.floor} из ${
    obj.floors_total
  }</div>
                    </div>
                </a>
                <!-- // card -->
            </article>`;

  listingContainer.insertAdjacentHTML("beforeend", markUp);
}

export function clearListingContainer() {
  const listingContainer = document.querySelector("#listingContainer");
  listingContainer.innerHTML = "";
}

export function toggleFavIcon(elementIcon, isFaved) {
    if(isFaved) {
        elementIcon.classList.add('card__like--active')
    } else {
        elementIcon.classList.remove('card__like--active')
    }
}
