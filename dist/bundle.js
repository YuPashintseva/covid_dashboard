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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getAllCountries\": () => /* binding */ getAllCountries,\n/* harmony export */   \"getTotalByCountry\": () => /* binding */ getTotalByCountry\n/* harmony export */ });\n// API SERVICES\r\n\r\n\r\n/*  INPUT PARAMS: Slug or ISO2\r\n    RETURN COUNTRIES SLUG OR ISO2 LIST DEPENING OF THE INPUT PARAMETER\r\n*/\r\nasync function getAllCountries(countryMode) {\r\n  let response = await fetch('https://api.covid19api.com/countries');\r\n  let data = await response.json();\r\n  const countryList = data.map((item) => {\r\n    if (countryMode === 'Slug') {\r\n      return item.Slug\r\n    } else {\r\n      return item.ISO2;\r\n    }\r\n  });\r\n  return countryList;\r\n}\r\n\r\n// TOTAL CASES BY COUNTRY: CONFIRMED, RECOVERED, DEATHS, ACTIVE\r\nasync function getTotalByCountry(slug) {\r\n  console.log('country:'+slug)\r\n  let response = await fetch(`https://api.covid19api.com/live/country/south-africa/status/confirmed`);\r\n  let data = await response.json();\r\n  console.log('response:'+data)\r\n  const countriesSlug = data.map((item) => {\r\n    let arr = [];\r\n    arr.push(item.Confirmed);\r\n    arr.push(item.Lat);\r\n    arr.push(item.Lon);\r\n    return arr;\r\n  });\r\n  return countriesSlug;\r\n}\r\n\n\n//# sourceURL=webpack://covid/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n\r\n\r\nvar mymap = L.map('mapid').setView([51.505, -0.09], 1.5);\r\n\r\nL.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {\r\n    attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',\r\n    maxZoom: 18,\r\n    id: 'mapbox/streets-v11',\r\n    tileSize: 512,\r\n    zoomOffset: -1,\r\n    accessToken: 'pk.eyJ1IjoieXVwYXNoaW50c2V2YSIsImEiOiJja2lpZmY1eXAyNDJyMnFvNXM1M2F3YzF2In0.JPSKDwKVKULCE83pQoO4vg'\r\n}).addTo(mymap);\r\n\r\n//var marker = L.marker([51.5, -0.09]).addTo(mymap);\r\n/*var circle = L.circle([46.82, 8.23], {\r\n    color: 'red',\r\n    fillColor: '#f03',\r\n    fillOpacity: 0.5,\r\n    radius: 5000\r\n}).addTo(mymap);\r\n*/\r\n\r\n//const countriesSlug  = getAllCountries('ISO2');\r\nlet country='8';\r\n(0,_api__WEBPACK_IMPORTED_MODULE_0__.getAllCountries)('Slug')\r\n  .then(data => {\r\n        country = data[0];\r\n        (0,_api__WEBPACK_IMPORTED_MODULE_0__.getTotalByCountry)(country)\r\n            .then(data2 => {\r\n                makeCircle(data2.slice(-1)[0][1],data2.slice(-1)[0][2]);\r\n            })\r\n            \r\n    }); \r\n//console.log(country);\r\n\r\nfunction makeCircle(lat, lon) {\r\n    var circle = L.circle([lat, lon], {\r\n        color: 'red',\r\n        fillColor: '#f03',\r\n        fillOpacity: 0.5,\r\n        radius: 5000\r\n    }).addTo(mymap);\r\n} \r\n\r\n\r\n\n\n//# sourceURL=webpack://covid/./src/index.js?");

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