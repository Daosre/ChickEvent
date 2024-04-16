async function getAllEvent() {
    let response = await fetch('http://127.0.0.1:3107/Event/AllEvent')
    let client = await response.json()
    let emplacement = document.querySelector('.main-container')

    for(const Event of client) {
        let NewEvent = document.createElement('div')
        NewEvent.innerHTML = `<h2 class='Title'>${Event.title}</h2>
        <p class='Description'>${Event.description}</p>
        <img src='${Event.image} class='EventImage'/>
        <p class='category'>${Event.category}</p>`

        emplacement.appendChild(NewEvent)
    }
}
getAllEvent()