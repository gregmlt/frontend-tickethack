moment.locale("fr");

// *************** recherche itineraire et resultat *************
function searchTrain() {
  document.querySelector("#btn-search").addEventListener("click", function () {
    const departure = document.querySelector("#departure").value;
    const arrival = document.querySelector("#arrival").value;
    const date = document.querySelector("#date").value;
    const formattedDate = new Date(date).getTime() / 1000;
    fetch(
      `http://localhost:3000/trips/${departure}/${arrival}/${formattedDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.allTrips == "") {
          data.allTrips.forEach((trip) => {
            const date = moment(trip.date).format("LT");
            document.querySelector("#display-card").innerHTML += `
                    <div id="select-your-train">
                      <div class="train">
                        <div class="itinerary">
                          <p class="departure">${trip.departure}</p>
                          <p>></p>
                          <p class="arrival">${trip.arrival}</p>
                        </div>
                        <p class="departure-time">${date}</p>
                        <p class="price">${trip.price}€</p>
                        <input type="button" value="Book" id="btn-book" />
                      </div> 
                    </div>
                    `;
            document.querySelector(".display-list-content01").style.display =
              "none";
          });
        } else {
          console.log("no trip found");
        }
      });
  });
}

searchTrain();

// **************** selection du trajet / btn book **************


