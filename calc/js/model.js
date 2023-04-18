let modelController = (function(){

    let Income = function(id, description, value) {
        this.id = id;
        this.desc = description;
        this.value = value;
    };
    let Expense = function(id, description, value) {
        this.id = id;
        this.desc = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPersentage = function() {
        return this.percentage;
    }



    function addItem (type, desc, val) {
        let newItem, ID;
        ID = 0;
        //Генерируем ID
        if( data.allItems[type].length > 0){
            let = lastIndex = data.allItems[type].length - 1
            ID = data.allItems[type][lastIndex].id + 1;
        } else {
            ID = 0;
        }
        //Взависимости от типа записи использьзуем соответсвующий конструктор и используем обьект
        if(type === 'inc') {
            newItem = new Income(ID, desc, parseFloat(val) );
        } else if (type === 'exp'){
            newItem = new Expense(ID, desc, parseFloat(val));
        }
        //Записываем "Запись" /Обьект в нашу структуру данных
        data.allItems[type].push(newItem);
        //Возвращаем новый обьект


        return newItem;

    }

    function deleteItem(type, id){
        let ids,index;
        //Находим запись по ID в массиве с доходами или расходами
        ids = data.allItems[type].map(function(item){
            return item.id;
        });
        //2.Удалить найденную запись из массива
        index = ids.indexOf(id);
        if(index !== -1){
            data.allItems[type].splice(index, 1);
        }
    }

    function calculateTotalSumm(type){
        let summ = 0;

        data.allItems[type].forEach(function(item){
            summ = summ + item.value;
        });
        return summ;
    }
    function calculateBudget(){
        //Посчитать все доходы
        data.totals.inc = calculateTotalSumm("inc");
        //Посчитать все расходы
        data.totals.exp = calculateTotalSumm("exp");
        //Посчитать общий бюджет
        data.budget = data.totals.inc - data.totals.exp;

        //Посчитать % для расходов
        if (data.totals.inc){
            data.percentage = Math.round((data.totals.exp / data.totals.inc)* 100);
        } else {
            data.percentage = -1;
        }
        
    }
    function getBudget () {
        return {
            budget: data.budget,
            tottalInc: data.totals.inc,
            tottalExp: data.totals.exp,
            percentage: data.percentage,
        }
    }

    function calculatePersentage() {
        data.allItems.exp.forEach(function(item){
            item.calcPercentage(data.totals.inc);
        })
    }

    function getAllIdAdnPercentage(){
        
        let allPerc = data.allItems.exp.map(function(item){
            return [item.id, item.getPersentage()];
        });

        return allPerc;
    };

    let data = {
        allItems: {
            inc:[],
            exp: []
        },
        totals: {
            inc:0,
            exp:0
        },
        budget: 0,
        percentage: -1,
    }

    return {
        getAllIdAdnPercentage: getAllIdAdnPercentage,
        calculatePersentage: calculatePersentage,
        deleteItem: deleteItem,
        getBudget: getBudget,
        calculateBudget: calculateBudget,
        addItem: addItem,
        test: function(){
            console.log(data);
        }
    }
})();