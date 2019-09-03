let eur = document.querySelector('#eur');
let field = document.querySelector('.field');
let currency = document.querySelectorAll('.btn-small');

//Отправляем запрос 
fetch('http://data.fixer.io/api/latest?access_key=9a9804d7634031255ca92a46fd295daa&symbols= USD , RUB, CHF, CNY, JPY , UAH')

    .then(response => response.json())
    .then(response => {
        currency.forEach(function (element) { //Проходим циклом по кнопкам
            element.addEventListener('click', function () { //При нажатии на кнопку отлавливаем событие клик
                if (eur.value < 0) { //Проверка инпута на < 0
                    M.toast({
                        html: 'Количество должно быть больше нуля!',
                        classes: 'rounded'
                    });
                    eur.value = '';
                };

                let cod = this.getAttribute('data'); //Получаем атрибут дата нажатой кнопки
                field.innerHTML = Math.round(eur.value * response.rates[cod]) + ' ' + [cod]; //Выводим на страницу валюту
            })
        });
    })
    .catch(error => M.toast({
        html: 'Ошибка!',
        classes: 'rounded'
    }));