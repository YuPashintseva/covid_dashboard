// API SERVICES


/*  INPUT PARAMS: Slug or ISO2
    RETURN COUNTRIES SLUG OR ISO2 LIST DEPENING OF THE INPUT PARAMETER
*/
export async function getAllCountries(countryMode) {
  let response = await fetch('https://api.covid19api.com/countries');
  let data = await response.json();
  const countryList = data.map((item) => {
    if (countryMode === 'Slug') {
      return item.Slug
    } else {
      return item.ISO2;
    }
  });
  return countryList;
}

// TOTAL CASES BY COUNTRY: CONFIRMED, RECOVERED, DEATHS, ACTIVE
export async function getTotalByCountry(slug) {
  console.log('country:'+slug)
  let response = await fetch(`https://api.covid19api.com/live/country/south-africa/status/confirmed`);
  let data = await response.json();
  console.log('response:'+data)
  const countriesSlug = data.map((item) => {
    let arr = [];
    arr.push(item.Confirmed);
    arr.push(item.Lat);
    arr.push(item.Lon);
    return arr;
  });
  return countriesSlug;
}
