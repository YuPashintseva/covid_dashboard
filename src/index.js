import "bootstrap";
import "./styles/scss.scss";
import "./graphic.js";
import {
  createMap,
  ChangeSwitcher,
  changeMapMode,
  NavigateToPoint,
} from "./map";
import graph from "./graphic.js";
createMap();

//
const gr = new graph("allCases", "The World", "all");
gr.drawCheck("allCases", "The World", "all");

function onchange() {
  gr.drawCheck("allCases", "The World", "all");
}
//
const CASESLIST = document.querySelector(".cases__list");
const DEATHSLIST = document.querySelector(".deaths__list");
const RECOVEREDLIST = document.querySelector(".recovered__list");

const CASESGLOBAL = document.querySelector(".cases__global");
const DEATHSGLOBAL = document.querySelector(".deaths__global");
const RECOVEREDGLOBAL = document.querySelector(".recovered__global");

const CASESTITLE = document.querySelector(".cases__title");
const DEATHSTITLE = document.querySelector(".deaths__title");
const RECOVEREDTITLE = document.querySelector(".recovered__title");

const CASESTABLEBODY = document.querySelector(".cases__table-body");

const DATALISTOPTIONS = document.getElementById("datalistOptions");
const FLAGIMG = document.querySelectorAll(".flag-img");
// OPTIONS OF DATE
let options = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
// CHANGE NUMBER, ADD SPACE BETWEEN NUMBERS
function changeNumberAddSpace(n, symbol) {
  return Number(n)
    .toString()
    .replace(/(?!null)(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${symbol}`);
}
// CREATE ARRAY OF LIST
function convertToListItem(country, property) {
  return `<a href="javascript:void(0)" class="list-group-item list-group-item-action deaths__item" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${country.country}</h5>
      <span class="cases__count badge badge-dark text-light fs-5 badge-pill">${changeNumberAddSpace(
        country[property],
        " "
      )}</span>
    </div>
    <p class="mb-1"><img src="${country.countryInfo.flag}" alt="${
    country.country
  }" class="flag-img">
    </p>
    <div class="d-flex w-100 justify-content-between"> 
     <small class="text-info wrap-normal">Population: ${changeNumberAddSpace(
       country.population,
       ","
     )}</small>                        <small class="text-muted">${new Date(
    country.updated
  ).toLocaleString("en-US", options)}</small>
                      </div>
  </a>`;
}

async function getCasesDeathsRecoverd() {
  const url = `https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true`;
  const res = await fetch(url);
  const data = await res.json();
  let globalCases = 0;
  let globalDeaths = 0;
  let globalRecovered = 0;
  let listOptionValue = ``;

  // CREATE CASES LIST
  const casesArray = data
    .sort((country1, country2) => {
      return country1.cases < country2.cases ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(country, "cases");
    })
    .join(" ");
  // CREATE DEATHS LIST
  const deathsArray = data
    .sort((country1, country2) => {
      return country1.deaths < country2.deaths ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(country, "deaths");
    })
    .join(" ");
  // CREATE RECOVERED LIST
  const recoveredArray = data
    .sort((country1, country2) => {
      return country1.recovered < country2.recovered ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(country, "recovered");
    })
    .join(" ");
  //// INSERT IN HTML DOC
  CASESLIST.insertAdjacentHTML("beforeend", casesArray);
  DEATHSLIST.insertAdjacentHTML("beforeend", deathsArray);
  RECOVEREDLIST.insertAdjacentHTML("beforeend", recoveredArray);

  for (let i = 0; i < data.length; i += 1) {
    // CALCULATE ALL CASES IN EVERY GROUP
    globalCases += Number(data[i].cases);
    globalDeaths += Number(data[i].deaths);
    globalRecovered += Number(data[i].recovered);

    // CREATE TAGS OPTION IN DATALIST
    listOptionValue += `<option class="search__item" value="${data[i].country}">`;
  }

  // DATA LIST OPTIONS
  DATALISTOPTIONS.insertAdjacentHTML("beforeend", listOptionValue);

  CASESGLOBAL.textContent = changeNumberAddSpace(globalCases, ",");
  DEATHSGLOBAL.textContent = changeNumberAddSpace(globalDeaths, ",");
  RECOVEREDGLOBAL.textContent = changeNumberAddSpace(globalRecovered, ",");

  // CASES ITEM CLICK
  document.querySelectorAll(".cases__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawCheck(gr.mode, country, gr.proportion);
    });
  });

  // DEATHS ITEM CLICK
  document.querySelectorAll(".deaths__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawCheck(gr.mode, country, gr.proportion);
    });
  });

  // RECOVERED ITEM CLICK
  document.querySelectorAll(".recovered__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawCheck(gr.mode, country, gr.proportion);
    });
  });
}
//mode switchers
document.querySelector("#nav-home-tab").addEventListener("click", function() {
  changeMapMode("total_cases");

  gr.drawCheck("allCases", gr.country, gr.proportion);
});

document
  .querySelector("#nav-profile-tab")
  .addEventListener("click", function() {
    changeMapMode("fatal_cases");
    gr.drawCheck("deaths", gr.country, gr.proportion);
  });

document
  .querySelector("#nav-contact-tab")
  .addEventListener("click", function() {
    changeMapMode("recover_cases");
    gr.drawCheck("recovered", gr.country, gr.proportion);
  });

// FULLSCREEN
// let flagFull = true;
// document.querySelectorAll(".fullscreen").forEach((element) => {
//   element.addEventListener("click", function() {
//     // map
//     if (
//       flagFull &&
//       this.parentNode.classList.contains("col-6") &&
//       this.parentNode.classList.contains("col-sm-6") &&
//       this.parentNode.classList.contains("col-md-6") &&
//       this.parentNode.classList.contains("col-lg-6") &&
//       this.parentNode.classList.contains("col-xl-6")
//     ) {
//       flagFull = false;
//       this.parentNode.classList.remove("col-6");
//       this.parentNode.classList.remove("col-sm-6");
//       this.parentNode.classList.remove("col-md-6");
//       this.parentNode.classList.remove("col-lg-6");
//       this.parentNode.classList.remove("col-xl-6");
//       this.parentNode.classList.add("full");
//     } else {
//       flagFull = true;
//       this.parentNode.classList.add("col-6");
//       this.parentNode.classList.add("col-sm-6");
//       this.parentNode.classList.add("col-md-6");
//       this.parentNode.classList.add("col-lg-6");
//       this.parentNode.classList.add("col-xl-6");
//       this.parentNode.classList.remove("full");
//     }
//     // Cases by Country
//     // Global Deaths
//     // Recovered
//     // Graphic
//   });
// });

getCasesDeathsRecoverd();

// FOR TOP SWITCHER START
document.querySelector("#switch_count").addEventListener("click", function() {
  if (this.getAttribute("value") === "absolute") {
    this.setAttribute("value", "permillion");
  } else {
    this.setAttribute("value", "absolute");
  }
  let switchdays = document.querySelector("#switch_day").getAttribute("value");
  ChangeSwitcher(this.getAttribute("value"), switchdays);
});

document.querySelector("#switch_day").addEventListener("click", function() {
  if (this.getAttribute("value") === "alldays") {
    this.setAttribute("value", "oneday");
  } else {
    this.setAttribute("value", "alldays");
  }
  let switchcount = document
    .querySelector("#switch_count")
    .getAttribute("value");
  ChangeSwitcher(switchcount, this.getAttribute("value"));
});
// FOR TOP SWITCHER END

// FOR DEFAULT MAP MODE START
//changeMapMode('active_cases');
//changeMapMode('recover_cases');
//changeMapMode('fatal_cases');
//changeMapMode('total_cases');
// FOR DEFAULT MAP MODE END

// FOR NAVIGATE ON MAP
// 33 - latitude, 65 - longitude
//NavigateToPoint(33,65);
