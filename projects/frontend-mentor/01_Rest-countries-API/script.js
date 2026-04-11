const countriesContainer = document.querySelector(".countries-container");
const title =document.querySelector('.title')
const searchCountryDarkMode = document.querySelector(".search-country")
const filterByRegionDarkMode = document.querySelector(".filter-by-region")


let allCountriesData = null;

fetch(
    "https://restcountries.com/v3.1/all?fields=capital,flags,continents,name,population,cca3",
).then((response) => response.json())
.then((data) => {
    allCountriesData = data;
    renderCountries(data)
});

function renderCountries(data) {
    data.forEach((country) => {

        // Each country card contains
        // 1. flag
        // 2. common name
        // 3. population
        // 4. region (continent)
        // 5. capital
        const countryCard = document.createElement("a");
        countryCard.classList.add("country-card");
        countryCard.href = `/country.html?name=${country.name.common}`;

        const cardText = document.createElement("div");
        cardText.classList.add("card-text");

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");

        let boldText = null;

        // 1. country flag
        const countryFlag = document.createElement("img");
        countryFlag.setAttribute("src", `${country.flags.svg}`);
        countryFlag.setAttribute("alt", `${country.name.common} flag image`);
        imgContainer.appendChild(countryFlag);

        // 2. country common name
        const countryName = document.createElement("h2");
        countryName.classList.add("card-title");
        countryName.textContent = `${country.name["common"]}`;

        // 3. country population
        const countryPopulation = document.createElement("p");
        boldText = document.createElement("b");
        boldText.textContent = `Population: `;
        countryPopulation.append(boldText);
        countryPopulation.append(
            `${country.population.toLocaleString("en-IN")}`,
        );
        boldText = null;

        // 4. country region i.e. continent
        const countryRegion = document.createElement("p");
        boldText = document.createElement("b");
        boldText.textContent = `Region: `;
        countryRegion.appendChild(boldText);
        countryRegion.append(`${country.continents[0]}`);
        boldText = null;

        // 5. country capital
        const countryCapital = document.createElement("p");
        boldText = document.createElement("b");
        boldText.textContent = `Capital: `;
        countryCapital.appendChild(boldText);

        // add , to each country capitals excluding last country
        lastCapitalIndex = country.capital.length - 1;
        capitals = "";
        if (country.capital.length > 1) {
            for (const [index, item] of country.capital.entries()) {
                if (index != lastCapitalIndex) {
                    countryCapital.append(` ${item}, `);
                }
            }
        }
        countryCapital.append(` ${country.capital} `);

        boldText = null;

        cardText.append(
            countryName,
            countryPopulation,
            countryRegion,
            countryCapital,
        );

        countryCard.append(imgContainer, cardText);
        countriesContainer.appendChild(countryCard);
    });
}


function searchCountries(){
    
    const searchInput = document.querySelector(".search-country input");
    
    searchInput.addEventListener("input", (e) => {
        const searchedValue = e.target.value.toLowerCase();
        
        
    
        if(allCountriesData){
            const filteredCountries = allCountriesData.filter((country) => {
                return country.name.common.toLowerCase().includes(searchedValue)
            })
            
            // clear previous output 
            countriesContainer.innerHTML = ""
            renderCountries(filteredCountries)

            // show message no country found
            if(filteredCountries.length == 0){
                const countriesNotFound = document.createElement('p')
                countriesNotFound.classList.add("countries-not-found")
                countriesNotFound.innerText = "No country found for matching criteria"
                countriesContainer.appendChild(countriesNotFound)            
            }
        }
        
        
    });
}

function filterByRegion(){
    const filterByRegion = document.querySelector('.filter-by-region')
    filterByRegion.addEventListener('change', (e) => {
        if(e.target.value){
            // search by region using API
            fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
            .then((resp) => resp.json())
            .then((data) => {
                // clear previous output 
                countriesContainer.innerHTML = ""
                renderCountries(data)
            })
        }
        
    })
}


function changeColorTheme(){
    
    const sunIconString = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="hsl(0, 100%, 100%)"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm113-170q-70-70-70-170t70-170q70-70 170-70t170 70q70 70 70 170t-70 170q-70 70-170 70t-170-70Zm283-57q47-47 47-113t-47-113q-47-47-113-47t-113 47q-47 47-47 113t47 113q47 47 113 47t113-47ZM480-480Z"/></svg>';
    const parser = new DOMParser();
    const doc = parser.parseFromString(sunIconString, "image/svg+xml");
    const sunIcon = doc.documentElement;

    const moonIcon = document.querySelector('.header-content button svg')
    const themeBtn = document.querySelector(".header-content button")
    
    const darkModeBtnText = document.createTextNode('\u00A0\u00A0Dark Mode')
    const lightModeBtnText = document.createTextNode('\u00A0\u00A0Light Mode')
    
    const searchIcon = document.querySelector(".search-country svg")
    const searchIconDarkModeColor = 'hsl(0, 100%, 100%)'
    const searchIconLighModeColor = 'hsl(200, 15%, 8%)'


    let isDarkMode = false

    themeBtn.addEventListener("click", (e) => {
        countriesContainer.classList.toggle("dark")
        document.body.classList.toggle('dark')
        document.querySelector(".search-country").classList.toggle('dark')
        document.querySelector(".filter-by-region").classList.toggle('dark')
        document.querySelector(".header-content").classList.toggle('dark')

        if(!isDarkMode){
            moonIcon.remove()
            themeBtn.innerText = ""
            themeBtn.prepend(sunIcon)
            themeBtn.appendChild(lightModeBtnText)
            searchIcon.style.fill = searchIconDarkModeColor
            isDarkMode = true
                        
        }else{
            sunIcon.remove()
            themeBtn.innerText = ""
            themeBtn.prepend(moonIcon)
            themeBtn.appendChild(darkModeBtnText)
            searchIcon.style.fill = searchIconLighModeColor
            isDarkMode = !isDarkMode
        }
        
        
        
    })
}

searchCountries()
filterByRegion()
changeColorTheme()
