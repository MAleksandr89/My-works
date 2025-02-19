export default class Favourites {
  constructor() {
    this.favs = [];
    //Получение элементов в Local Storage
    this.readStorage();
  }
  addFav(id) {
    this.favs.push(id);
    //сохранения в LS
    this.saveData();
  }
  removeFav(id) {
    const index = this.favs.indexOf(id);
    this.favs.splice(index, 1);
    //Удаление из LS
    this.saveData();
  }

  isFav(id) {
    return this.favs.indexOf(id) !== -1 ? true : false;
  }

  toggleFav(id) {
    this.isFav(id) ? this.removeFav(id) : this.addFav(id);
  }

  saveData() {
    localStorage.setItem("favs", JSON.stringify(this.favs));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem("favs"));
    if (storage) this.favs = storage;
  }
}
