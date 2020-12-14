import { getTotalByAllCountries } from './api';

var mymap = L.map('mapid').setView([51.505, -0.09], 1.5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'yupashintseva/ckioco3iw4nro17p9d1vxbr14',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieXVwYXNoaW50c2V2YSIsImEiOiJja2lpZmY1eXAyNDJyMnFvNXM1M2F3YzF2In0.JPSKDwKVKULCE83pQoO4vg'
}).addTo(mymap);


let totalCases = '';
const arrayOfSpots = [];
getTotalByAllCountries()
    .then(data => {
        totalCases = data; 
        (totalCases).map((countryItem) => {
            makeCircle(countryItem.countryInfo.lat, countryItem.countryInfo.long, countryItem.cases/100);
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
    arrayOfSpots.push(circle);
} 
/*
const bookmarksControl = new L.Control.Bookmarks({
    position: 'topright',
    onRemove: function(bookmark, callback) {
      map.fire('modal', {
        title: 'Are you sure?',
        content: '<p>Do you wnat to remove bookmark <strong>' + bookmark.name + '</strong>?</p>',
        template: ['<div class="modal-header"><h2>{title}</h2></div>',
          '<hr>',
          '<div class="modal-body">{content}</div>',
          '<div class="modal-footer">',
          '<button class="topcoat-button--large {OK_CLS}">{okText}</button>',
          '<button class="topcoat-button--large {CANCEL_CLS}">{cancelText}</button>',
          '</div>'
        ].join(''),
        okText: 'Ok',
        cancelText: 'Cancel',
        OK_CLS: 'modal-ok',
        CANCEL_CLS: 'modal-cancel',
        width: 300
      });
    },
  });*/
  var control = new L.Control.Bookmarks().addTo(mymap);
  
  mymap.fire('bookmark:add', {
    data: {
      id: '1', // make sure it's unique,
      name: 'Bookmark name',
      latlng: [9, 168], // important, we're dealing with JSON here,
      zoom: 5,
      your_key: 'test'
    }
  });
  //mymap.addControl(bookmarksControl);
  

  const mapTabs = document.querySelectorAll('.tab__links');
  mapTabs.forEach((item) => {
    item.addEventListener("click", changeMapMode);
  })

  function changeMapMode() {
    console.log(arrayOfSpots);
    let spotColor = 'red';
    if (this.id === 'active_cases') {
      spotColor = 'orange';
    } else if (this.id === 'recover_cases') {
      spotColor = 'green';
    } else if (this.id === 'fatal_cases') {
      spotColor = 'white';
    }
    arrayOfSpots.forEach((spot) => {
      spot.setStyle({
        color: spotColor,
        fillColor: spotColor
      });
      spot.setRadius(100);
    })
  }
  //console.log(mapTabs)