interface Country {
    name: string;
    capital: string;
    population: number;
    region: string;
}

async function fetchCountries(): Promise<Country[]> {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    
    const countries: Country[] = data.map((countryData: any) => {
        return {
            name: countryData.name.common,
            capital: countryData.capital,
            population: countryData.population,
            region: countryData.region,
        };
    });
    
    return countries;
}

async function displayCountries() {
    try {
        const countries = await fetchCountries();
        const countriesTable = document.getElementById('countriesTable') as HTMLTableElement;

        countries.forEach((country) => {
            const row = countriesTable.insertRow();
            row.innerHTML = `
                <td>${country.name}</td>
                <td>${country.capital}</td>
                <td>${country.population}</td>
                <td>${country.region}</td>
            `;
        });
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

displayCountries();