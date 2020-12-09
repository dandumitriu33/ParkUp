import { getCitiesArray } from './utilsAPI.js';

refreshCitiesSelector();

async function refreshCitiesSelector() {
    let cities = await getCitiesArray();
    $("#CitiesSelect").empty();
    $("#CitiesSelect").append(`<option value="0">Select City...</option>`);
    for (var i = 0; i < cities.length; i++) {
        let element = `
                        <option value="${cities[i].Id}">${cities[i].Name}</option>
                      `;
        $("#CitiesSelect").append(element);
    }
}

