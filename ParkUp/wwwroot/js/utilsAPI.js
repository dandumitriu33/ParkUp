

async function getCitiesArray() {
    console.log("Getting cities...");
    let cities = [];
    let URL = `https://localhost:44315/api/cities`;
    await $.getJSON(URL, function (data) {
        for (var i = 0; i < data.length; i++) {
            cities.push(data[i]);
        }
    })
    console.log("Cities retrieved.");
    return cities;
}

async function getAreasArray(cityId) {
    console.log(cityId);
    console.log(`Getting areas for: ${cityId}`);
    let areas = [];
    let URL = `https://localhost:44315/api/areas/${cityId}`;
    await $.getJSON(URL, function (data) {
        for (var i = 0; i < data.length; i++) {
            areas.push(data[i]);
        }
    })
    console.log("Areas retrieved.");
    return areas;
}

// export
export { getCitiesArray, getAreasArray }