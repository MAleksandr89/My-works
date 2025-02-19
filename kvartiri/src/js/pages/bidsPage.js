import bids from '../bids/bidsController'

export default function (state) {
	//Очищаем контейнер
	document.querySelector('#app').innerHTML = '';
	bids(state)
}
