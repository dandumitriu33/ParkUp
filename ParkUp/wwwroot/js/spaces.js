import { getCitiesArray, getAreasArray, getParkingSpacesArray, getMyParkingSpacesArray } from './utilsAPI.js';
console.log("hi from spaces");


// new JS area stuff
refreshCitiesSelector();
$("#citiesSelect").change(function () { refreshCityAreasSelector(); });
$("#areasSelect").change(function () {
    // call search bar creation
    if (($("#areasSelect").val() === "0") == false) {
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
    $('#searchPhrase').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            refreshAreaSpaces();
        }
    });
}

async function removeSearchBar() {
    $("#searchBarContainer").empty();
}

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
async function refreshAreaSpaces() {
    event.preventDefault();
    let userId = $("#userId").text();
    let areaId = $("#areasSelect").val();
    let searchPhrase = $("#searchPhrase").val();
    let parkingSpaces = await getMyParkingSpacesArray(userId, areaId, searchPhrase);
    $("#spacesContainer").empty();
    for (var i = 0; i < parkingSpaces.length; i++) {
        if (parkingSpaces[i].IsApproved != null) {
            let element = await generateFreeParkingSpaceElement(parkingSpaces[i]);
            $("#spacesContainer").append(element);
        }
    }
    $("[class*=btn][class*=btn-success]").click(function () {
        let parkingSpaceId = this.id.replace("parkingSpace", "");
        console.log("psID: " + parkingSpaceId);
        let userId = $("#userId").text();
        console.log("usrID: " + userId);
        handleTakeParkingSpace(parkingSpaceId, userId);
    })
}

async function generateFreeParkingSpaceElement(parkingSpace) {
    let element = `
                    <tr>
                        <td>${parkingSpace.Name}</td>
                        <td>${parkingSpace.StreetName}</td>
                        <td>${parkingSpace.HourlyPrice} Credits</td>
                        <td><button id="parkingSpace${parkingSpace.Id}" class="btn btn-success">Do Stuff</button></td>
                    </tr>
                  `;
    return element;
}

async function handleTakeParkingSpace(parkingSpaceId, userId) {
    event.preventDefault();
    console.log("Taking parking space...");
    console.log("HNDpsID: " + parkingSpaceId + " " + typeof (parkingSpaceId));
    console.log("HNDusrID: " + userId + " " + typeof (userId));
    let URL = `https://localhost:44315/api/parkingspaces/take`;
    var obj = JSON.stringify({ ParkingSpaceId: parseInt(parkingSpaceId), UserId: userId });
    console.log("obj" + obj);
    await $.ajax({
        type: "POST",
        url: URL,
        data: obj,
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        success: function () {
            console.log("Parking space taken successfully.");
        },
        error: function (jqXHR, status) {
            console.log(jqXHR);
            console.log('fail' + status.code);
        }
    });
    $("#takenCardContainer").empty();
    checkIfTakenParkingSpacesAndDisplayCard();
}

async function handleLeaveParkingSpace(parkingSpaceId, userId) {
    event.preventDefault();
    console.log("Leaving parking space...");
    console.log("HNDpsID: " + parkingSpaceId + " " + typeof (parkingSpaceId));
    console.log("HNDusrID: " + userId + " " + typeof (userId));
    let URL = `https://localhost:44315/api/parkingspaces/leave`;
    var obj = JSON.stringify({ ParkingSpaceId: parseInt(parkingSpaceId), UserId: userId });
    console.log("obj" + obj);
    await $.ajax({
        type: "POST",
        url: URL,
        data: obj,
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        success: function () {
            console.log("Parking space left successfully.");
        },
        error: function (jqXHR, status) {
            console.log(jqXHR);
            console.log('fail' + status.code);
        }
    });
    $("#takenCardContainer").empty();
    checkIfTakenParkingSpacesAndDisplayCard();
}