let AddEvent = document.querySelector('.AddEvent')

AddEvent.addEventListener('click', () => {
    window.location.href = '../AddPost/AddPost.html'
})
let mine = document.querySelector('.mine')
mine.addEventListener('click', () => {
    window.location.href ='../MyEvent/MyEvent.html'
})
let LogOut = document.querySelector('.LogOut')
LogOut.addEventListener('click', () => {
    localStorage.clear()
    setTimeout(() => {
        window.location.href ='../Accueil/Accueil.html'
    }, 1000);
})
async function getAllEvent() {
    let response = await fetch('http://127.0.0.1:3107/Event/AllEvent')
    let client = await response.json()
    let emplacement = document.querySelector('.main-container')
    let localUser = localStorage.getItem('session')

    for(const Event of client) {
        let NewEvent = document.createElement('div')
        NewEvent.classList.add('Event')
        NewEvent.innerHTML = `<h2 class='Title'>${Event.title}</h2>
        <p class='Description'>${Event.description}</p>
        <img src='${Event.image}' class="EventImage"/>
        <p class='category'>${Event.category}</p>
        <p class="NbPeople">${Event.people.length} / ${Event.peoplemax}</p>
        <button class="Inscription" onclick="ajoutpeople('${Event._id}')">Participate</button>
        <button class="Cancel" onclick="cancelPeople('${Event._id}')">Cancel</button>`
        emplacement.appendChild(NewEvent)
    }
}
async function ajoutpeople(id) {
    let jwt = window.localStorage.getItem('jwt')

    let request = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    await fetch(`http://localhost:3107/Event/addpeople/${id}`, request)
    window.location.reload()
}
async function cancelPeople(id) {
    let jwt = window.localStorage.getItem('jwt')

    let request = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    await fetch(`http://localhost:3107/Event/cancelPeople/${id}`, request)
    window.location.reload()
}
getAllEvent()
