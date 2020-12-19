import "bootstrap";
import "./styles/scss.scss";

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
const DATALISTOPTIONS = document.getElementById("datalistOptions");
const FLAGIMG = document.querySelectorAll(".flag-img");
//

// CASES

async function getCasesDeathsRecoverd() {
  const url = `https://api.covid19api.com/summary`;
  const res = await fetch(url);
  const data = await res.json();

  let listCountry = ``;
  let listDeaths = ``;
  let listRecovered = ``;
  let listOptionValue = ``;

  for (let i = 0; i < data.Countries.length; i += 1) {
    listCountry += `<li class="list-group-item d-flex justify-content-between align-items-center cases__item"><span class="cases__country"><img class="flag-img" src="${getFlags(
      data.Countries[i].Country
    )}">${data.Countries[i].Country}</span>
    <span class="cases__count badge badge-primary badge-pill">${data.Countries[
      i
    ].TotalConfirmed.toString().replace(
      /(\d)(?=(\d\d\d)+([^\d]|$))/g,
      "$1 "
    )}</span></li>`;

    listOptionValue += `<option value="${data.Countries[i].Country}">`;

    listDeaths += `<li class="list-group-item d-flex justify-content-between align-items-center deaths__item"><span class="deaths__country">${
      data.Countries[i].Country
    }</span><span class="deaths__count badge badge-primary badge-pill ">${data.Countries[
      i
    ].TotalDeaths.toString().replace(
      /(\d)(?=(\d\d\d)+([^\d]|$))/g,
      "$1 "
    )}</span></li>`;

    listRecovered += `<li class="list-group-item d-flex justify-content-between align-items-center  recovered__item"><span class="recovered__country">${
      data.Countries[i].Country
    }</span><span class=" badge badge-primary badge-pill recovered__count">${data.Countries[
      i
    ].TotalRecovered.toString().replace(
      /(\d)(?=(\d\d\d)+([^\d]|$))/g,
      "$1 "
    )}</span></li>`;
  }

  CASESLIST.insertAdjacentHTML("beforeend", listCountry);
  DEATHSLIST.insertAdjacentHTML("beforeend", listDeaths);
  RECOVEREDLIST.insertAdjacentHTML("beforeend", listRecovered);

  CASESGLOBAL.textContent = data.Global.TotalConfirmed.toString().replace(
    /(\d)(?=(\d\d\d)+([^\d]|$))/g,
    "$1 "
  );
  DEATHSGLOBAL.textContent = data.Global.TotalDeaths.toString().replace(
    /(\d)(?=(\d\d\d)+([^\d]|$))/g,
    "$1 "
  );
  RECOVEREDGLOBAL.textContent = data.Global.TotalRecovered.toString().replace(
    /(\d)(?=(\d\d\d)+([^\d]|$))/g,
    "$1 "
  );
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
  // DEATHS
  document
    .querySelectorAll(".deaths__link")
    .forEach((element, index, array) => {
      element.addEventListener("click", function() {
        if (index === 0) {
          DEATHSTITLE.textContent = "Global Deaths";
          DEATHSGLOBAL.textContent = data.Global.TotalDeaths.toString().replace(
            /(\d)(?=(\d\d\d)+([^\d]|$))/g,
            "$1 "
          );
        } else if (index === 1) {
          DEATHSTITLE.textContent = "Last Day Deaths";
          DEATHSGLOBAL.textContent = data.Global.NewDeaths.toString().replace(
            /(\d)(?=(\d\d\d)+([^\d]|$))/g,
            "$1 "
          );
        } else if (index === 2) {
          DEATHSTITLE.textContent = "Total 100K pop";

          DEATHSGLOBAL.textContent = "формула";
        } else if (index === 3) {
          DEATHSTITLE.textContent = "Last Day 100K pop";

          DEATHSGLOBAL.textContent = "формула";
        }
      });
    });
  // RECOVERED
  document
    .querySelectorAll(".recovered__link")
    .forEach((element, index, array) => {
      element.addEventListener("click", function() {
        if (index === 0) {
          RECOVEREDTITLE.textContent = "Recovered";
          RECOVEREDGLOBAL.textContent = data.Global.TotalRecovered.toString().replace(
            /(\d)(?=(\d\d\d)+([^\d]|$))/g,
            "$1 "
          );
        } else if (index === 1) {
          RECOVEREDTITLE.textContent = "Last Day Recovered";
          RECOVEREDGLOBAL.textContent = data.Global.NewRecovered.toString().replace(
            /(\d)(?=(\d\d\d)+([^\d]|$))/g,
            "$1 "
          );
        } else if (index === 2) {
          RECOVEREDTITLE.textContent = "Total 100K pop";
          RECOVEREDGLOBAL.textContent = "формула";
        } else if (index === 3) {
          RECOVEREDTITLE.textContent = "Last Day 100K pop";
          RECOVEREDGLOBAL.textContent = "формула";
        }
      });
    });
  // DATA LIST OPTIONS

  DATALISTOPTIONS.insertAdjacentHTML("beforeend", listOptionValue);
}

// FLAGS
async function getFlags(country) {
  const urlFlag = `https://restcountries.eu/rest/v2/all?fields=name;population;flag`;
  const resFlag = await fetch(urlFlag);
  const dataFlag = await resFlag.json();

  dataFlag.forEach((element) => {
    if (element.name === country) {
      return element.flag;
      //console.log(element.flag);
    }
  });
}

getFlags();
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
