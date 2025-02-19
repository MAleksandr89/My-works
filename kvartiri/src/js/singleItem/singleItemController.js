import SingleItem from "./singleItemModel";
import * as view from "./singleItemView";

export default async function (state) {

  state.singleItem = new SingleItem(state.routeParams);
  await state.singleItem.getItem();

  //Отрисовываем разметку для отдельного обьекта
  view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

  //Запуск прослушку событий
  //Открытие модалки
  document.querySelector(".button-order").addEventListener("click", () => {
    view.showModal();
  });

  //Закрытие модалки клик по кнопке
  document.querySelector(".modal__close").addEventListener("click", () => {
    view.hideModal();
  });
    //Закрытие модалки клик по оверлею
    document.querySelector(".modal-wrapper").addEventListener("click", (e) => {
        if(e.target.closest('.modal')) {
            return null;
        } else {
            view.hideModal();
        }
      });

      //Отправка формы
      document.querySelector('.modal__form').addEventListener('submit', async function(e){
        e.preventDefault();
        const formData = view.getInput();
        await state.singleItem.submitForm(formData)
        const response = state.singleItem.response;
        
        if(response.message === 'Bid Created'){
            alert('Ваша заявка успешно получена');
            view.hideModal();
            view.clearInput();
        } else if (response.message === 'Bid Not Created') {
            response.errors.forEach((item) => {
                alert(item)
            });
        }
      });

      //Клик по кнопке добавить в избранное
      document.querySelector('#addToFavouriteBtn').addEventListener('click', () => {
        state.favourites.toggleFav(state.singleItem.id);
        view.toggleFavBtn(state.favourites.isFav(state.singleItem.id));
      })
}
