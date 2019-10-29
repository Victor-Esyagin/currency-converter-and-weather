let city = document.querySelector('#city');
let btn = document.querySelector('#btn');
let fieldWeather = document.querySelector('.field-weather');
let icon = document.querySelector('.icon');
const str1 = 'http://api.openweathermap.org/data/2.5/weather';
const str2 = 'APPID=6ae572344f697b5e490b21052d44a81d';


// По нажатию на кнопку формируем строку запроса к серверу погоды
btn.addEventListener('click', function () {
    let cityValue = city.value;
    let result = cityValue.trim().split(" ").join("&"); //Обрезаем пробелы и заменяем на амперсанд
    let str = `${str1}?q=${result}&units=metric&lang=ru&${str2}`;

    fetch(str) //Отправляем запрос методом
        .then(response => response.json())
        .then(response => { //Выводим информацию о погоде на страницу
            icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}.png"/>`
            fieldWeather.innerHTML = `<p>Погода: ${response.weather[0].description}</p>
            <p>Температура: ${Math.round(response.main.temp)} &#176C</p>
            <p>Влажность: ${response.main.humidity} %</p>
            <p>Видимость: ${response.visibility/1000} км</p>`
        })
        .catch(error => M.toast({
            html: 'Город не найден, попробуйте изменить параметры поиска!',
            classes: 'rounded'
        }));
})