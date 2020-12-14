import { getAllCountries, getTotal, getTotalByAllCountries } from './api';

var mymap = L.map('mapid').setView([51.505, -0.09], 1.5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieXVwYXNoaW50c2V2YSIsImEiOiJja2lpZmY1eXAyNDJyMnFvNXM1M2F3YzF2In0.JPSKDwKVKULCE83pQoO4vg'
}).addTo(mymap);



let totalCases = '';

getTotalByAllCountries()
    .then(data => {
        totalCases = data; 
        (totalCases).map((countryItem) => {
            makeCircle(countryItem.countryInfo.lat, countryItem.countryInfo.long, countryItem.cases/50);
            return countryItem;
        })
      }); 


function makeCircle(lat, lon, rad) {
    var circle = L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: rad
    }).addTo(mymap);
} 


