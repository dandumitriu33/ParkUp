console.log("hi from spaces");

loadParkingSpaces();

async function loadParkingSpaces() {
    let userId = $("#userId").text();
    console.log(userId);
    console.log("Getting spaces...");
    let URL = `https://localhost:44315/api/owners/${userId}`;
    await $.getJSON(URL, function (data) {
        $("#parkingSpacesContainer").empty();
        
        for (var i = 0; i < data.length; i++) {
            let space = data[i];
            let element = `
                            <span>
                                ${space.Name} (${space.StreetName}) - Approved = ${space.IsApproved}
                            </span>
                          `;
            $("#parkingSpacesContainer").append(element);
        }
    })
    console.log("Spaces retrieved.");
}