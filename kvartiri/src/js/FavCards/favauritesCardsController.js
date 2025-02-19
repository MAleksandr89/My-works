import FavouritesCards from './favCardsModel';
import * as view from './favCardsViev';

export default async function(state){
    const favsList = state.favourites.favs;

    const favouriteCards = new FavouritesCards(favsList);
    await favouriteCards.getFavs();
    view.renderPage(favouriteCards.cards);

    addToFavListener ();

    function addToFavListener () {
        Array.from(document.getElementsByClassName("card__like")).forEach((item) => {
            item.addEventListener("click", (e) => {
              e.preventDefault();
              //Находим ID обьека по которому кликнули
              const currentId = e.target.closest(".card").dataset.id;
              //Добаваляем/убираем элемент из избранного
              state.favourites.toggleFav(currentId);
              //Включить/Выключить иконку с избранным
              view.toggleFavIcon(
                e.target.closest(".card__like"),
                state.favourites.isFav(currentId)
              );
            });
          });
      }

}