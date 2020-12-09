import { getCitiesArray, getAreasArray, getParkingSpacesArray } from './utilsAPI.js';

refreshCitiesSelector();
$("#CitiesSelect").change(function () { refreshCityAreasSelector(); });
$("#AreassSelect").change(function () { refreshAreaSpaces(); });

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

async function refreshAreaSpaces() {
    let areaId = $("#AreassSelect").val();
    let parkingSpaces = await getParkingSpacesArray(areaId);
    $("#spacesContainer").empty();
    for (var i = 0; i < parkingSpaces.length; i++) {
        let element = `
                        <p>${parkingSpaces[i].Name} ${parkingSpaces[i].StreetName} - ${parkingSpaces[i].HourlyPrice}</p>
                      `;
        $("#spacesContainer").append(element);
    }
}