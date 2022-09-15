export default function fetchCountries(value){
    const url = `https://restcountries.com/v3.1/name/${value}`
return fetch(`${url}?fields=name,capital,population,flags,languages`).then(r => r.json());
}
