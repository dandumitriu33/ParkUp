import { getCitiesArray, getAreasArray, getParkingSpacesArray, getMyParkingSpacesArray } from './utilsAPI.js';

refreshCitiesSelector();
$("#citiesSelect").change(function () { refreshCityAreasSelector(); });

async function refreshCitiesSelector() {
    let cities = await getCitiesArray();
    $("#citiesSelect").empty();
    $("#citiesSelect").append(`<option value="0">Select City...</option>`);
    for (var i = 0; i < cities.length; i++) {
        let element = `
                        <option value="${cities[i].Id}">${cities[i].Name}</option>
                      `;
        $("#citiesSelect").append(element);
    }
}

async function refreshCityAreasSelector() {
    let cityId = $("#citiesSelect").val();
    let areas = await getAreasArray(cityId);
    $("#areasSelect").empty();
    $("#areasSelect").append(`<option value="0">Select an Area...</option>`);
    for (var i = 0; i < areas.length; i++) {
        let element = `
                        <option value="${areas[i].Id}">${areas[i].Name}</option>
                      `;
        $("#areasSelect").append(element);
    }
}