import { getCitiesArray, getAreasArray } from './utilsAPI.js';

refreshCitiesSelector();
$("#CitiesSelect").change(function () { refreshCityAreasSelector(); });

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

async function refreshCityAreasSelector() {
    let cityId = $("#CitiesSelect").val();
    let areas = await getAreasArray(cityId);
    $("#AreassSelect").empty();
    $("#AreassSelect").append(`<option value="0">Select an Area...</option>`);
    for (var i = 0; i < areas.length; i++) {
        let element = `
                        <option value="${areas[i].Id}">${areas[i].Name}</option>
                      `;
        $("#AreassSelect").append(element);
    }
}