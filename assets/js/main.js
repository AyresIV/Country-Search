document.addEventListener('DOMContentLoaded', function () {
    const allButton = document.getElementById('all');
    const searchButton = document.getElementById('search');
    const form = document.querySelector('form');
    const searchCountryInput = document.getElementById('searchCountry');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    searchCountryInput === null || searchCountryInput === void 0 ? void 0 : searchCountryInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            clearTableData();
            const searchCountry = searchCountryInput.value;
            country('name', searchCountry);
        }
    });
    allButton === null || allButton === void 0 ? void 0 : allButton.addEventListener('click', () => {
        clearTableData();
        country('all', '');
    });
    searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener('click', () => {
        clearTableData();
        const searchCountry = searchCountryInput.value;
        country('name', searchCountry);
    });
    function clearTableData() {
        clearElementContent('countryx');
        clearElementContent('region');
        clearElementContent('currencies');
    }
    function clearElementContent(elementId) {
        const element = document.getElementById(elementId);
        element.innerHTML = '';
    }
    function country(name, con) {
        fetch(`https://restcountries.com/v3.1/${name}/${con}`)
            .then(response => response.json())
            .then((result) => {
            let allPeople = 0;
            const arryRegion = [];
            const arryCurrencies = [];
            clearElementContent('totalCountries');
            clearElementContent('totalPopulation');
            clearElementContent('averagePopulation');
            clearElementContent('countryx');
            clearElementContent('region');
            clearElementContent('currencies');
            result.forEach((element) => {
                const keyCurrencies = element.currencies ? Object.keys(element.currencies)[0] : null;
                if (keyCurrencies)
                    arryCurrencies.push(keyCurrencies);
                arryRegion.push(element.region);
                allPeople += element.population;
                appendTableRow('countryx', element.name.common, element.population, keyCurrencies);
            });
            updateElementContent('totalCountries', `Total Countries Found: <p>${result.length}</p>`);
            updateElementContent('totalPopulation', `Total Countries Population: <p>${allPeople}</p>`);
            updateElementContent('averagePopulation', `Average Population: <p>${(allPeople / result.length).toFixed()}</p>`);
            const region = regionCurrencies(arryRegion);
            const currencies = regionCurrencies(arryCurrencies);
            displayTableData(region, 'region');
            displayTableData(currencies, 'currencies');
            const frontElement = document.querySelector('.front');
            frontElement === null || frontElement === void 0 ? void 0 : frontElement.classList.toggle('hide', !frontElement.classList.contains('hide'));
        })
            .catch(() => {
            showErrorAlert();
        });
    }
    function regionCurrencies(array) {
        return array.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});
    }
    function displayTableData(data, elementId) {
        const element = document.getElementById(elementId);
        for (const [key, value] of Object.entries(data)) {
            element === null || element === void 0 ? void 0 : element.insertAdjacentHTML('beforeend', `
        <tr>
          <td class="center">${key}</td>
          <td class="center">${value}</td>
        </tr>`);
        }
    }
    function showErrorAlert() {
        alert('Couldn’t find any countries matching your search.');
    }
    function updateElementContent(elementId, content) {
        const element = document.getElementById(elementId);
        element === null || element === void 0 ? void 0 : element.insertAdjacentHTML('beforeend', content);
    }
    function appendTableRow(tableId, name, population, currency) {
        const table = document.getElementById(tableId);
        table === null || table === void 0 ? void 0 : table.insertAdjacentHTML('beforeend', `
      <tr>
        <td class="first">${name}</td>
        <td class="center">${population}</td>
        <td class="center">${currency}</td>
      </tr>`);
    }
});
