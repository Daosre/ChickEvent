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
        <img src='${Event.image} class='EventImage'/>
        <p class='category'>${Event.category}</p>
        <button class="Inscription">Participate</button>`
        emplacement.appendChild(NewEvent)
    }
}
getAllEvent()
