import favauritesCards from '../FavCards/favauritesCardsController'

export default function (state) {
	document.querySelector('#app').innerHTML = '';
	favauritesCards(state)
}
