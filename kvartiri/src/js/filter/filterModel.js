export default class Filter {
  constructor() {
    this.query = '';
  }

  async getParams() {
    try {
        const queryString = "https://jsproject.webcademy.ru/itemsinfo";
        const respons = await fetch(queryString);
        const data = await respons.json();
        this.params = await data;
    } catch {
      alert(error);
    }
  }

  async getResults() {
    try{
      const queryString = `https://jsproject.webcademy.ru/items${this.query}`;
      const response = await fetch(queryString);
      const data = await response.json();
      this.result = await data;
      
    } catch {
      alert(error);
    }
  }



}
