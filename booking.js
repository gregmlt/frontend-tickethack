/* **********************************************
 *                                              *
 *                  FUNCTIONS                   *
 *                                              *
/* ******************************************* */
moment.locale("fr");

function getAllTripsFromBooking() {
  fetch("backend-tickethack-self.vercel.app/bookings/get/allTripsBooked")
    .then((response) => response.json())
    .then((data) => data.allTripsBooked)
    .then((allTrips) => {
      let html = "";
      if (allTrips == "") {
        html += `
                    <div id="my-booking">
                        <div id="no-booking-message">
                            <p>No booking yet.</p>
                            <p>Why not plan a trip ?</p>
                        </div>
                    </div>`;
        document.querySelector("#my-booking").innerHTML = html;
      } else {
        for (const trip of allTrips) {
          const date = moment(trip.id[0].date).format("LT");
          const dateFromNow = moment(trip.id[0].date)
            .endOf("day")
            .fromNow()
            .split(" ");
          html += `<div class="train id="${trip._id}"">
            <div class="itinerary">
              <p class="departure">${trip.id[0].departure}</p>
              <p>></p>
              <p class="arrival">${trip.id[0].arrival}</p>
            </div>
            <p class="departure-time">${date}</p>
            <p class="price">${trip.id[0].price}€</p>
            <p class="timing">Departure in ${dateFromNow[3]} hours</p>
          </div>`;
        }
        document.querySelector("#my-booking").innerHTML = html;
      }
    });
}

/* **********************************************
 *                                              *
 *                    LOGIC                     *
 *                                              *
/* ******************************************* */
getAllTripsFromBooking();
