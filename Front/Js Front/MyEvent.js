let main = document.querySelector('.main-container')

async function MyEvent () {
    let jwt = window.localStorage.getItem('jwt')

    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }

    let apiRequest = await fetch('http://localhost:3107/Event/mine', request)
    let response = await apiRequest.json()

    response.forEach(Event => {
        main.innerHTML += `<h2 class='Title'>${Event.title}</h2>
        <p class='Description'>${Event.description}</p>
        <img src='${Event.image} class='EventImage'/>
        <p class='category'>${Event.category}</p>
        <button>TEST</button>
        <i class="fa-thin fa-trash"></i>
        <i class="fa-thin fa-pen"></i>`
    });
}
MyEvent()