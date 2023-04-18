
//Скролл на вверх страницы//
const backTopBtn = document.querySelector('#backtop');

backTopBtn.style.opacity = 0;

document.addEventListener('scroll', function(){
    if(window.pageYOffset > 300){
        backTopBtn.style.opacity = 1;
    }else{
        backTopBtn.style.opacity = 0;
    }
})



$(document).ready(function(){
    let containerEl = document.querySelector("#mix-card");
    let mixed = mixitup(containerEl,{
        classNames:{
            block:''
        }
    })
})


const formItems = document.querySelectorAll('.form-item');

for(let item of formItems){
    const thisParent = item.closest('.form');
    const thisPlaceholder = thisParent.querySelector('.fake-text');
    //Если инпут в фокусе
    item.addEventListener('focus',function(){
        thisPlaceholder.classList.add('fake-text--active');
    });
    //Если инпут теряет фокус
    item.addEventListener('blur', function(){
        if(item.value.length > 0){
            thisPlaceholder.classList.add('fake-text--active');
        }
        else{
            thisPlaceholder.classList.remove('fake-text--active');
        }
    })
};

$('.section__contact-form').validate({
    rules:{
        email:{
            required: true,
            email: true
        },
        message:{
            required: true,
        }
    },
    message:{
        email:{
            required:'Введите email',
            email: 'Отсутствует символ @'
        },
        message:{
            required: 'Поле не должно быть пустым',
        }
    },
    SubmitHandler: function(form){
        ajaxFormSubmit();
    }
});

