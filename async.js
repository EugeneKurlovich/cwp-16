const axios = require('axios');
const bluebird = require('bluebird');

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`).then(function(response){
console.log(response.data.results[0].formatted_address);
});

start();

async function start()
{
    let cityCountry = await bluebird.all(
        [
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Madrid`),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Rome`)
        ]
    );

    console.log("Information about Minsk, Madrid, Rome :");

    cityCountry.forEach((i)=>
    {
        console.log(i.data.results[0].formatted_address);
    });

console.log("-------------------------");

    let country = await bluebird.any(
        [
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Paris`),
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Nice`)
        ]
    );
    console.log("Nice and Paris in : " + country.data.results[0].formatted_address.split(", ")[1]);
}