console.log("hi from areas");

loadCities();

async function loadCities() {
    console.log("Getting cities...");
    let URL = `https://localhost:44315/api/cities`;
    await $.getJSON(URL, function (data) {
        $("#CitiesSelect").empty();
        $("#CitiesSelect").append(`<option value="0">
                                Select City... 
                            </option >`)
        for (var i = 0; i < data.length; i++) {
            let city = data[i];
            let element = `
                            <option value="${city.Id}">
                                ${city.Name} (${city.Id}) 
                            </option>
                          `;
            $("#CitiesSelect").append(element);
        }
    })
    console.log("Cities retrieved.");
}

$("#CitiesSelect").change(function () { populateCityAreas(); });

async function populateCityAreas() {
    let cityId = $("#CitiesSelect").val();
    console.log(cityId);
    console.log(`Getting areas for: ${cityId}`);
    let URL = `https://localhost:44315/api/areas/${cityId}`;
    await $.getJSON(URL, function (data) {
        $("#CityAreas").empty();
        for (var i = 0; i < data.length; i++) {
            let area = data[i];
            let element = `
                            <span>
                                ${area.Name} (${area.Id}) 
                            </span>
                          `;
            $("#CityAreas").append(element);
        }
    })
}