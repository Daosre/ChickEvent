let main = document.querySelector('.main-container')
let LogOut = document.querySelector('.LogOut')
LogOut.addEventListener('click', () => {
    localStorage.clear()
    setTimeout(() => {
        window.location.href ='../Accueil/Accueil.html'
    }, 1000);
})
let AllPost = document.querySelector('.Allpost')
AllPost.addEventListener('click', () => {
    window.location.href = '../AllPost/AllEvent.html'
})
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
        <button class="delbtn">Update</button>
        <button class="Updbtn">Delete</button>
        <span class="succes"></span>`
    });
}
async function DeleteEvent() {
    let jwt = window.localStorage.getItem('jwt')

    let request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        
    }
    let apiRequest = await fetch('http://localhost:3107/Event/DeleteEvent', request)
    let response = await apiRequest.json()
    let sucess = document.querySelector('.succes')
    let del = document.querySelector('.delbtn')
    
        del.addEventListener('click', () => {
           
        if(response.status === 200) {
            DeleteEvent()
            sucess.innerHTML = 'Deleted'
            location.reload()
        } 
    })
}

MyEvent()