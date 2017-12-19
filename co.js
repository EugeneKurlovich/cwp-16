const axios = require('axios');
const Promise = require('bluebird');
const geolib = require('geolib');
const co = require('co');

Func();

async function Func() {
    await co(function* () {
        const value = yield Promise.all(
            [
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Brest`),
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`)
            ])
        console.log("Расстояние между Брестом и Минском : " + geolib.getDistance(value[0].data.results[0].geometry.location, value[1].data.results[0].geometry.location));

        let val = yield Promise.all([
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Copenhagen`),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Oslo`),
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Brussel`)
        ])
        let cities = {};
        val.map((city) => {
            console.log(city.data.results[0].formatted_address);
            cities[city.data.results[0].formatted_address] = city.data.results[0].geometry.location;
        });


        let v = yield Promise.all([
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Piazza del Сolosseo`)
        ])
        console.log(v[0].data.results[0].formatted_address);
        v[0].data.results[0].address_components.forEach((component) => {
            console.log(`   -${component.long_name}`);
        });
    });
}