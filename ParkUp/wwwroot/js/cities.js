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
}