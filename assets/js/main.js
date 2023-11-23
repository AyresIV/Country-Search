var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchCountries() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://restcountries.com/v3.1/all");
        const data = yield response.json();
        const countries = data.map((countryData) => {
            return {
                name: countryData.name.common,
                capital: countryData.capital,
                population: countryData.population,
                region: countryData.region,
            };
        });
        return countries;
    });
}
function displayCountries() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const countries = yield fetchCountries();
            const countriesTable = document.getElementById('countriesTable');
            countries.forEach((country) => {
                const row = countriesTable.insertRow();
                row.innerHTML = `
                <td>${country.name}</td>
                <td>${country.capital}</td>
                <td>${country.population}</td>
                <td>${country.region}</td>
            `;
            });
        }
        catch (error) {
            console.error("Error fetching countries:", error);
        }
    });
}
displayCountries();
