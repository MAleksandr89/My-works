export default class Bids {
    constructor() {

    }

    async getBids() {
        try{
            const queryString = 'https://jsproject.webcademy.ru/bids';
            const result = await fetch(queryString);
            const data = await result.json();
            this.bids = await data;
        } catch {
            alert('Error with getting Bids');
            console.log(error);
        }

    }
}