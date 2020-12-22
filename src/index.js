import "bootstrap";
import "./styles/scss.scss";
import "./graphic.js";
import {
  createMap,
  ChangeSwitcher,
  changeMapMode,
  NavigateToCountry,
} from "./map";
import graph from "./graphic.js";
createMap();

//
const gr = new graph("allCases", "The World", "all");
gr.drawCheck("allCases", "The World", "all");
window.onresize = () => gr.drawCheck(gr.mode, gr.country, gr.proportion);
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
let INITIAL_DATASET = [];
const LASTDAY = "Last Day";
//
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
function convertToListItem(country, property, classItem, badgeColor) {
  return `<a href="javascript:void(0)" class="list-group-item list-group-item-action ${classItem}" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${country.country}</h5>
      <span class="cases__count badge ${badgeColor} text-light fs-5 badge-pill">${changeNumberAddSpace(
    country['displayValue' + property],
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
// get DATA BASE
async function getDataBase() {
  const url = `https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function getCasesDeathsRecoverd() {
  let data = await getDataBase();
  INITIAL_DATASET = data;
  draw('', 'cases', 'absolute', 'alldays' );
  return;
}

// Get for the one Day ***********************************************
async function getCasesDeathsRecoverdOneDay() {
  let data = await getDataBase();
  let globalCases = 0;
  let globalDeaths = 0;
  let globalRecovered = 0;
  let listOptionValue = ``;
  // ADD TITLE
  CASESTITLE.textContent = LASTDAY;
  DEATHSTITLE.textContent = LASTDAY;
  RECOVEREDTITLE.textContent = LASTDAY;
  // CLEAR LIST BLOCK
  CASESLIST.innerHTML = "";
  DEATHSLIST.innerHTML = "";
  RECOVEREDLIST.innerHTML = "";
  // CREATE CASES LIST

  const casesArray = data
    .sort((country1, country2) => {
      return country1.todayCases < country2.todayCases ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "todayCases",
        "cases__item",
        "badge-warning"
      );
    })
    .join(" ");

  // CREATE DEATHS LIST
  const deathsArray = data
    .sort((country1, country2) => {
      return country1.todayDeaths < country2.todayDeaths ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "todayDeaths",
        "deaths__item",
        "badge-dark"
      );
    })
    .join(" ");
  // CREATE RECOVERED LIST
  const recoveredArray = data
    .sort((country1, country2) => {
      return country1.todayRecovered < country2.todayRecovered ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "todayRecovered",
        "recovered__item",
        "badge-success"
      );
    })
    .join(" ");
  //// INSERT IN HTML DOC
  CASESLIST.insertAdjacentHTML("beforeend", casesArray);
  DEATHSLIST.insertAdjacentHTML("beforeend", deathsArray);
  RECOVEREDLIST.insertAdjacentHTML("beforeend", recoveredArray);

  for (let i = 0; i < data.length; i += 1) {
    // CALCULATE ALL CASES IN EVERY GROUP
    globalCases += Number(data[i].todayCases);
    globalDeaths += Number(data[i].todayDeaths);
    globalRecovered += Number(data[i].todayRecovered);

    // CREATE TAGS OPTION IN DATALIST
    // listOptionValue += `<option class="search__item" value="${data[i].country}">`;
  }

  // DATA LIST OPTIONS
  //DATALISTOPTIONS.insertAdjacentHTML("beforeend", listOptionValue);

  CASESGLOBAL.textContent = changeNumberAddSpace(globalCases, ",");
  DEATHSGLOBAL.textContent = changeNumberAddSpace(globalDeaths, ",");
  RECOVEREDGLOBAL.textContent = changeNumberAddSpace(globalRecovered, ",");

  // CASES ITEM CLICK
  document.querySelectorAll(".cases__item").forEach((element) => {
    element.addEventListener("click", function () {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // DEATHS ITEM CLICK
  document.querySelectorAll(".deaths__item").forEach((element) => {
    element.addEventListener("click", function () {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // RECOVERED ITEM CLICK
  document.querySelectorAll(".recovered__item").forEach((element) => {
    element.addEventListener("click", function () {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });
}

//mode switchers
document.querySelector('#nav-home-tab').addEventListener("click", function() {
  changeMapMode('cases');
  gr.drawChart("cases", gr.country, gr.proportion);
});

document
  .querySelector("#nav-profile-tab")
  .addEventListener("click", function () {
    changeMapMode("deaths");
    gr.drawChart("deaths", gr.country, gr.proportion);
  });

document
  .querySelector("#nav-contact-tab")
  .addEventListener("click", function () {
    changeMapMode("recovered");
    gr.drawChart("recovered", gr.country, gr.proportion);
  });

// FULLSCREEN
// let flagFull = true;
// document.querySelectorAll(".fullscreen").forEach((element) => {
//   element.addEventListener("click", function () {
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
document
  .querySelector("#flexSwitchCheckChecked")
  .addEventListener("click", function () {
    if (this.getAttribute("value") === "absolute") {
      this.setAttribute("value", "permillion");
      gr.drawCheck(gr.mode, gr.country, "100");
    } else {
      this.setAttribute("value", "absolute");
      gr.drawCheck(gr.mode, gr.country, "all");
    }
    let switchdays = document
      .querySelector("#switch_day")
      .getAttribute("value");
    ChangeSwitcher(this.getAttribute("value"), switchdays);
  });

document.querySelector("#switch_day").addEventListener("click", function () {
  if (this.getAttribute("value") === "alldays") {
    this.setAttribute("value", "oneday");
    getCasesDeathsRecoverdOneDay();
  } else {
    this.setAttribute("value", "alldays");
    getCasesDeathsRecoverd();
  }
  let switchcount = document
    .querySelector("#flexSwitchCheckChecked")
    .getAttribute("value");
  ChangeSwitcher(switchcount, this.getAttribute("value"));
});

const mapTabs = document.querySelectorAll(".tab__links");
mapTabs.forEach((item) => {
  item.addEventListener("click", function () {
    document.querySelectorAll(".nav-link").forEach((item) => {
      if (item.getAttribute("href") === `#nav-${this.id}`) {
        item.className = "nav-link text-dark active";
        item.setAttribute("aria-selected", true);
      } else {
        item.className = "nav-link text-dark";
        item.setAttribute("aria-selected", false);
      }
    });
    document.querySelectorAll(".tab-pane").forEach((item) => {
      if (item.getAttribute("id") === `nav-${this.id}`) {
        item.className = "tab-pane fade active show";
      } else {
        item.className = "tab-pane fade";
      }
    });
    gr.drawChart(this.id, gr.country, gr.proportion);
    changeMapMode(this.id);
  });
});


function draw(currentCountry, proportion, period) {

  let data = INITIAL_DATASET.filter(country => {
    return currentCountry ? country.country === currentCountry : true;
  }).map(country=>{
    if (proportion === 'absolute') {
      country.displayValuecases = country.cases;
      country.displayValuedeaths  = country.deaths;
      country.displayValuerecovered  = country.recovered;
    } else {
      country.displayValuecases  = country.population ? Math.round(country.cases / (country.population / 100000)) : 0;
      country.displayValuedeaths  = country.population  ?  Math.round(country.deaths / (country.population / 100000)): 0;
      country.displayValuerecovered  = country.population  ?  Math.round(country.recovered / (country.population / 100000)) : 0;
    }
    return country;
  });

  let globalCases = 0;
  let globalDeaths = 0;
  let globalRecovered = 0;
  let listOptionValue = ``;

  // CLEAR LIST BLOCK
  CASESLIST.innerHTML = "";
  DEATHSLIST.innerHTML = "";
  RECOVEREDLIST.innerHTML = "";
  // ADD TITLE
  CASESTITLE.textContent = "";
  DEATHSTITLE.textContent = "";
  RECOVEREDTITLE.textContent = "";

  // CREATE CASES LIST
  const casesArray = data
    .sort((country1, country2) => {
      return country1.displayValuecases < country2.displayValuecases ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "cases",
        "cases__item",
        "badge-warning"
      );
    })
    .join(" ");

  // CREATE DEATHS LIST
  const deathsArray = data
    .sort((country1, country2) => {
      return country1.displayValuedeaths < country2.displayValuedeaths ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(country, "deaths", "deaths__item", "badge-dark");
    })
    .join(" ");
  // CREATE RECOVERED LIST
  const recoveredArray = data
    .sort((country1, country2) => {
      return country1.displayValuerecovered < country2.displayValuerecovered ? 1 : -1;
    })
    .map((country) => {
      return convertToListItem(
        country,
        "recovered",
        "recovered__item",
        "badge-success"
      );
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

    // DATA LIST OPTIONS
    DATALISTOPTIONS.insertAdjacentHTML("beforeend", listOptionValue);

    CASESGLOBAL.textContent = changeNumberAddSpace(globalCases, ",");
    DEATHSGLOBAL.textContent = changeNumberAddSpace(globalDeaths, ",");
    RECOVEREDGLOBAL.textContent = changeNumberAddSpace(globalRecovered, ",");

    // CASES ITEM CLICK
    document.querySelectorAll(".cases__item").forEach((element) => {
      element.addEventListener("click", function () {
        console.log(this.querySelector(".mb-1").textContent);
        let country = this.querySelector(".mb-1").textContent;
        gr.drawChart(gr.mode, country, gr.proportion);
        NavigateToCountry(country);
      });
    });

    // DEATHS ITEM CLICK
    document.querySelectorAll(".deaths__item").forEach((element) => {
      element.addEventListener("click", function () {
        console.log(this.querySelector(".mb-1").textContent);
        let country = this.querySelector(".mb-1").textContent;
        gr.drawCheck(gr.mode, country, gr.proportion);
        NavigateToCountry(country);
      });
    });

    // RECOVERED ITEM CLICK
    document.querySelectorAll(".recovered__item").forEach((element) => {
      element.addEventListener("click", function () {
        console.log(this.querySelector(".mb-1").textContent);
        let country = this.querySelector(".mb-1").textContent;
        gr.drawChart(gr.mode, country, gr.proportion);
        NavigateToCountry(country);
      });
    });
}
