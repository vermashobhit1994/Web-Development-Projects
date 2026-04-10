// back button implementation
const backBtn = document.querySelector(".back-btn")
backBtn.href = "#"





const countryName = new URLSearchParams(window.location.search).get('name')


const countriesNativeLanguages = {
    'Kyrgyzstan': 'Kyrgyz',
    'Papua New Guinea': 'Tok Pisin',
    'Fiji': 'Fijian',
    'Tanzania': 'Swahili',
    'Finland': 'Finnish',
    'Malawi': 'Chichewa',
    'Uzbekistan':'Uzbek',
    'uganda': 'Luganda',
    'Djibouti': 'Somali',
    'Jersey': 'Jèrriais',
    'Tuvalu': 'Tuvaluan', 
    'belgium': 'dutch', 
    'Cyprus': 'Greek', 
    'Kosovo': 'Albanian', 
    'Morocco': 'Moroccan Arabic',
    'Western Sahara': 'Hassania', 
    'Palau': 'Palauan', 
    'Botswana': 'Setswana', 
    'Comoros': 'Comorian', 
    'Belize': 'Belizean Creole', 
    'Jamaica': 'Jamaican Patois', 
    'Marshall Islands': 'Marshallese', 
    'Namibia': 'Oshiwambo', 
    'Luxembourg': 'Luxembourgish', 
    'Lebanon': 'Lebanese Arabic', 
    'Timor-Leste': 'Tetum', 
    'Zimbabwe': 'Shona', 
    'South Africa': 'Zulu', 
    'Ireland': 'Irish' ,
    'Norway': 'Norwegian', 
    'Kenya': 'Swahili', 
    'Afghanistan': 'Dari', 
    'Lesotho': 'Sesotho', 
    'Madagascar': 'Malagasy', 
    'American Samoa': 'Samoan', 
    'Turkmenistan': 'Turkmen', 
    'Rwanda': 'Kinyarwanda', 
    'Norfolk Island': 'Norfuk', 
    'Tokelau': 'Tokelau', 
    'Niue': 'Vagahau Niue', 
    'Argentina': 'Spanish', 
    'Kazakhstan': 'kazakh',
    'India' : 'Hindi', 
    'Guam': 'Chamorro', 
    'DR Congo': 'French', 
    'Mauritius': 'Mauritian Creole', 
    'Northern Mariana Islands': 'Chamorro', 
    'Tajikistan': 'Tajik', 
    'Malaysia': 'Malay', 
    'Somalia': 'Somali', 
    'Central African Republic': 'Sango',
    'Macau': 'Chinese', 
    'Israel': 'Hebrew', 
    'Iraq': 'Arabic', 
    'Switzerland': 'German', 
    'Vanuatu': 'Bislama', 
    'Pakistan': 'Urdu', 
}


isRequestSent = false

