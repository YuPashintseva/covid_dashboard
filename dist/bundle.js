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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/map */ \"./src/map.js\");\n\r\n(0,_src_map__WEBPACK_IMPORTED_MODULE_0__.createMap)();\n\n//# sourceURL=webpack://covid/./src/index.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*
  !*** ./src/map.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createMap\": () => /* binding */ createMap\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n\r\nconst groupPerMillion = L.featureGroup();\r\nconst groupTotalCases = L.featureGroup();    \r\nlet mymap = '';\r\nfunction createMap() {\r\n  mymap = L.map('mapid').setView([51.505, -0.09], 2);\r\n  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {\r\n      attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',\r\n      maxZoom: 18,\r\n      id: 'yupashintseva/ckioco3iw4nro17p9d1vxbr14',\r\n      tileSize: 512,\r\n      zoomOffset: -1,\r\n      accessToken: 'pk.eyJ1IjoieXVwYXNoaW50c2V2YSIsImEiOiJja2lpZmY1eXAyNDJyMnFvNXM1M2F3YzF2In0.JPSKDwKVKULCE83pQoO4vg'\r\n  }).addTo(mymap);\r\n  let totalCases = '';\r\n  (0,_api__WEBPACK_IMPORTED_MODULE_0__.getTotalByAllCountries)()\r\n      .then(data => {\r\n          totalCases = data; \r\n          (totalCases).map((countryItem) => {\r\n              makeCircle(countryItem.countryInfo.lat, countryItem.countryInfo.long, defineRadius(countryItem.casesPerOneMillion), countryItem.country,\r\n              [countryItem.casesPerOneMillion/10, countryItem.deathsPerOneMillion/10, countryItem.activePerOneMillion/10, countryItem.recoveredPerOneMillion/10], \r\n              [countryItem.cases, countryItem.deaths, countryItem.active, countryItem.recovered]);\r\n              return countryItem;\r\n          })\r\n        }); \r\n\r\n  document.querySelector('.switcher label').addEventListener(\"click\", function(){\r\n    if (this.getAttribute(\"value\") === \"absolute\") {\r\n      this.setAttribute(\"value\", \"permillion\");\r\n      mymap.removeLayer(groupTotalCases);\r\n      mymap.addLayer(groupPerMillion);\r\n    } else {\r\n      this.setAttribute(\"value\", \"absolute\");\r\n      mymap.removeLayer(groupPerMillion);\r\n      mymap.addLayer(groupTotalCases);\r\n    }\r\n  })\r\n}\r\n\r\nconst arrayOfSpots = [];\r\nfunction makeCircle(lat, lon, rad, countryName, statistic, statisticTotal) {\r\n    var circle = L.circle([lat, lon], {\r\n        color: 'red',\r\n        fillColor: '#f03',\r\n        fillOpacity: 0.5,\r\n        radius: rad\r\n    }).addTo(groupPerMillion);\r\n    const localArr = [];\r\n    localArr.push(circle);\r\n    localArr.push(statistic);\r\n    arrayOfSpots.push(localArr);\r\n\r\n    circle.addEventListener(\"mouseover\", function() {\r\n   //   mymap.setView([lat, lon], 5);\r\n      var popup = L.popup()\r\n      .setLatLng([lat, lon])\r\n      .setContent(`<table>\r\n                    <caption style=\"font-size: 20px;\">${countryName}</caption>\r\n                    <tr><th style=\"color: red\">Cases: ${statistic[0]}</th></tr>\r\n                    <tr><th style=\"color: orange\">Active cases: ${statistic[2]}</th></tr>\r\n                    <tr><th style=\"color: green\">Recovered: ${statistic[3]}</th></tr>\r\n                    <tr><th style=\"color: grey\">Fatality ratio: ${statistic[1]}</th></tr>\r\n                  </table>`)\r\n      .openOn(mymap);\r\n    });\r\n    circle.addEventListener(\"click\", function() {\r\n         mymap.setView([lat, lon], 5);\r\n    });\r\n    //mymap.addLayer(groupPerMillion);\r\n    var circle2 = L.circle([lat, lon], {\r\n        color: 'red',\r\n        fillColor: '#f03',\r\n        fillOpacity: 0.5,\r\n        radius: rad\r\n    }).addTo(groupTotalCases);\r\n    const localArr2 = [];\r\n    localArr2.push(circle2);\r\n    localArr2.push(statisticTotal);\r\n    arrayOfSpots.push(localArr2);\r\n\r\n    circle2.addEventListener(\"mouseover\", function() {\r\n    //  mymap.setView([lat, lon], 5);\r\n      var popup = L.popup()\r\n      .setLatLng([lat, lon])\r\n      .setContent(`<table>\r\n                    <caption style=\"font-size: 20px;\">${countryName}</caption>\r\n                    <tr><th style=\"color: red\">Cases: ${statisticTotal[0]}</th></tr>\r\n                    <tr><th style=\"color: orange\">Active cases: ${statisticTotal[2]}</th></tr>\r\n                    <tr><th style=\"color: green\">Recovered: ${statisticTotal[3]}</th></tr>\r\n                    <tr><th style=\"color: grey\">Fatality ratio: ${statisticTotal[1]}</th></tr>\r\n                  </table>`)\r\n      .openOn(mymap);\r\n    });\r\n    circle2.addEventListener(\"click\", function() {\r\n        mymap.setView([lat, lon], 5);\r\n    });\r\n    mymap.addLayer(groupTotalCases);\r\n} \r\n\r\n \r\n\r\n  const mapTabs = document.querySelectorAll('.tab__links');\r\n  mapTabs.forEach((item) => {\r\n    item.addEventListener(\"click\", changeMapMode);\r\n  })\r\n  function changeMapMode() {\r\n    let spotColor = 'red';\r\n    let statisticIdx = 0;\r\n    if (this.id === 'active_cases') {\r\n      spotColor = 'orange';\r\n      statisticIdx = 2;\r\n    } else if (this.id === 'recover_cases') {\r\n      spotColor = 'green';\r\n      statisticIdx = 3;\r\n    } else if (this.id === 'fatal_cases') {\r\n      spotColor = 'white';\r\n      statisticIdx = 1;\r\n    }\r\n\r\n    arrayOfSpots.forEach((spot) => {\r\n      spot[0].setStyle({\r\n        color: spotColor,\r\n        fillColor: spotColor\r\n      });\r\n      let radius = 0;\r\n      spot[1][statisticIdx] !== null ? radius = defineRadius(spot[1][statisticIdx]) : radius = 0;\r\n      spot[0].setRadius(radius);\r\n    })\r\n  }\r\n\r\n  function defineRadius(cases) {\r\n    let radius = 0;\r\n    if ((cases>=1)&&(cases<1000)) {\r\n      radius = 10000;\r\n    } else if ((cases>=1000)&&(cases<3000)) {\r\n      radius = 40000;\r\n    } else if ((cases>=3000)&&(cases<20000)) {\r\n      radius = 80000;\r\n    } else if ((cases>=20000)&&(cases<50000)) {\r\n      radius = 120000;\r\n    } else if ((cases>=50000)&&(cases<100000)) {\r\n      radius = 160000;\r\n    } else if ((cases>=100000)&&(cases<250000)) {\r\n      radius = 200000;\r\n    } else if ((cases>=250000)&&(cases<400000)) {\r\n      radius = 240000;\r\n    } else if ((cases>=400000)&&(cases<500000)) {\r\n      radius = 280000;\r\n    } else if ((cases>=500000)&&(cases<1000000)) {\r\n      radius = 320000;\r\n    } else if ((cases>=1000000)&&(cases<5000000)) {\r\n      radius = 360000;\r\n    }\r\n    return radius;\r\n  }\r\n\r\n\r\n\n\n//# sourceURL=webpack://covid/./src/map.js?");

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