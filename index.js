

// ****** fonction ******
// display trip 

moment.locale('fr');

document.querySelector("#btn-search").addEventListener("click", function (){
    const dateInput = document.querySelector("#date").value
    const formattedTime = moment(dateInput).format("YYYY-MM-DD");
    const getTrip = {
        departure : document.querySelector("#departure").value,
        arrival : document.querySelector("#arrival").value,
        date : formattedTime,
    };
    console.log(formattedTime);
    fetch("http://localhost:3000/routes/trips", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({getTrip})
        })
        .then(response => response.json())
        .then(data => {
 
        for (let i = 0; i < data.length; i++) {
            if(data[i] === getTrip.forEach(data)) {
                ///afficher les resultats
                document.querySelector("#select-your-train").innerHTML += `
                <div class="train">
                <div class="itinerary">
                <p class="departure">${data}</p>
                <p>></p>
                <p class="arrival">${data}</p>
                </div>
                <p class="departure-time">${data}</p>
                <p class="price">${data}€</p>
                <input type="button" value="Book" id="btn-book"/>
            </div> 
    `
            }}
}).catch(error)


});



