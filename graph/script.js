class graph {

   constructor( mode, country, proportion,callback ){
       this.country = country;
       this.proportion = proportion;
       this.mode = mode;//cases, deaths, recovered

    }
    draw(mode, country, proportion) {
        this.country = params.coutnry;
        if (this.mode !== mode||this.country !== country || this.proportion !== proportion ) {
          this.drawChart(mode,country, proportion);
          this.mode = mode;
          this.country = country;
          this.proportion = proportion;
        }
    
    }
    drawCheck(mode, country, proportion) {
    
      

      this.createContainer();
      
      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(() => this.drawChart(mode,country, proportion));


      this.mode = mode;
      this.country = country;
      this.proportion = proportion;

    }

    onChange() {
        this.callback(params);
        this.draw(params)
    }

    createContainer() {
      let cont = document.createElement('div');
      cont.setAttribute('id', 'columnchart_values');
      cont.style.width='900px';
      cont.style.height='400px';
      let butCont = document.createElement('div');
      butCont.style.position='absolute';
      butCont.style.left = '136px';
      butCont.style.height ='50px';
      butCont.style.width = '531px';
      butCont.style.display='inline-flex';
      butCont.style.justifyContent='center';

      let allCases = document.createElement('button');
      allCases.style.flexGrow = '1';
      allCases.innerHTML = 'All Cases/Deaths/Recovered';
      allCases.addEventListener('click',()=>{
        if (this.mode === "allCases") {
        this.drawChart('deaths', this.country, this.proportion)
        this.mode = 'deaths';
        } else if (this.mode === "deaths") {
          this.drawChart('recovered', this.country, this.proportion)
          this.mode = 'recovered';
        } else {
          this.drawChart('allCases', this.country, this.proportion)
          this.mode = 'allCases';
        }
      })

      let total = document.createElement('button');
      total.style.flexGrow = '1';
      total.innerHTML = `Among All Population`;
      total.addEventListener('click', ()=>{
        this.drawChart(this.mode, this.country, 'all');
        this.proportion='all';
      })

      let hundred= document.createElement('button');
      hundred.style.flexGrow = '1';
      hundred.innerHTML = `Per Hundred Thousand`;
      hundred.addEventListener('click', () =>{
        this.drawChart(this.mode, this.country, '100');
        this.proportion = '100';
      })
     
      let bigCont = document.getElementById('graphContainer');
      
      
      butCont.appendChild(allCases);
      //butCont.appendChild(deaths);
      //butCont.appendChild(recovered);
      butCont.appendChild(total);
      butCont.appendChild(hundred);

      bigCont.appendChild(cont);
      bigCont.appendChild(butCont);
    
    }

    async drawChart(mode, country, proportion) {
     
      let obj = {};
      let cumulativeUrl = 'https://disease.sh/v3/covid-19/historical/all?lastdays=400';
      let countryUrl = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=400`;
      let url;
      let worldPopStart =7763035303;
      let worldPopNow = 7855208954;
      let diff = 92173651;
      let everyDay = 252530;
//////////////////////////////////////////////

      if(country==='The World'){
      url = cumulativeUrl;
      } else{
        url = countryUrl;
      }
////////////////////////////////////////////////////
     
     obj = await fetch(url).then(response => response.json())
      .then(data => {return JSON.parse(JSON.stringify(data));}).catch((error) => console.log(error));
      
//////////////////////////////////////////////////////////      
      let arr;
      if(country !== 'The World'){
        obj = obj.timeline;

      }

      if(mode === 'deaths') {
       arr= Object.entries(obj.deaths);
      } else if(mode === 'allCases'){
      arr = Object.entries(obj.cases);
      } else if(mode === 'recovered'){
        arr = Object.entries(obj.recovered);
        }else {
        arr = Object.entries(obj.cases);
      }
///////////////////////////////////////      
       let arrInside =[];
       let arrChanged=[];
       //hundred thousand proportion
       if(proportion ==='100'){
       arrChanged=arr.map((entry,index)=> {
        
        entry[1] = entry[1]/((worldPopStart+ (everyDay*index))/100000);
        return entry;
      });
        arrInside = arrChanged.slice();
     } else {
        arrInside = arr.slice();
    }
//////////////////////////////////////
      arrInside.unshift(['date', 'number']);
     
      var data = google.visualization.arrayToDataTable(arrInside);

        var options = {
          title: `${this.country} Total number of cases by day from the beginning`,
           
          width: 800,
          height: 400,
          bar: {groupWidth: '95%'},
          legend: { position: 'none' },
         vAxis: {logScale: 'true'}
        };
///////////////////////////////////////////////////////////////////
        if(mode === 'deaths') {
          options.title=`${this.country}: Total number of deaths`;
          options.colors=['black'];
         } else if(mode === 'allCases'){
          options.title=`${this.country}: All Cases Among the Whole Population`;
          options.colors=['blue'];
         } else if(mode === 'recovered'){
          options.title=`${this.country}: Recovered Among the Whole Population`;
          options.colors=['#339911'];
           } else {
            options.title=`${this.country}: All Cases Among the Whole Population`;
            options.colors=['blue'];
         }
////////////////////////////////////////////////////////////
         if(proportion === '100'){
          options.title=`${this.country}: ${this.mode} Per 100 thousand`;
          options.vAxis.logScale='false';
          //options.colors=['yellow'];
          options.chartArea={backgroundColor:'yellow'};
           } else if(proportion !== '100'){
            //options.title='Per 100 thousand';
            options.vAxis.logScale='true';
             }
       ////////////////////////////////////////////////////////
      var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_values'));
      chart.draw(data, options);
    }
   
}

window.onload = () => {
  const gr = new graph('All Cases','The World','all');
 
  gr.drawCheck('All Cases','France','all');
}
     