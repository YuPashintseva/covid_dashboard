import { getAllCountries, getTotalByCountry } from './api';

var mymap = L.map('mapid').setView([51.505, -0.09], 1.5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieXVwYXNoaW50c2V2YSIsImEiOiJja2lpZmY1eXAyNDJyMnFvNXM1M2F3YzF2In0.JPSKDwKVKULCE83pQoO4vg'
}).addTo(mymap);

//var marker = L.marker([51.5, -0.09]).addTo(mymap);
/*var circle = L.circle([46.82, 8.23], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 5000
}).addTo(mymap);
*/

//const countriesSlug  = getAllCountries('ISO2');
let country='8';
getAllCountries('Slug')
  .then(data => {
        country = data[0];
        getTotalByCountry(country)
            .then(data2 => {
                makeCircle(data2.slice(-1)[0][1],data2.slice(-1)[0][2]);
            })
            
    }); 
//console.log(country);

function makeCircle(lat, lon) {
    var circle = L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 5000
    }).addTo(mymap);
} 


