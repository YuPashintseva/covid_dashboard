import "bootstrap";
import "./styles/scss.scss";
import "./graphic.js";
import {
  createMap,
  ChangeSwitcher,
  changeMapMode,
  NavigateToCountry,
} from "./map";
import  graph  from "./graphic.js";
createMap();

//
const gr = new graph("allCases", "The World", "all");
  gr.drawCheck("allCases", "The World", "all");
 window.onresize =() => gr.drawCheck(gr.mode, gr.country, gr.proportion);
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
//

// CASES

async function getCasesDeathsRecoverd() {
  const url = `https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true`;
  const res = await fetch(url);
  const data = await res.json();
  let globalCases = 0;
  let globalDeaths = 0;
  let globalRecovered = 0;
  let listCountry = ``;
  let listDeaths = ``;
  let listRecovered = ``;
  let listOptionValue = ``;

  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  for (let i = 0; i < data.length; i += 1) {
    globalCases += Number(data[i].cases);
    globalDeaths += Number(data[i].deaths);
    globalRecovered += Number(data[i].recovered);

    listCountry += `<a href="javascript:void(0)" class="list-group-item list-group-item-action cases__item" aria-current="true">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${data[i].country}</h5>
                        <span class="cases__count badge badge-warning text-dark fs-5 badge-pill">${Number(
                          data[i].cases
                        )
                          .toString()
                          .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")}</span>
                      </div>
                      <p class="mb-1"><img src="${
                        data[i].countryInfo.flag
                      }" alt="${data[i].country}" class="flag-img">
                      </p>
                      <div class="d-flex w-100 justify-content-between"> 
                      <small>Population: ${Number(data[i].population)
                        .toString()
                        .replace(
                          /(?!null)(\d)(?=(\d\d\d)+([^\d]|$))/g,
                          "$1 "
                        )}</small>                        <small class="text-muted">${new Date(
      data[i].updated
    ).toLocaleString("en-US", options)}</small>
                      </div>
                      

                    </a>`;

    // search
    let mydata = new Date(data[i].updated);

    //console.log(data[i].updated);
    listOptionValue += `<option class="search__item" value="${data[i].country}">`;

    // deaths
    listDeaths += `<a href="javascript:void(0)" class="list-group-item list-group-item-action deaths__item" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${data[i].country}</h5>
      <span class="cases__count badge badge-dark text-light fs-5 badge-pill">${Number(
        data[i].deaths
      )
        .toString()
        .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")}</span>
    </div>
    <p class="mb-1"><img src="${data[i].countryInfo.flag}" alt="${
      data[i].country
    }" class="flag-img">
    </p>
    <div class="d-flex w-100 justify-content-between"> 
                      <small>Population: ${Number(data[i].population)
                        .toString()
                        .replace(
                          /(?!null)(\d)(?=(\d\d\d)+([^\d]|$))/g,
                          "$1 "
                        )}</small>                        <small class="text-muted">${new Date(
      data[i].updated
    ).toLocaleString("en-US", options)}</small>
                      </div>
  </a>`;

    // recovered

    listRecovered += `<a href="javascript:void(0)" class="list-group-item list-group-item-action recovered__item" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${data[i].country}</h5>
      <span class="cases__count badge badge-success text-light fs-5 badge-pill">${Number(
        data[i].recovered
      )
        .toString()
        .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")}</span>
    </div>
    <p class="mb-1"><img src="${data[i].countryInfo.flag}" alt="${
      data[i].country
    }" class="flag-img">
    </p>
    <div class="d-flex w-100 justify-content-between"> 
                      <small>Population: ${Number(data[i].population)
                        .toString()
                        .replace(
                          /(?!null)(\d)(?=(\d\d\d)+([^\d]|$))/g,
                          "$1 "
                        )}</small>                        <small class="text-muted text-end">${new Date(
      data[i].updated
    ).toLocaleString("en-US", options)}</small>
                      </div>
  </a>`;
  }

  CASESLIST.insertAdjacentHTML("beforeend", listCountry);
  DEATHSLIST.insertAdjacentHTML("beforeend", listDeaths);
  RECOVEREDLIST.insertAdjacentHTML("beforeend", listRecovered);

  // CASES
  document.querySelectorAll(".cases__link").forEach((element, index, array) => {
    element.addEventListener("click", function() {
      if (index === 0) {
        CASESTITLE.textContent = "Cases by Country";
        CASESGLOBAL.textContent = data.Global.TotalConfirmed.toString().replace(
          /(\d)(?=(\d\d\d)+([^\d]|$))/g,
          "$1 "
        );
      } else if (index === 1) {
        CASESTITLE.textContent = "Last Day Cases";
        CASESGLOBAL.textContent = data.Global.NewConfirmed.toString().replace(
          /(\d)(?=(\d\d\d)+([^\d]|$))/g,
          "$1 "
        );
      } else if (index === 2) {
        CASESTITLE.textContent = "Total 100K pop";
        CASESGLOBAL.textContent = "формула";
      } else if (index === 3) {
        CASESTITLE.textContent = "Last Day 100K pop";
        CASESGLOBAL.textContent = "формула";
      }
    });
  });

  // DATA LIST OPTIONS
  DATALISTOPTIONS.insertAdjacentHTML("beforeend", listOptionValue);

  CASESGLOBAL.textContent = globalCases
    .toString()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  DEATHSGLOBAL.textContent = globalDeaths
    .toString()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  RECOVEREDGLOBAL.textContent = globalRecovered
    .toString()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");

  // CASES ITEM CLICK
  document.querySelectorAll(".cases__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // DEATHS ITEM CLICK
  document.querySelectorAll(".deaths__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawCheck(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });

  // RECOVERED ITEM CLICK
  document.querySelectorAll(".recovered__item").forEach((element) => {
    element.addEventListener("click", function() {
      console.log(this.querySelector(".mb-1").textContent);
      let country = this.querySelector(".mb-1").textContent;
      gr.drawChart(gr.mode, country, gr.proportion);
      NavigateToCountry(country);
    });
  });
}
//mode switchers
document.querySelector('#nav-home-tab').addEventListener("click", function() {
  changeMapMode('total_cases');
  gr.drawChart("allCases", gr.country, gr.proportion);
});

document.querySelector('#nav-profile-tab').addEventListener("click", function() {
  changeMapMode('fatal_cases');
  gr.drawChart("deaths", gr.country, gr.proportion);
});

document.querySelector('#nav-contact-tab').addEventListener("click", function() {
  changeMapMode('recover_cases');
  gr.drawChart("recovered", gr.country, gr.proportion);
});

// FULLSCREEN
let flagFull = true;
document.querySelectorAll(".fullscreen").forEach((element) => {
  element.addEventListener("click", function() {
    // map
    if (
      flagFull &&
      this.parentNode.classList.contains("col-6") &&
      this.parentNode.classList.contains("col-sm-6") &&
      this.parentNode.classList.contains("col-md-6") &&
      this.parentNode.classList.contains("col-lg-6") &&
      this.parentNode.classList.contains("col-xl-6")
    ) {
      flagFull = false;
      this.parentNode.classList.remove("col-6");
      this.parentNode.classList.remove("col-sm-6");
      this.parentNode.classList.remove("col-md-6");
      this.parentNode.classList.remove("col-lg-6");
      this.parentNode.classList.remove("col-xl-6");
      this.parentNode.classList.add("full");
    } else {
      flagFull = true;
      this.parentNode.classList.add("col-6");
      this.parentNode.classList.add("col-sm-6");
      this.parentNode.classList.add("col-md-6");
      this.parentNode.classList.add("col-lg-6");
      this.parentNode.classList.add("col-xl-6");
      this.parentNode.classList.remove("full");
    }
    // Cases by Country
    // Global Deaths
    // Recovered
    // Graphic
  });
});

getCasesDeathsRecoverd();

// FOR TOP SWITCHER START
document.querySelector("#switch_count").addEventListener("click", function() {
  if (this.getAttribute("value") === "absolute") {
    this.setAttribute("value", "permillion");
    gr.drawCheck(gr.mode, gr.country, '100');
  } else {
    this.setAttribute("value", "absolute");
    gr.drawCheck(gr.mode, gr.country, 'all');
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

const mapTabs = document.querySelectorAll(".tab__links");
mapTabs.forEach((item) => {
  item.addEventListener("click", function() {
      if (this.id === 'fatal_cases') {
        gr.drawChart("deaths", gr.country, gr.proportion);
        document.querySelectorAll('.nav-link').forEach((item) => {
          if (item.getAttribute('href') === '#nav-deaths') {
            item.className = "nav-link text-dark active";
            item.setAttribute("aria-selected", true);
          } else {
            item.className = "nav-link text-dark";
            item.setAttribute("aria-selected", false);
          }
        });
        document.querySelectorAll('.tab-pane').forEach((item) => {
          if (item.getAttribute('id') === 'nav-deaths') {
            item.className = "tab-pane fade active show";
          } else {
            item.className = "tab-pane fade";
          }
        })
      } else if (this.id === 'recover_cases') {
        gr.drawChart("recovered", gr.country, gr.proportion);
        document.querySelectorAll('.nav-link').forEach((item) => {
          if (item.getAttribute('href') === '#nav-recovered') {
            item.className = "nav-link text-dark active";
            item.setAttribute("aria-selected", true);
          } else {
            item.className = "nav-link text-dark";
            item.setAttribute("aria-selected", false);
          }
        });
        document.querySelectorAll('.tab-pane').forEach((item) => {
          if (item.getAttribute('id') === 'nav-recovered') {
            item.className = "tab-pane fade active show";
          } else {
            item.className = "tab-pane fade";
          }
        })
      } else if (this.id === 'total_cases') {
        gr.drawChart("allCases", gr.country, gr.proportion);
        document.querySelectorAll('.nav-link').forEach((item) => {
          if (item.getAttribute('href') === '#nav-cases') {
            item.className = "nav-link text-dark active";
            item.setAttribute("aria-selected", true);
          } else {
            item.className = "nav-link text-dark";
            item.setAttribute("aria-selected", false);
          }
        });
        document.querySelectorAll('.tab-pane').forEach((item) => {
          if (item.getAttribute('id') === 'nav-cases') {
            item.className = "tab-pane fade active show";
          } else {
            item.className = "tab-pane fade";
          }
        });
      }

    changeMapMode(this.id);
  });
});