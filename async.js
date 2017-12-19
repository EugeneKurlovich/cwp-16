const axios = require('axios');
const Promise = require('bluebird');

Func();

async function Func() {
    // 1. С помощью Google Geocode API отправим параллельные запросы на информацию о городах - Минск, Мадрид, Рим. Из ответов выведем соответствия город - страна
    let cities = await Promise.all([
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Madrid`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Rome`)
    ]);
    cities.forEach((city) => {
        console.log(city.data.results[0].formatted_address);
    });

    // 2. С помощью Promise.any получим страну этих городов - Париж, Ницца
    let country = await Promise.any([
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Paris`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Nice`)
    ]);
    console.log('COUNTRY= ' + country.data.results[0].formatted_address);

    // 3. Получим информацию об улице Via Nicola Salvi и последовательно получим координаты для всех элементов из address_components
    let street = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Via Nicola Salvi`);
    console.log(street.data.results[0].formatted_address);
    street.data.results[0].address_components.forEach((component) => {
        console.log(component.long_name);
});
}