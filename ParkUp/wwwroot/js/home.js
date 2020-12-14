import { getCitiesArray, getAreasArray, getParkingSpacesArray } from './utilsAPI.js';

// Taken Parking Space Card
checkIfTakenParkingSpacesAndDisplayCard();

async function checkIfTakenParkingSpacesAndDisplayCard() {
    console.log("Checking for taken parking spaces...");
    var userId = $("#userId").text();
    console.log("userId: " + userId);
    var takenParkingSpaces = [];
    let URL = `https://localhost:44315/api/parkingspaces/${userId}`;
    await $.getJSON(URL, function (data) {
        for (var i = 0; i < data.length; i++) {
            takenParkingSpaces.push(data[i]);
        }
    })
    if (takenParkingSpaces.length > 0) {
        for (var i = 0; i < takenParkingSpaces.length; i++) {
            var now = Date.now();
            var start = new Date(takenParkingSpaces[i].DateStarted);
            var timeElapsed = Math.round((now - start) / 1000 / 60);
            var currentCharge = Math.ceil(timeElapsed / 30) * (takenParkingSpaces[i].HourlyPrice/2); 
            let element = `
                            <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
                              <div class="card-header">${takenParkingSpaces[i].Name}</div>
                              <div class="card-body">
                                <h5 class="card-title">Price: ${takenParkingSpaces[i].HourlyPrice}</h5>
                                <p class="card-text">Elapsed: ${timeElapsed} minutes</p>
                                <p class="card-text">Charge: ${currentCharge} Credits</p>
                                <P>GPS 
                                    <a href="https://google.com/search?q=${takenParkingSpaces[i].GPS}" target="_blank">GGL</a> / 
                                    <a href="https://duckduckgo.com/?q=${takenParkingSpaces[i].GPS}&ia=web&iaxm=maps" target="_blank">DDG</a>
                                </p>
                                <button id="leaveParkingSpace${takenParkingSpaces[i].Id}" class="btn btn-warning">Leave</button>
                              </div>
                            </div>
                          `;
            $("#takenCardContainer").append(element);
        }
        $("[class*=btn][class*=btn-warning]").click(function () {
            let parkingSpaceId = this.id.replace("leaveParkingSpace", "");
            console.log("psID: " + parkingSpaceId);
            let userId = $("#userId").text();
            console.log("usrID: " + userId);
            handleLeaveParkingSpace(parkingSpaceId, userId);
        })
    }
}
// end of Taken Parking Space Card

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
    if (event) {
        event.preventDefault();
    }
    
    let areaId = $("#areasSelect").val();
    let searchPhrase = $("#searchPhrase").val();
    let parkingSpaces = await getParkingSpacesArray(areaId, searchPhrase);
    $("#spacesContainer").empty();
    for (var i = 0; i < parkingSpaces.length; i++) {
        if (parkingSpaces[i].IsTaken == false && parkingSpaces[i].IsApproved == true) {
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

async function generateFreeParkingSpaceElement(parkingSpace) {
    var userId = $("#userId").text();
    let element = "";
    if (userId.length > 0) {
        element = `
                    <tr>
                        <td>${parkingSpace.Name}</td>
                        <td>${parkingSpace.StreetName}</td>
                        <td>${parkingSpace.HourlyPrice} Credits</td>
                        <td>
                            <a href="https://google.com/search?q=${parkingSpace.GPS}" target="_blank">GGL</a> / 
                            <a href="https://duckduckgo.com/?q=${parkingSpace.GPS}&ia=web&iaxm=maps" target="_blank">DDG</a>
                        </td>
                        <td><button id="parkingSpace${parkingSpace.Id}" class="btn btn-success">Take</button></td>
                    </tr>
                  `;
    } else {
        element = `
                    <tr>
                        <td>${parkingSpace.Name}</td>
                        <td>${parkingSpace.StreetName}</td>
                        <td>${parkingSpace.HourlyPrice} Credits</td>
                        <td>
                            <a href="https://google.com/search?q=${parkingSpace.GPS}" target="_blank">GGL</a> / 
                            <a href="https://duckduckgo.com/?q=${parkingSpace.GPS}&ia=web&iaxm=maps" target="_blank">DDG</a>
                        </td>
                        <td><button id="parkingSpace${parkingSpace.Id}" class="btn btn-success" disabled>Take</button></td>
                    </tr>
                  `;
    }
    
    return element;
}

async function handleTakeParkingSpace(parkingSpaceId, userId) {
    event.preventDefault();
    console.log("Taking parking space...");
    console.log("HNDpsID: " + parkingSpaceId + " " + typeof(parkingSpaceId));
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
    refreshAreaSpaces();
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
    location.reload();
}