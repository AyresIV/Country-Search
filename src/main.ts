document.addEventListener('DOMContentLoaded', function () {
  const allButton = document.getElementById('all');
  const searchButton = document.getElementById('search');
  const form = document.querySelector('form');
  const searchCountryInput = document.getElementById('searchCountry') as HTMLInputElement;

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  searchCountryInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      clearTableData();
      const searchCountry = searchCountryInput.value;
      country('name', searchCountry);
    }
  });

  allButton?.addEventListener('click', () => {
    clearTableData();
    country('all', '');
  });

  searchButton?.addEventListener('click', () => {
    clearTableData();
    const searchCountry = searchCountryInput.value;
    country('name', searchCountry);
  });

  function clearTableData() {
    clearElementContent('countryx');
    clearElementContent('region');
    clearElementContent('currencies');
  }

  function clearElementContent(elementId: string) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
  }

  function country(name: string, con: string) {
    fetch(`https://restcountries.com/v3.1/${name}/${con}`)
      .then(response => response.json())
      .then((result: any[]) => {
        let allPeople = 0;
        const arryRegion: string[] = [];
        const arryCurrencies: string[] = [];

        clearElementContent('totalCountries');
        clearElementContent('totalPopulation');
        clearElementContent('averagePopulation');
        clearElementContent('countryx');
        clearElementContent('region');
        clearElementContent('currencies');

        result.forEach((element) => {
          const keyCurrencies = element.currencies ? Object.keys(element.currencies)[0] : null;
          if (keyCurrencies) arryCurrencies.push(keyCurrencies);

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
        frontElement?.classList.toggle('hide', !frontElement.classList.contains('hide'));
      })
      .catch(() => {
        showErrorAlert();
      });
  }

  function regionCurrencies(array: string[]) {
    return array.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  function displayTableData(data: Record<string, number>, elementId: string) {
    const element = document.getElementById(elementId);
    for (const [key, value] of Object.entries(data)) {
      element?.insertAdjacentHTML('beforeend', `
        <tr>
          <td class="center">${key}</td>
          <td class="center">${value}</td>
        </tr>`);
    }
  }

  function showErrorAlert() {
    alert('Couldn’t find any countries matching your search.');
  }

  function updateElementContent(elementId: string, content: string) {
    const element = document.getElementById(elementId);
    element?.insertAdjacentHTML('beforeend', content);
  }

  function appendTableRow(tableId: string, name: string, population: number, currency: string) {
    const table = document.getElementById(tableId);
    table?.insertAdjacentHTML('beforeend', `
      <tr>
        <td class="first">${name}</td>
        <td class="center">${population}</td>
        <td class="center">${currency}</td>
      </tr>`);
  }
});