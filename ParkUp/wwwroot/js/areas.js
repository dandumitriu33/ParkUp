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
    $("#addAreaElement").empty();
    if (cityId != 0) {
        let addAreaContent = `
                                <div class="row">
                                    <div class="col-md-12">
                                        <form>
                                            <div class="form-group">
                                                <label for="areaName"></label>
                                                <input type="text" id="areaName" class="form-control" />
                                                <span id="addAreaValidationErrorMessage" class="text-danger"></span>
                                            </div>
                                            <button id="submitNewArea" class="btn btn-primary">Add Area</button>
                                        </form>
                                    </div>
                                </div>
                                `;
        $("#addAreaElement").append(addAreaContent);
        $("#submitNewArea").click(function () { addNewArea(); });
    }
}

async function addNewArea() {
    event.preventDefault();
    $("#addAreaValidationErrorMessage").empty();
    let cityId = parseInt($("#CitiesSelect").val());
    let newAreaName = $("#areaName").val();
    if (await validateAreaName(newAreaName) == false) {
        $("#addAreaValidationErrorMessage").text("The area name is required and must be less than 100 characters long.");
    } else {
        console.log("Adding new area...");
        let URL = `https://localhost:44315/api/areas/${cityId}`;
        var obj = JSON.stringify({ Id: 0, Name: newAreaName, CityId: cityId });
        await $.ajax({
            type: "POST",
            url: URL,
            data: obj,
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            success: function () {
                console.log("Area added successfully.");
            },
            error: function (jqXHR, status) {
                console.log(jqXHR);
                console.log('fail' + status.code);
                $("#addAreaValidationErrorMessage").text("Name length or connection error.");
            }
        });
        console.log("Area Added...");
        console.log("Repopulating areas...");
        let GETURL = `https://localhost:44315/api/areas/${cityId}`;
        await $.getJSON(GETURL, function (data) {
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
}

async function validateAreaName(areaName) {
    areaName.trim();
    if (areaName.length > 0 && areaName.length < 100) {
        return true;
    } else {
        return false;
    }
}