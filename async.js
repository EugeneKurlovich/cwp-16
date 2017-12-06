const axios = require('axios');


axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`).then(function(response){
console.log(response.data.results[0].formatted_address);
});