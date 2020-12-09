import { getCitiesArray, getAreasArray, getParkingSpacesArray } from './utilsAPI.js';

refreshCitiesSelector();
$("#citiesSelect").change(function () { refreshCityAreasSelector(); });
$("#areasSelect").change(function () {
    // call search bar creation
    if (($("#areasSelect").val() === "0" ) == false) {
        addSearchBar();
    } else {
        removeSearchBar();
    }
    refreshAreaSpaces();
});

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

async function refreshAreaSpaces() {
    event.preventDefault();
    let areaId = $("#areasSelect").val();
    let searchPhrase = $("#searchPhrase").val();
    let parkingSpaces = await getParkingSpacesArray(areaId, searchPhrase);
    $("#spacesContainer").empty();
    for (var i = 0; i < parkingSpaces.length; i++) {
        let element = `
                        <p>${parkingSpaces[i].Name} ${parkingSpaces[i].StreetName} - ${parkingSpaces[i].HourlyPrice}</p>
                      `;
        $("#spacesContainer").append(element);
    }
}

async function addSearchBar() {
    $("#searchBarContainer").empty();
    let searchElement = `
                        <table class="table">
                            <tr>
                                <td></td>
                                <td></td>
                                <td><input class="form-control mr-sm-2" type="search" id="searchPhrase"></td>
                                <td><button class="btn btn-primary mb-2" id="refreshButton">Refresh</button></td>
                                <td></td>
                            </tr>
                        </table>
                        `;
    $("#searchBarContainer").append(searchElement);
    $("#refreshButton").click(function () { refreshAreaSpaces(); });
}

async function removeSearchBar() {
    $("#searchBarContainer").empty();
}