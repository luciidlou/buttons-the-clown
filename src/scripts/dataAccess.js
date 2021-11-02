const mainContainer = document.querySelector("#mainContainer")

const applicationState = {
    clowns: [],
    reservations: [],
    completedReservations: []
}

const API = "http://localhost:8088"

export const fetchData = () => {
    // fetch the reservations array from json
    fetch(`${API}/reservations`)
        .then(response => response.json())
        .then(
            (reservations) => {
                // Store the external state in applicationState
                applicationState.reservations = reservations
            }
        )

    fetch(`${API}/completedReservations`)
        // fetch the completedReservations array from json
        .then(response => response.json())
        .then(
            (completedReservations) => {
                // Store the external state in applicationState
                applicationState.completedReservations = completedReservations
            }
        )

    return fetch(`${API}/clowns`)
        // fetch the clowns array from json
        .then(response => response.json())
        .then(
            (clowns) => {
                // Store the external state in applicationState
                applicationState.clowns = clowns
            }
        )
}

export const getReservations = () => {
    return applicationState.reservations.map(f => ({...f}))
}
export const getCompletedReservations = () => {
    return applicationState.completedReservations.map(f => ({...f}))
}
export const getClowns = () => {
    return applicationState.clowns.map(f => ({...f}))
}


export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/reservations`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


export const deleteRequest = (id) => {
    return fetch(`${API}/reservations/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveCompletion = (userReservation) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userReservation)
    }

    return fetch(`${API}/completedReservations`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}