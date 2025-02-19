import * as view from "./filterView";
import Filter from "./filterModel";

export default async function (state) {
  if (!state.filter) state.filter = new Filter();

  await state.filter.getParams();

  view.render(state.filter.params);

  await state.filter.getResults();
  state.results = state.filter.result;

  view.changeButtonText(state.filter.result.length);

  //прослушка событий формы
  const form = document.querySelector("#filter-form");

  //Изменения формы
  form.addEventListener("change", async function (e) {
    e.preventDefault();
    state.filter.query = view.getInput();
    await state.filter.getResults();
    state.results = state.filter.result;
    view.changeButtonText(state.filter.result.length);
  });

  //Сброс формы
  form.addEventListener("reset", async function () {
    state.filter.query = "";
    await state.filter.getResults();
    view.changeButtonText(state.filter.result.length);
  });

  //Отправка формы
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    state.emitter.emit('event:render-listing', {});

  });
}
