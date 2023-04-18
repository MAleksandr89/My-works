let viewController = (function(){

    let DOMstrings = {
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        form: '#budget-form',
        incomeContainer: '#income__list',
        expenceContainer: '#expenses__list',
        budgetLabel: '#budget-value',
        incomeLabel: '#income-label',
        expenseLabel: '#expense-lable',
        expensePercentLabel: '#expense-persent-lable',
        budgetTable:'#budget-table',
        monthLable:'#month',
        yearLable:'#year',


    }

    function getInput(){
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
        }
    }

    function formatNumber(num, type) {
        let numSplit,int,dec,newInt,resultNumber;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];

        if(int.length > 3) {
            newInt ='';

            for( let i = 0; i < int.length / 3; i++){
                newInt = ',' + int.substring(int.length - 3 * (i + 1), int.length - 3 * i) + newInt;
            };

            if(newInt[0] === ',') {
                newInt = newInt.substring(1);
            }
        } else if (int === '0'){
            newInt = '0';
        } else {
            newInt = int;
        }

        resultNumber = newInt + '.' + dec;

        if( type === 'exp') {
            resultNumber = '- ' + resultNumber;
        } else if (type === 'inc'){
            resultNumber = '+ ' + resultNumber;
        }

        return resultNumber;
    }

    function renderListItem (obj, type) {
        let containerElement, html;

        if(type === 'inc'){
            containerElement = DOMstrings.incomeContainer;
            html = `<li id="inc-%id%" class="budget-list__item item item--income">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                            </div>
                    </li>`
        } else {
            containerElement = DOMstrings.expenceContainer;
            html = `<li id="exp-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">
                            %value%
                            <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                        15%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`
        }

        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.desc);
        newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

        document.querySelector(containerElement).insertAdjacentHTML('beforeend', newHtml);
    }

    function clearFields() {
        let inputDesc, inputVal;

        inputDesc = document.querySelector(DOMstrings.inputDescription);
        inputVal = document.querySelector(DOMstrings.inputValue);

        inputDesc.value = '';
        inputDesc.focus();
        inputVal.value = '';
    }

    function updateBudget(obj){

        if(obj.budget > 0){
            type = 'inc'
        } else {
            type = 'exp';
        }

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.tottalInc, 'inc');
        document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.tottalExp, 'exp');

        if(obj.percentage > 0){
            document.querySelector(DOMstrings.expensePercentLabel).textContent = obj.percentage + ' %';
        } else {
            document.querySelector(DOMstrings.expensePercentLabel).textContent = '--';
        }
    }

    function deleteListItem(itemID){
        document.getElementById(itemID).remove();
    }

    function updateItemPercentage(items) {
        items.forEach(function(item){
            let el = document.getElementById(`exp-${item[0]}`).querySelector('.item__percent');
            
            if(item[1] >= 0){
                el.textContent = item[1] + '%';
            } else {
                el.textContent = '--'
            }
        });
    }

    function displayMonth () {
        let now, year, month;

        now = new Date();
        year = now.getFullYear();
        month = now.getMonth();

        monthArr = [
            'Январь', 'Февраль', 'Март',
            'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'
        ];

        month = monthArr[month]

        document.querySelector(DOMstrings.monthLable).innerText = month;
        document.querySelector(DOMstrings.yearLable).innerText = year;
     }

    return {
        displayMonth: displayMonth,
        updateItemPercentage: updateItemPercentage,
        deleteListItem: deleteListItem,
        clearFields: clearFields,
        renderListItem: renderListItem,
        getInput: getInput,
        updateBudget:updateBudget,
        getDomStrings: function() {
            return DOMstrings;
        }
    }



})();