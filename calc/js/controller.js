let controller = (function(budgetCtrl, uiCtrl){

    let setupEventListener = function(){
        let DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);

        document.querySelector(DOM.budgetTable).addEventListener('click', ctrDeleteItem)
    }

    //Обновляем проценты у каждой записи
    function updatePercentage() {
        budgetCtrl.calculatePersentage();
        budgetCtrl.test();
        let idsAndPercents = budgetCtrl.getAllIdAdnPercentage();
        uiCtrl.updateItemPercentage(idsAndPercents);
    }

//Функция срабатывает при отправке формы
    function ctrlAddItem (event){
        event.preventDefault();

        //Получили все данные из формы
        let input = uiCtrl.getInput();

        if (input.desc !== '' && !isNaN(input.value) && input.value > 0){
            let newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        budgetCtrl.test();

        uiCtrl.renderListItem(newItem, input.type);
        uiCtrl.clearFields();
        generateTestData.init();
        updateBudget();

        updatePercentage();

        } 



        

    }

    function ctrDeleteItem(event){
        let splitID,itemID,type,ID;

        if(event.target.closest('.item__remove')){
            //Находим ID запись, которую нужно удалить.
            itemID = event.target.closest('li.budget-list__item').id;
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            //Удаляем запись из модели
            budgetCtrl.deleteItem(type, ID);
            //Удаляем запись из шаблонов
            uiCtrl.deleteListItem(itemID);
            updateBudget();
            updatePercentage();
        }
    }

    function updateBudget () {
        //1.Расчитать бюджет в модели
        budgetCtrl.calculateBudget();
        //2.Получить расчитанный бюджет из модели
        let budgetObj = budgetCtrl.getBudget();
        //3.Отобразить бюджет в шаблоне
        uiCtrl.updateBudget(budgetObj);
    }


    

    return {
        init: function(){
            uiCtrl.displayMonth();
            setupEventListener();
            uiCtrl.updateBudget({
                budget:0,
                tottalInc:0,
                tottalExp:0,
                percentage:0,
            });
        }
    }
    
    




})(modelController, viewController);

controller.init();
