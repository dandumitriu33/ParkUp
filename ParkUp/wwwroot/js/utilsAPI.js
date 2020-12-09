

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

// export
export {getCitiesArray}