import { getTotalByAllCountries } from './api';
const groupPerMillion = L.featureGroup();
const groupTotalCases = L.featureGroup();    
let mymap = '';
export function createMap() {
  mymap = L.map('mapid').setView([51.505, -0.09], 2);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'yupashintseva/ckioco3iw4nro17p9d1vxbr14',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoieXVwYXNoaW50c2V2YSIsImEiOiJja2lpZmY1eXAyNDJyMnFvNXM1M2F3YzF2In0.JPSKDwKVKULCE83pQoO4vg'
  }).addTo(mymap);
  let totalCases = '';
  getTotalByAllCountries()
      .then(data => {
          totalCases = data; 
          (totalCases).map((countryItem) => {
              makeCircle(countryItem.countryInfo.lat, countryItem.countryInfo.long, defineRadius(countryItem.casesPerOneMillion), countryItem.country,
              [countryItem.casesPerOneMillion/10, countryItem.deathsPerOneMillion/10, countryItem.activePerOneMillion/10, countryItem.recoveredPerOneMillion/10], 
              [countryItem.cases, countryItem.deaths, countryItem.active, countryItem.recovered]);
              return countryItem;
          })
        }); 

  document.querySelector('.switcher label').addEventListener("click", function(){
    if (this.getAttribute("value") === "absolute") {
      this.setAttribute("value", "permillion");
      mymap.removeLayer(groupTotalCases);
      mymap.addLayer(groupPerMillion);
    } else {
      this.setAttribute("value", "absolute");
      mymap.removeLayer(groupPerMillion);
      mymap.addLayer(groupTotalCases);
    }
  })
}

const arrayOfSpots = [];
function makeCircle(lat, lon, rad, countryName, statistic, statisticTotal) {
    var circle = L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: rad
    }).addTo(groupPerMillion);
    const localArr = [];
    localArr.push(circle);
    localArr.push(statistic);
    arrayOfSpots.push(localArr);

    circle.addEventListener("click", function() {
      mymap.setView([lat, lon], 5);
      var popup = L.popup()
      .setLatLng([lat, lon])
      .setContent(`<table>
                    <caption style="font-size: 20px;">${countryName}</caption>
                    <tr><th style="color: red">Cases: ${statistic[0]}</th></tr>
                    <tr><th style="color: orange">Active cases: ${statistic[2]}</th></tr>
                    <tr><th style="color: green">Recovered: ${statistic[3]}</th></tr>
                    <tr><th style="color: grey">Fatality ratio: ${statistic[1]}</th></tr>
                  </table>`)
      .openOn(mymap);
    });
    //mymap.addLayer(groupPerMillion);
    var circle2 = L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: rad
    }).addTo(groupTotalCases);
    const localArr2 = [];
    localArr2.push(circle2);
    localArr2.push(statisticTotal);
    arrayOfSpots.push(localArr2);

    circle2.addEventListener("click", function() {
      mymap.setView([lat, lon], 5);
      var popup = L.popup()
      .setLatLng([lat, lon])
      .setContent(`<table>
                    <caption style="font-size: 20px;">${countryName}</caption>
                    <tr><th style="color: red">Cases: ${statisticTotal[0]}</th></tr>
                    <tr><th style="color: orange">Active cases: ${statisticTotal[2]}</th></tr>
                    <tr><th style="color: green">Recovered: ${statisticTotal[3]}</th></tr>
                    <tr><th style="color: grey">Fatality ratio: ${statisticTotal[1]}</th></tr>
                  </table>`)
      .openOn(mymap);
    });
    mymap.addLayer(groupTotalCases);
} 

 

  const mapTabs = document.querySelectorAll('.tab__links');
  mapTabs.forEach((item) => {
    item.addEventListener("click", changeMapMode);
  })
  function changeMapMode() {
    let spotColor = 'red';
    let statisticIdx = 0;
    if (this.id === 'active_cases') {
      spotColor = 'orange';
      statisticIdx = 2;
    } else if (this.id === 'recover_cases') {
      spotColor = 'green';
      statisticIdx = 3;
    } else if (this.id === 'fatal_cases') {
      spotColor = 'white';
      statisticIdx = 1;
    }

    arrayOfSpots.forEach((spot) => {
      spot[0].setStyle({
        color: spotColor,
        fillColor: spotColor
      });
      let radius = 0;
      spot[1][statisticIdx] !== null ? radius = defineRadius(spot[1][statisticIdx]) : radius = 0;
      spot[0].setRadius(radius);
    })
  }

  function defineRadius(cases) {
    let radius = 0;
    if ((cases>=1)&&(cases<1000)) {
      radius = 10000;
    } else if ((cases>=1000)&&(cases<3000)) {
      radius = 40000;
    } else if ((cases>=3000)&&(cases<20000)) {
      radius = 80000;
    } else if ((cases>=20000)&&(cases<50000)) {
      radius = 120000;
    } else if ((cases>=50000)&&(cases<100000)) {
      radius = 160000;
    } else if ((cases>=100000)&&(cases<250000)) {
      radius = 200000;
    } else if ((cases>=250000)&&(cases<400000)) {
      radius = 240000;
    } else if ((cases>=400000)&&(cases<500000)) {
      radius = 280000;
    } else if ((cases>=500000)&&(cases<1000000)) {
      radius = 320000;
    } else if ((cases>=1000000)&&(cases<5000000)) {
      radius = 360000;
    }
    return radius;
  }


