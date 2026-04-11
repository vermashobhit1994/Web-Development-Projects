const countriesContainer = document.querySelector(".countries-container");
const title =document.querySelector('.title')



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
        
        
        // if (country?.name?.nativeName) {
        //     const nativeNames = Object.values(country?.name?.nativeName);
        //     if (Object.keys(nativeNames).length > 1) {
        //         // console.log(country);
        //     }
        // }

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

// const countryCard = document.createElement('a')
// countryCard.classList.add('country-card')

// console.log(countryCard)

// flagImage = document.createElement('img')
// flagImage.setAttribute("src","https://")
// flagImage.setAttribute("alt","Germany country")

// countryCard.appendChild(flagImage)

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
                console.log(data)
            })
        }
        
    })
}



searchCountries()
filterByRegion()
