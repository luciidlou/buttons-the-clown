import { getClowns, getReservations, deleteRequest, getCompletedReservations, saveCompletion } from "./dataAccess.js"

const convertReservationToListElement = (reservation) => {
    const clowns = getClowns()
    const completions = getCompletedReservations()

    const foundCompletion = completions.find(completion => {
        const completionId = completion.reservationId
        return parseInt(completionId) === reservation.id
    })

    if (foundCompletion) {
        return `<li class="list-item__completed">
                Reservation # ${reservation.id}: ${reservation.address} on ${reservation.dateToReserve} (${reservation.duration} hours)
                <button class="reservation__delete" id="reservation--${reservation.id}">Delete</button>
                </li>
        `
    }
    else {
        return `<li class="list-item__reserved">
                    Reservation # ${reservation.id}: ${reservation.address} on ${reservation.dateToReserve} (${reservation.duration} hours)
                    
                    <select class="clowns" id="clowns">
                    <option value="">Choose</option>
                    ${clowns.map(
                        clown => {
                            return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
                        }
                        ).join("")
                    }
                    </select>
                    <button class="reservation__delete" id="reservation--${reservation.id}">Delete</button>
                </li>
        `
    }

}

export const Reservations = () => {
    const reservations = getReservations()
    let html = `
    <ul class="list-container">
    ${reservations.map(convertReservationToListElement).join("")
        }
    </ul>
    `

    return html
}


const mainContainer = document.querySelector("#mainContainer")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("reservation--")) {
        const [, reservationId] = click.target.id.split("--")
        deleteRequest(parseInt(reservationId))
    }
})


mainContainer.addEventListener("change",
    (event) => {
        const date = new Date()
        if (event.target.id === "clowns") {
            const [reservationId, clownId] = event.target.value.split("--")

            const completion = {
                reservationId: reservationId,
                clownId: clownId,
                date_created: date
            }
            saveCompletion(completion)
        }
    })
