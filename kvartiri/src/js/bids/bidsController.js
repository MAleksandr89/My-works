import * as view from './bidsView';
import Bids from './bidsModel';

export default async function(state) {
    //Создаем обьект модели для работы с заявками
    if(!state.bids) state.bids = new Bids();
    //получаем заявки с сервера
    await state.bids.getBids();
    //отображаем заявки
    view.renderBits(state.bids.bids);

    



}