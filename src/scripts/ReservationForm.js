import { sendRequest } from "./dataAccess.js"

export const ReservationForm = () => {
    return `
        <div class="field">
            <label class="label" for="parentName">Name of parent</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childName">Name of child</label>
            <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="numOfChildren">Number of Children</label>
            <input type="number" name="numOfChildren" class="input" />
        </div>
        <div class="field">
            <label class="label" for="address">Address</label>
            <input type="text" name="address" class="input" />
        </div>
        <div class="field">
            <label class="label" for="dateToReserve">Date to be reserved</label>
            <input type="date" name="dateToReserve" class="input" />
        </div>
        <div class="field">
            <label class="label" for="duration">Duration (in hours)</label>
            <input type="number" name="duration" class="input" />
        </div>

        <button class="button" id="reserveBtn">Submit Reservation</button>

    `
}

const mainContainer = document.querySelector("#mainContainer")


mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "reserveBtn") {
        // Get what the user typed into the form fields
        const parentName = document.querySelector("input[name='parentName']").value
        const childName = document.querySelector("input[name='childName']").value
        const numOfChildren = document.querySelector("input[name='numOfChildren']").value
        const address = document.querySelector("input[name='address']").value
        const dateToReserve = document.querySelector("input[name='dateToReserve']").value
        const duration = document.querySelector("input[name='duration']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: parentName,
            childName: childName,
            numOfChildren: numOfChildren,
            address: address,
            dateToReserve: dateToReserve,
            duration: duration
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})
