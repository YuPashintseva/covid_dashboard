(()=>{var e={318:(e,t,o)=>{"use strict";async function a(){let e=await fetch("https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true");return await e.json()}o.d(t,{s:()=>a})},953:()=>{class e{constructor(e,t,o,a){this.country=t,this.proportion=o,this.mode=e}draw(e,t,o){this.country=params.coutnry,this.mode===e&&this.country===t&&this.proportion===o||(this.drawChart(e,t,o),this.mode=e,this.country=t,this.proportion=o)}drawCheck(e,t,o){this.createContainer(),google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback((()=>this.drawChart(e,t,o))),this.mode=e,this.country=t,this.proportion=o}onChange(){this.callback(params),this.draw(params)}createContainer(){let e=document.createElement("div");e.setAttribute("id","columnchart_values"),e.style.width="900px",e.style.height="400px";let t=document.createElement("div");t.style.position="absolute",t.style.left="136px",t.style.height="50px",t.style.width="531px",t.style.display="inline-flex",t.style.justifyContent="center";let o=document.createElement("button");o.style.flexGrow="1",o.innerHTML="All Cases/Deaths/Recovered",o.addEventListener("click",(()=>{"allCases"===this.mode?(this.drawChart("deaths",this.country,this.proportion),this.mode="deaths"):"deaths"===this.mode?(this.drawChart("recovered",this.country,this.proportion),this.mode="recovered"):(this.drawChart("allCases",this.country,this.proportion),this.mode="allCases")}));let a=document.createElement("button");a.style.flexGrow="1",a.innerHTML="Among All Population",a.addEventListener("click",(()=>{this.drawChart(this.mode,this.country,"all"),this.proportion="all"}));let s=document.createElement("button");s.style.flexGrow="1",s.innerHTML="Per Hundred Thousand",s.addEventListener("click",(()=>{this.drawChart(this.mode,this.country,"100"),this.proportion="100"}));let r=document.getElementById("graphContainer");t.appendChild(o),t.appendChild(a),t.appendChild(s),r.appendChild(e),r.appendChild(t)}async drawChart(e,t,o){let a,s,r={};a="The World"===t?"https://disease.sh/v3/covid-19/historical/all?lastdays=400":`https://disease.sh/v3/covid-19/historical/${t}?lastdays=400`,r=await fetch(a).then((e=>e.json())).then((e=>JSON.parse(JSON.stringify(e)))).catch((e=>console.log(e))),"The World"!==t&&(r=r.timeline),s="deaths"===e?Object.entries(r.deaths):"allCases"===e?Object.entries(r.cases):"recovered"===e?Object.entries(r.recovered):Object.entries(r.cases);let n=[],l=[];"100"===o?(l=s.map(((e,t)=>(e[1]=e[1]/((7763035303+252530*t)/1e5),e))),n=l.slice()):n=s.slice(),n.unshift(["date","number"]);var c=google.visualization.arrayToDataTable(n),i={title:`${this.country} Total number of cases by day from the beginning`,width:800,height:400,bar:{groupWidth:"95%"},legend:{position:"none"},vAxis:{logScale:"true"}};"deaths"===e?(i.title=`${this.country}: Total number of deaths`,i.colors=["black"]):"allCases"===e?(i.title=`${this.country}: All Cases Among the Whole Population`,i.colors=["blue"]):"recovered"===e?(i.title=`${this.country}: Recovered Among the Whole Population`,i.colors=["#339911"]):(i.title=`${this.country}: All Cases Among the Whole Population`,i.colors=["blue"]),"100"===o?(i.title=`${this.country}: ${this.mode} Per 100 thousand`,i.vAxis.logScale="false",i.chartArea={backgroundColor:"yellow"}):"100"!==o&&(i.vAxis.logScale="true"),new google.visualization.ColumnChart(document.getElementById("columnchart_values")).draw(c,i)}}window.onload=()=>{new e("All Cases","The World","all").drawCheck("All Cases","France","all")}},10:(e,t,o)=>{"use strict";o(312),o(953);var a=o(884);(0,a.df)();const s=document.querySelector(".cases__list"),r=document.querySelector(".deaths__list"),n=document.querySelector(".recovered__list"),l=document.querySelector(".cases__global"),c=document.querySelector(".deaths__global"),i=document.querySelector(".recovered__global"),d=document.querySelector(".cases__title"),u=(document.querySelector(".deaths__title"),document.querySelector(".recovered__title"),document.querySelector(".cases__table-body"),document.getElementById("datalistOptions"));document.querySelectorAll(".flag-img");document.querySelector("#nav-home-tab").addEventListener("click",(function(){(0,a.Dx)("total_cases")})),document.querySelector("#nav-profile-tab").addEventListener("click",(function(){(0,a.Dx)("fatal_cases")})),document.querySelector("#nav-contact-tab").addEventListener("click",(function(){(0,a.Dx)("recover_cases")}));let h=!0;document.querySelectorAll(".fullscreen").forEach((e=>{e.addEventListener("click",(function(){h&&this.parentNode.classList.contains("col-6")&&this.parentNode.classList.contains("col-sm-6")&&this.parentNode.classList.contains("col-md-6")&&this.parentNode.classList.contains("col-lg-6")&&this.parentNode.classList.contains("col-xl-6")?(h=!1,this.parentNode.classList.remove("col-6"),this.parentNode.classList.remove("col-sm-6"),this.parentNode.classList.remove("col-md-6"),this.parentNode.classList.remove("col-lg-6"),this.parentNode.classList.remove("col-xl-6"),this.parentNode.classList.add("full")):(h=!0,this.parentNode.classList.add("col-6"),this.parentNode.classList.add("col-sm-6"),this.parentNode.classList.add("col-md-6"),this.parentNode.classList.add("col-lg-6"),this.parentNode.classList.add("col-xl-6"),this.parentNode.classList.remove("full"))}))})),async function(){const e=await fetch("https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=true"),t=await e.json();let o=0,a=0,h=0,p="",m="",y="",v="",f={year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"};for(let e=0;e<t.length;e+=1){o+=Number(t[e].cases),a+=Number(t[e].deaths),h+=Number(t[e].recovered),p+=`<a href="javascript:void(0)" class="list-group-item list-group-item-action cases__item" aria-current="true">\n                      <div class="d-flex w-100 justify-content-between">\n                        <h5 class="mb-1">${t[e].country}</h5>\n                        <span class="cases__count badge badge-warning text-dark fs-5 badge-pill">${Number(t[e].cases).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")}</span>\n                      </div>\n                      <p class="mb-1"><img src="${t[e].countryInfo.flag}" alt="${t[e].country}" class="flag-img">\n                      </p>\n                      <div class="d-flex w-100 justify-content-between"> \n                      <small>Population: ${Number(t[e].population).toString().replace(/(?!null)(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")}</small>                        <small class="text-muted">${new Date(t[e].updated).toLocaleString("en-US",f)}</small>\n                      </div>\n                      \n\n                    </a>`;new Date(t[e].updated);v+=`<option class="search__item" value="${t[e].country}">`,m+=`<a href="javascript:void(0)" class="list-group-item list-group-item-action deaths__item" aria-current="true">\n    <div class="d-flex w-100 justify-content-between">\n      <h5 class="mb-1">${t[e].country}</h5>\n      <span class="cases__count badge badge-dark text-light fs-5 badge-pill">${Number(t[e].deaths).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")}</span>\n    </div>\n    <p class="mb-1"><img src="${t[e].countryInfo.flag}" alt="${t[e].country}" class="flag-img">\n    </p>\n    <div class="d-flex w-100 justify-content-between"> \n                      <small>Population: ${Number(t[e].population).toString().replace(/(?!null)(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")}</small>                        <small class="text-muted">${new Date(t[e].updated).toLocaleString("en-US",f)}</small>\n                      </div>\n  </a>`,y+=`<a href="javascript:void(0)" class="list-group-item list-group-item-action recovered__item" aria-current="true">\n    <div class="d-flex w-100 justify-content-between">\n      <h5 class="mb-1">${t[e].country}</h5>\n      <span class="cases__count badge badge-success text-light fs-5 badge-pill">${Number(t[e].recovered).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")}</span>\n    </div>\n    <p class="mb-1"><img src="${t[e].countryInfo.flag}" alt="${t[e].country}" class="flag-img">\n    </p>\n    <div class="d-flex w-100 justify-content-between"> \n                      <small>Population: ${Number(t[e].population).toString().replace(/(?!null)(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")}</small>                        <small class="text-muted text-end">${new Date(t[e].updated).toLocaleString("en-US",f)}</small>\n                      </div>\n  </a>`}s.insertAdjacentHTML("beforeend",p),r.insertAdjacentHTML("beforeend",m),n.insertAdjacentHTML("beforeend",y),document.querySelectorAll(".cases__link").forEach(((e,o,a)=>{e.addEventListener("click",(function(){0===o?(d.textContent="Cases by Country",l.textContent=t.Global.TotalConfirmed.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")):1===o?(d.textContent="Last Day Cases",l.textContent=t.Global.NewConfirmed.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")):2===o?(d.textContent="Total 100K pop",l.textContent="формула"):3===o&&(d.textContent="Last Day 100K pop",l.textContent="формула")}))})),u.insertAdjacentHTML("beforeend",v),l.textContent=o.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 "),c.textContent=a.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 "),i.textContent=h.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 "),document.querySelectorAll(".cases__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent),alert(this.querySelector(".mb-1").textContent)}))})),document.querySelectorAll(".deaths__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent),alert(this.querySelector(".mb-1").textContent)}))})),document.querySelectorAll(".recovered__item").forEach((e=>{e.addEventListener("click",(function(){console.log(this.querySelector(".mb-1").textContent),alert(this.querySelector(".mb-1").textContent)}))}))}(),document.querySelector("#switch_count").addEventListener("click",(function(){"absolute"===this.getAttribute("value")?this.setAttribute("value","permillion"):this.setAttribute("value","absolute");let e=document.querySelector("#switch_day").getAttribute("value");(0,a._B)(this.getAttribute("value"),e)})),document.querySelector("#switch_day").addEventListener("click",(function(){"alldays"===this.getAttribute("value")?this.setAttribute("value","oneday"):this.setAttribute("value","alldays");let e=document.querySelector("#switch_count").getAttribute("value");(0,a._B)(e,this.getAttribute("value"))}))},884:(e,t,o)=>{"use strict";o.d(t,{df:()=>d,_B:()=>u,Dx:()=>h});var a=o(318);const s=L.featureGroup(),r=L.featureGroup(),n=L.featureGroup(),l=L.featureGroup();let c="";const i=[];function d(){c=L.map("mapid").setView([51.505,-.09],3),L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',maxZoom:18,id:"yupashintseva/ckioco3iw4nro17p9d1vxbr14",tileSize:512,zoomOffset:-1,accessToken:"pk.eyJ1IjoieXVwYXNoaW50c2V2YSIsImEiOiJja2lpZmY1eXAyNDJyMnFvNXM1M2F3YzF2In0.JPSKDwKVKULCE83pQoO4vg"}).addTo(c);let e="";(0,a.s)().then((t=>{e=t,e.map((e=>(function(e,t,o,a,d,u,p,y,v){var f=L.circle([e,t],{color:"red",fillColor:"#f03",fillOpacity:.5,radius:o}).addTo(s);const g=[];g.push(f),g.push(u),i.push(g),f.addEventListener("mouseover",(function(){L.popup().setLatLng([e,t]).setContent(`<div style="font-size: 20px;">${d}</div>\n         <img class="country_flag" src=${a}>         \n                  <table>    \n                    <tr><th style="color: red">Cases: ${u[0]}</th></tr>\n                    <tr><th style="color: orange">Active cases: ${u[2]}</th></tr>\n                    <tr><th style="color: green">Recovered: ${u[3]}</th></tr>\n                    <tr><th style="color: grey">Fatality ratio: ${u[1]}</th></tr>\n                  </table>`).openOn(c)})),f.addEventListener("click",(function(){m(e,t)}));var b=L.circle([e,t],{color:"red",fillColor:"#f03",fillOpacity:.5,radius:o}).addTo(r);const _=[];_.push(b),_.push(p),i.push(_),b.addEventListener("mouseover",(function(){L.popup().setLatLng([e,t]).setContent(`<div style="font-size: 20px;">${d}</div>\n         <img class="country_flag" src=${a}>\n                  <table>\n                    <tr><th style="color: red">Cases: ${p[0]}</th></tr>\n                    <tr><th style="color: orange">Active cases: ${p[2]}</th></tr>\n                    <tr><th style="color: green">Recovered: ${p[3]}</th></tr>\n                    <tr><th style="color: grey">Fatality ratio: ${p[1]}</th></tr>\n                  </table>`).openOn(c)})),b.addEventListener("click",(function(){m(e,t)})),c.addLayer(r);var w=L.circle([e,t],{color:"red",fillColor:"#f03",fillOpacity:.5,radius:o}).addTo(n);const C=[];C.push(w),C.push(y),i.push(C),w.addEventListener("mouseover",(function(){L.popup().setLatLng([e,t]).setContent(`<div style="font-size: 20px;">${d}</div>\n         <img class="country_flag" src=${a}>\n                  <table>\n                    <tr><th style="color: red">Cases: ${y[0]}</th></tr>\n                    <tr><th style="color: orange">Active cases: ${y[2]}</th></tr>\n                    <tr><th style="color: green">Recovered: ${y[3]}</th></tr>\n                    <tr><th style="color: grey">Fatality ratio: ${y[1]}</th></tr>\n                  </table>`).openOn(c)})),w.addEventListener("click",(function(){m(e,t)}));var $=L.circle([e,t],{color:"black",fillColor:"black",fillOpacity:.5,radius:o}).addTo(l);const x=[];x.push($),x.push(v),i.push(x),$.addEventListener("mouseover",(function(){L.popup().setLatLng([e,t]).setContent(`<div style="font-size: 20px;">${d}</div>\n         <img class="country_flag" src=${a}>\n                  <table>\n                    <tr><th style="color: red">Cases: ${v[0]}</th></tr>\n                    <tr><th style="color: orange">Active cases: ${v[2]}</th></tr>\n                    <tr><th style="color: green">Recovered: ${v[3]}</th></tr>\n                    <tr><th style="color: grey">Fatality ratio: ${v[1]}</th></tr>\n\n                  </table>`).openOn(c)})),$.addEventListener("click",(function(){m(e,t)})),h("total_cases")}(e.countryInfo.lat,e.countryInfo.long,p(e.casesPerOneMillion),e.countryInfo.flag,e.country,[Math.round(e.casesPerOneMillion/10),Math.round(e.deathsPerOneMillion/10),Math.round(e.activePerOneMillion/10),Math.round(e.recoveredPerOneMillion/10)],[e.cases,e.deaths,e.active,e.recovered],[e.todayCases,e.todayDeaths,e.active,e.todayRecovered],[Math.round(e.todayCases/(e.population/1e5)),Math.round(e.todayDeaths/(e.population/1e5)),Math.round(e.active/(e.population/1e5)),Math.round(e.todayRecovered/(e.population/1e5))]),e)))}));document.querySelectorAll(".tab__links").forEach((e=>{e.addEventListener("click",(function(){h(this.id)}))}))}function u(e,t){"absolute"===e&&"alldays"===t?(c.removeLayer(s),c.removeLayer(n),c.removeLayer(l),c.addLayer(r)):"permillion"===e&&"alldays"===t?(c.removeLayer(r),c.removeLayer(n),c.removeLayer(l),c.addLayer(s)):"absolute"===e&&"oneday"===t?(c.removeLayer(r),c.removeLayer(s),c.removeLayer(l),c.addLayer(n)):"permillion"===e&&"oneday"===t&&(c.removeLayer(s),c.removeLayer(n),c.removeLayer(r),c.addLayer(l))}function h(e){let t="red",o=0;"active_cases"===e?(t="orange",o=2):"recover_cases"===e?(t="green",o=3,document.querySelector("#recover_cases").className="tab__links active_tab",document.querySelector("#fatal_cases").className="tab__links",document.querySelector("#total_cases").className="tab__links"):"fatal_cases"===e?(t="white",o=1,document.querySelector("#recover_cases").className="tab__links",document.querySelector("#fatal_cases").className="tab__links active_tab",document.querySelector("#total_cases").className="tab__links"):(t="red",o=0,document.querySelector("#recover_cases").className="tab__links",document.querySelector("#fatal_cases").className="tab__links",document.querySelector("#total_cases").className="tab__links active_tab"),i.forEach((e=>{e[0].setStyle({color:t,fillColor:t});let a=0;a=null!==e[1][o]?p(e[1][o]):0,e[0].setRadius(a)}))}function p(e){let t=0;return e>=1&&e<1e3?t=1e4:e>=1e3&&e<3e3?t=4e4:e>=3e3&&e<2e4?t=8e4:e>=2e4&&e<5e4?t=12e4:e>=5e4&&e<1e5?t=16e4:e>=1e5&&e<25e4?t=2e5:e>=25e4&&e<4e5?t=24e4:e>=4e5&&e<5e5?t=28e4:e>=5e5&&e<1e6?t=32e4:e>=1e6&&e<5e6&&(t=36e4),t}function m(e,t){c.setView([e,t],5)}}},t={};function o(a){if(t[a])return t[a].exports;var s=t[a]={exports:{}};return e[a].call(s.exports,s,s.exports,o),s.exports}o.m=e,o.x=e=>{},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0,74:0,842:0},t=[[10,312]],a=e=>{},s=(s,r)=>{for(var n,l,[c,i,d,u]=r,h=0,p=[];h<c.length;h++)l=c[h],o.o(e,l)&&e[l]&&p.push(e[l][0]),e[l]=0;for(n in i)o.o(i,n)&&(o.m[n]=i[n]);for(d&&d(o),s&&s(r);p.length;)p.shift()();return u&&t.push.apply(t,u),a()},r=self.webpackChunk=self.webpackChunk||[];function n(){for(var a,s=0;s<t.length;s++){for(var r=t[s],n=!0,l=1;l<r.length;l++){var c=r[l];0!==e[c]&&(n=!1)}n&&(t.splice(s--,1),a=o(o.s=r[0]))}return 0===t.length&&(o.x(),o.x=e=>{}),a}r.forEach(s.bind(null,0)),r.push=s.bind(null,r.push.bind(r));var l=o.x;o.x=()=>(o.x=l||(e=>{}),(a=n)())})(),o.x()})();