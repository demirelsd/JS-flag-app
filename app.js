//*=========================================================
//*                     FLAG-APP
//*=========================================================
const URL = `https://restcountries.com/v3.1/all`;
fetch(URL)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Something went wrong!");
    }
    return res.json();
  })
  .then((data) => addCountry(data))
.catch((err) => showErr(err))

let countries = "";
const selectDiv = document.querySelector(".form-select");
const countryDiv = document.querySelector(".country");
const addCountry = (data) => {
    countries = data
    countries.forEach((country) => {
    const {name: { common: countryName }} = country;
    

    selectDiv.innerHTML += `<option value=${countryName}>${countryName}</option>`;
    
    
  });
  
};
const showErr = (err) => {
  const errDiv = document.querySelector('.countries');
  errDiv.innerHTML = `
     <h1 class="text-danger">${err}</h1>
     <img src="./img/404.png" alt="" />
    `;
    
}

selectDiv.onchange = (e) => {
  console.log(e.target.value);
  const selectedCountry = countries.filter((country) => {
    return country.name.common === e.target.value;
  })
  
  showCountry(selectedCountry[0]);
};
const showCountry = (country) => {
  const {
    name: { common: countryName },
    currencies,
    capital,
    region,
    languages,
    population,
    flags: { png: flagUrl },
    maps: { googleMaps },
    borders,
  } = country;

  let divCountry = `<div class="card" style="width: 18rem;">
  <img src=${flagUrl} class="card-img-top" >
  <div class="card-body">
    <h5 class="card-title text-center">${countryName}</h5>
    
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"> Region: ${region}</li>
    <li class="list-group-item"> Capital: ${capital}</li>
    <li class="list-group-item">Languages: ${
      languages && Object.values(languages)
    }</li>
    <li class="list-group-item">Currencies: ${
      currencies && Object.values(currencies)[0]?.name
    }</li>
    <li class="list-group-item">Population: ${population}</li>
    <li class="list-group-item">Borders: ${borders ?? "-"}</li>
  </ul>
  <div class="card-body">
    <span>Map:</span>     <a href=${googleMaps} class="card-link"> Go to Google Map</a>
    
  </div>
</div>`;
  countryDiv.innerHTML = divCountry;
}
