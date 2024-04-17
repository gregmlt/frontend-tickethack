moment.locale("fr");

// *************** recherche itineraire et resultat *************
function searchTrain() {
  document.querySelector("#btn-search").addEventListener("click", function () {
    const departure = document.querySelector("#departure").value;
    const arrival = document.querySelector("#arrival").value;
    const date = document.querySelector("#date").value;
    const formattedDate = new Date(date).getTime() / 1000;
    fetch(
      `https://backend-tickethack-self.vercel.app/trips/${departure}/${arrival}/${formattedDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          data.allTrips.forEach((trip) => {
            const date = moment(trip.date).format("LT");
            document.querySelector("#display-card").innerHTML += `
                    <div id="select-your-train">
                      <div class="train" id="${trip._id}">
                        <div class="itinerary">
                          <p class="departure">${trip.departure}</p>
                          <p>></p>
                          <p class="arrival">${trip.arrival}</p>
                        </div>
                        <p class="departure-time">${date}</p>
                        <p class="price">${trip.price}€</p>
                        <input type="button" value="Book" class="btn-book" />
                      </div> 
                    </div>
                    `;
            document.querySelector(".display-list-content01").style.display =
              "none";
          });
        } else {
          console.log("no trip found");
        }
        addToCart();
      });
  });
}

function addToCart() {
  const btnClass = document.querySelectorAll(".btn-book");
  for (let i = 0; i < btnClass.length; i++) {
    btnClass[i].addEventListener("click", function () {
      id = this.parentNode.id;
      fetch("https://backend-tickethack-self.vercel.app/carts/post/onetrip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.location.assign("/frontend/cart.html");
        });
    });
  }
}

searchTrain();

// **************** selection du trajet / btn book **************
