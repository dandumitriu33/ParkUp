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
    console.log("Adding new city...");
    let URL = `https://localhost:44315/api/cities`;
    var newCityId = 0;
    var newCityName = $("#cityName").val();
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
        }
    });
    console.log("City Added...");
    console.log("Reactivating Pop cities...");
    populateCities();
}