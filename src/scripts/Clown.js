import { ReservationForm } from "./ReservationForm.js"
import { Reservations } from "./Reservations.js"

export const Clown = () => {
    return `
        <h1>Buttons The Clown!</h1>
        <section class="reservationForm">
            ${ReservationForm()}
        </section>
    
        <section class="reservations">
            <h2>List of Reservations</h2>
            <div class="reservations-header">
                <h3>Description</h3>
                <h3>Completed By</h3>
            </div>
            ${Reservations()}
        </section>
        `
}