if(!isRequestSent){
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=True`)
    .then((resp) => resp.json())
        .then((country) => {
        country = country[0]

        // country flag image 
        // 1. country name
        // 2. native name
        // 3. population
        // 4. region
        // 5. subregion
        // 6. capital
        // 7. top level domain
        // 8. currencies
        // 9. languages
        // 10. border countries 

        const countryDetailsContainer = document.querySelector(".country-details-container")

        const detailsTextContainer = document.createElement('div')
        detailsTextContainer.classList.add("details-text-container")

        const detailsText = document.createElement('div')
        detailsText.classList.add("details-text")

        let boldText = null

        // 1. country flag image
        const countryFlagContainer = document.createElement('div')
        countryFlagContainer.classList.add("country-flag-container") 
        if(country?.flags){
            const flagImage = document.createElement('img')
            flagImage.src = `${country?.flags?.svg}`
            flagImage.alt = `${country?.flags?.alt}`
            flagImage.classList.add("country-flag")
            countryFlagContainer.appendChild(flagImage)
            countryDetailsContainer.appendChild(countryFlagContainer)
        }
        
        // 2. country name 
        if(country?.name?.common){
            const countryName = document.createElement('h2')
            countryName.textContent = `${country?.name?.common}` 
            
            detailsTextContainer.appendChild(countryName)
        }
        
        
        
        

        // 3. native name - must be in national language
        if(country?.name?.nativeName){
            const countryNativeName = document.createElement('p')
            boldText = document.createElement('b')
            boldText.textContent = "Native Name: "
            countryNativeName.append(boldText)
            const nativeNames = Object.values(country?.name?.nativeName)
            let singleNativeLanguage = null; 
            if(Object.keys(nativeNames).length == 1){
                const [nativeName] = nativeNames
                countryNativeName.append(`${nativeName.common}`)
            }else if(country.name.common){
                for (language of Object.keys(countriesNativeLanguages)){
                        if(country.name.common == language)
                            singleNativeLanguage = countriesNativeLanguages[language]
                    }
                // native language not found 
                if(!singleNativeLanguage){
                    const [nativeName] = nativeNames
                    countryNativeName.append(`${nativeName.common}`)
                }else{
                    let countryCode = null
                    // find language code
                    if(singleNativeLanguage){
                        for (const [code,language] of Object.entries(country.languages)){
                            if(language == singleNativeLanguage){
                                countryCode = code
                            }
                        }
                    }

                    // find native language using country code
                    if(countryCode){
                        const nativeName = country.name.nativeName[countryCode].common
                        countryNativeName.append(`${nativeName}`)
                    }
                }
            }

            detailsText.appendChild(countryNativeName)
            boldText = null
        } 
        
        

        // 4. population of country
        if(country?.population){
            const countryPopulation = document.createElement('p')
            boldText = document.createElement('b')
            boldText.textContent = "Population: "
            countryPopulation.append(boldText,country?.population.toLocaleString('en-IN'))
            boldText = null
            detailsText.appendChild(countryPopulation)
        }
        
        

        // 5. region (continent) of country
        if(country?.region){
            const countryRegion = document.createElement('p')
            boldText = document.createElement('b')
            boldText.textContent = "Region: "
            countryRegion.append(boldText,country?.region)
            boldText = null
            detailsText.appendChild(countryRegion)
        }
        
        
        // 6. subregion of country
        if(country?.subregion){
            const countrySubregion = document.createElement('p')
            boldText = document.createElement('b')
            boldText.textContent = "SubRegion: "
            countrySubregion.append(boldText)
            if(country.subregion){
                countrySubregion.append(boldText,country?.subregion)
            }
            boldText = null
            detailsText.appendChild(countrySubregion)
        }
        
        // 7. capital of country
        if(country?.capital){
            const countryCapital = document.createElement('p')
            boldText = document.createElement('b')
            boldText.textContent = "Capital: "
            countryCapital.append(boldText)
            const capitalsSorted = country.capital.toSorted()
            const lastCapitalItem = capitalsSorted.at(-1)
            for(capital of capitalsSorted){
                if(capital != lastCapitalItem){
                    countryCapital.append(`${capital}, `)
                }else{
                    countryCapital.append(`${capital}`)
                }
            }
            boldText = null
            detailsText.appendChild(countryCapital)
        }
        
        
        

        // 8. top level domain of country
        if(country?.tld){
            const countryTopLevelDomain = document.createElement('p')
            boldText = document.createElement('b')
            boldText.textContent = "Top Level Domain: "
            countryTopLevelDomain.append(boldText,country.tld)
            boldText = null
            detailsText.appendChild(countryTopLevelDomain)
        }

        // 9. country currencies
        if(country?.currencies){
            const countryCurrencyName = document.createElement('span')
            countryCurrencyName.classList.add("country-currency-name")

            const countryCurrencies = document.createElement('p')
            countryCurrencies.classList.add("country-currencies")
            boldText = document.createElement('b')
            boldText.textContent = "Currencies: "
            countryCurrencies.append(boldText)
            
            const currenciesSorted = Object.values(country.currencies).toSorted()
            
            for (currencyCodeValue of currenciesSorted){
                if(currenciesSorted.length == 1){
                    countryCurrencyName.innerText = currencyCodeValue?.name
                }else{
                    countryCurrencyName.innerText = `${currencyCodeValue?.name}, `    
                }
            }

            countryCurrencies.append(countryCurrencyName)    
            detailsText.appendChild(countryCurrencies)

            boldText = null
            
        }
            
        

        // 10. language spoken in country
        if(country?.languages){
            const countryLanguages = document.createElement('p')
            boldText = document.createElement('b')
            boldText.textContent = "Languages: "
            countryLanguages.append(boldText)
            const languagesSorted = Object.values(country.languages).toSorted()
            const lastLanguageItem = languagesSorted.at(-1) 
            for (languages of languagesSorted){
                if (languages != lastLanguageItem){
                    countryLanguages.append(`${languages}, `)
                }else{
                    countryLanguages.append(`${languages}`)
                }
                
            }
            boldText = null
            detailsText.appendChild(countryLanguages)
        }

        detailsTextContainer.appendChild(detailsText)

        //11. border countries
        
        if(country?.borders){
            
            const borderCountriesContainer = document.createElement('p')
            borderCountriesContainer.classList.add("border-countries-container")
            const borderCountriesText = document.createElement('span')
            borderCountriesText.classList.add('border-countries-text')

            boldText = document.createElement('b')
            boldText.textContent = "Border Countries:\u00A0\u00A0\u00A0\u00A0"
            borderCountriesContainer.appendChild(boldText)
            
         
            

            const borderCountriesCodes = country.borders
            
            for(countryCode of borderCountriesCodes){
                
                
                // country border names using country codes
                fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=name`)
                .then((resp) =>{ 
                        if(!resp.ok){
                            throw new Error(`HTTP Error status: ${Response.status}`)
                        }else{
                            return resp.json()
                        }
                    })
                .then((countryNamesDetails)=> {

                    const borderCountryNamesTag = document.createElement('a')
                    borderCountryNamesTag.href = "#"
                    borderCountryNamesTag.innerText = `${countryNamesDetails.name.common}`

                    borderCountriesText.append(borderCountryNamesTag)
                    
1                })
                
                borderCountriesContainer.appendChild(borderCountriesText)

            }
            
            detailsTextContainer.appendChild(borderCountriesContainer)
            
        } 
        
        countryDetailsContainer.appendChild(detailsTextContainer)
    })

    isRequestSent = true
}


