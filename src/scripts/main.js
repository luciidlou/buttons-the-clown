import { Clown } from "./Clown.js"
import { fetchData } from "./dataAccess.js"

const mainContainer = document.querySelector("#mainContainer")

const render = () => {
    fetchData().then(
        () => {
            mainContainer.innerHTML = Clown()
        }
    )
}
render()

mainContainer.addEventListener("stateChanged",
customEvent => {
    render()
})