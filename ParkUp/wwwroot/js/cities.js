console.log("hi");

populateCities();

async function populateCities() {
    console.log("Getting cities...");
    let URL = `https://localhost:44315/api/cities`;
    await $.getJSON(URL, function (data) {
        $("#citiesContainer").empty();
        for (var i = 0; i < data.length; i++) {
            let city = data[i];
            let element = `
                            <span>
                                ${city.Name} (${city.Id}) 
                            </span>
                          `;
            $("#citiesContainer").append(element);
        }
    })
    console.log("Cities retrieved.");
}

$("#submitNewCity").click(addNewCity);

async function addNewCity() {
    event.preventDefault();
    $("#addCityValidationErrorMessage").empty();
    var newCityName = $("#cityName").val();
    if (await validateNewCityName(newCityName) == false) {
        $("#addCityValidationErrorMessage").text("The city name is required and must be less than 100 characters long.")
    } else {
        console.log("Adding new city...");
        let URL = `https://localhost:44315/api/cities`;
        var newCityId = 0;
        var newCityAreas = [];
        var obj = JSON.stringify({ Id: newCityId, Name: newCityName, Areas: newCityAreas });
        await $.ajax({
            type: "POST",
            url: URL,
            data: obj,
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            success: function () {
                console.log("City added successfully.");
            },
            error: function (jqXHR, status) {
                console.log(jqXHR);
                console.log('fail' + status.code);
                $("#addCityValidationErrorMessage").text("Name length or connection error.")
            }
        });
        console.log("City Added...");
        console.log("Reactivating Pop cities...");
        populateCities();
    }
}

async function validateNewCityName(cityName) {
    cityName = cityName.trim();
    if (cityName.length > 0 && cityName.length < 100) {
        return true;
    } else {
        return false;
    }
}