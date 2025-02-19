export default class FavouritesCards {
    constructor(favsList) {
        this.favsList = favsList;
    }

    async getFavs(){
        const ids = this.favsList.toString()
        const queryString = `https://jsproject.webcademy.ru/items?ids=${ids}`
        const result = await fetch(queryString)
        const data = await result.json()
        this.cards =await data
		console.log("TCL: FavouritesCards -> getFavs -> this.cards", this.cards)
    }
}