/* **********************************************
 *                                              *
 *                  FUNCTIONS                   *
 *                                              *
/* ******************************************* */

function getAllTripsFromCart() {
  fetch("http://localhost:3000/carts/get/alltrips")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.allTrips == "") {
        html += `
                    <p>My cart</p>
                    <div id="my-cart">
                        <div id="no-ticket-message">
                            <p>No ticket in your cart.</p>
                            <p>Why not plan trip ?</p>
                        </div>
                    </div>`;
        document.querySelector("#cart").innerHTML = html;
      } else {
        const allTrips = data.allTrips;
        for (const trip of allTrips) {
          moment.locale("fr");
          const date = moment(trip.id[0].date).format("LT");
          html += `<div class=train id="${trip._id}">
            <div class="itinerary">
              <p class="departure">${trip.id[0].departure}</p>
              <p>></p>
              <p class="arrival">${trip.id[0].arrival}</p>
            </div>
            <p class="departure-time">${date}</p>
            <p class="price">${trip.id[0].price}€</p>
            <button class="btn-delete">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>`;
        }
        document.querySelector("#my-cart").innerHTML = html;
        purchase();
      }
      const trainClass = document.querySelectorAll(".train");
      console.log(trainClass.length);
      deleteOneTripFromCart();
      return html;
    });
}

function deleteOneTripFromCart() {
  const btnsDelete = document.querySelectorAll(".btn-delete");
  for (let i = 0; i < btnsDelete.length; i++) {
    btnsDelete[i].addEventListener("click", function () {
      const id = this.parentNode.id;
      fetch(`http://localhost:3000/carts/delete/onetrip/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(
          (data) =>
            (document.querySelector("#my-cart").innerHTML =
              getAllTripsFromCart())
        );
    });
  }
}

function purchase() {
  document
    .querySelector("#btn-purchase")
    .addEventListener("click", function () {
      const trainClass = document.querySelectorAll(".train");
      for (let i = 0; i < trainClass.length; i++) {
        fetch("http://localhost:3000/bookings/post/allTripsBooked", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json)
          .then((data) => {
            console.log(data);
            window.location.assign("/frontend/booking.html");
          });
      }
    });
}

/* **********************************************
 *                                              *
 *                    LOGIC                     *
 *                                              *
/* ******************************************* */
getAllTripsFromCart();
