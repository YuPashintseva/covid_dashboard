// API SERVICES

// GET TOTAL DATA
export async function getUserAsync() {
  let response = await fetch(`https://api.covid19api.com/summary`);
  let data = await response.json();
  console.log(data);
  return data;
}
