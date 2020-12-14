/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getTotalByAllCountries\": () => /* binding */ getTotalByAllCountries\n/* harmony export */ });\n// API SERVICES\r\n\r\n// ANOTHER API https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true\r\n\r\nasync function getTotalByAllCountries() {\r\n  let response = await fetch('https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true');\r\n  let data = await response.json();\r\n  return data;\r\n}\r\n\r\n\n\n//# sourceURL=webpack://covid/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n\r\n\r\nvar mymap = L.map('mapid').setView([51.505, -0.09], 1.5);\r\nL.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {\r\n    attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',\r\n    maxZoom: 18,\r\n    id: 'yupashintseva/ckioco3iw4nro17p9d1vxbr14',\r\n    tileSize: 512,\r\n    zoomOffset: -1,\r\n    accessToken: 'pk.eyJ1IjoieXVwYXNoaW50c2V2YSIsImEiOiJja2lpZmY1eXAyNDJyMnFvNXM1M2F3YzF2In0.JPSKDwKVKULCE83pQoO4vg'\r\n}).addTo(mymap);\r\n\r\n\r\nlet totalCases = '';\r\nconst arrayOfSpots = [];\r\n(0,_api__WEBPACK_IMPORTED_MODULE_0__.getTotalByAllCountries)()\r\n    .then(data => {\r\n        totalCases = data; \r\n        (totalCases).map((countryItem) => {\r\n            makeCircle(countryItem.countryInfo.lat, countryItem.countryInfo.long, countryItem.cases/100);\r\n            return countryItem;\r\n        })\r\n      }); \r\n\r\nfunction makeCircle(lat, lon, rad) {\r\n    var circle = L.circle([lat, lon], {\r\n        color: 'red',\r\n        fillColor: '#f03',\r\n        fillOpacity: 0.5,\r\n        radius: rad\r\n    }).addTo(mymap);\r\n    arrayOfSpots.push(circle);\r\n} \r\n/*\r\nconst bookmarksControl = new L.Control.Bookmarks({\r\n    position: 'topright',\r\n    onRemove: function(bookmark, callback) {\r\n      map.fire('modal', {\r\n        title: 'Are you sure?',\r\n        content: '<p>Do you wnat to remove bookmark <strong>' + bookmark.name + '</strong>?</p>',\r\n        template: ['<div class=\"modal-header\"><h2>{title}</h2></div>',\r\n          '<hr>',\r\n          '<div class=\"modal-body\">{content}</div>',\r\n          '<div class=\"modal-footer\">',\r\n          '<button class=\"topcoat-button--large {OK_CLS}\">{okText}</button>',\r\n          '<button class=\"topcoat-button--large {CANCEL_CLS}\">{cancelText}</button>',\r\n          '</div>'\r\n        ].join(''),\r\n        okText: 'Ok',\r\n        cancelText: 'Cancel',\r\n        OK_CLS: 'modal-ok',\r\n        CANCEL_CLS: 'modal-cancel',\r\n        width: 300\r\n      });\r\n    },\r\n  });*/\r\n  var control = new L.Control.Bookmarks().addTo(mymap);\r\n  \r\n  mymap.fire('bookmark:add', {\r\n    data: {\r\n      id: '1', // make sure it's unique,\r\n      name: 'Bookmark name',\r\n      latlng: [9, 168], // important, we're dealing with JSON here,\r\n      zoom: 5,\r\n      your_key: 'test'\r\n    }\r\n  });\r\n  //mymap.addControl(bookmarksControl);\r\n  \r\n\r\n  const mapTabs = document.querySelectorAll('.tab__links');\r\n  mapTabs.forEach((item) => {\r\n    item.addEventListener(\"click\", changeMapMode);\r\n  })\r\n\r\n  function changeMapMode() {\r\n    console.log(arrayOfSpots);\r\n    let spotColor = 'red';\r\n    if (this.id === 'active_cases') {\r\n      spotColor = 'orange';\r\n    } else if (this.id === 'recover_cases') {\r\n      spotColor = 'green';\r\n    } else if (this.id === 'fatal_cases') {\r\n      spotColor = 'white';\r\n    }\r\n    arrayOfSpots.forEach((spot) => {\r\n      spot.setStyle({\r\n        color: spotColor,\r\n        fillColor: spotColor\r\n      });\r\n      spot.setRadius(100);\r\n    })\r\n  }\r\n  //console.log(mapTabs)\n\n//# sourceURL=webpack://covid/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;