import * as viev from "./listingView";

export default function (state) {
  //рендер контейнера для карточек
  viev.render();
  //рендер карточек
  state.results.forEach((item) => {
    viev.renderCard(item, state.favourites.isFav(item.id));
  });
  //Запускаем прослушку клика по иконке добавить в избранное
  addToFavListener ();

  state.emitter.subscribe("event:render-listing", () => {
    //очистить контейнер с карточками
    viev.clearListingContainer();

    //рендер карточек
    state.results.forEach((item) => {
      viev.renderCard(item, state.favourites.isFav(item.id));
    });
    addToFavListener ();
  });

  //Функция для работы иконок добавить в избранное
  function addToFavListener () {
    Array.from(document.getElementsByClassName("card__like")).forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          //Находим ID обьека по которому кликнули
          const currentId = e.target.closest(".card").dataset.id;
          //Добаваляем/убираем элемент из избранного
          state.favourites.toggleFav(currentId);
          //Включить/Выключить иконку с избранным
          viev.toggleFavIcon(
            e.target.closest(".card__like"),
            state.favourites.isFav(currentId)
          );
        });
      });
  }

}
