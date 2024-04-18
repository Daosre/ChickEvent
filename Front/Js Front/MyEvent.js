let main = document.querySelector('.main-container')

// let Updatebtn = document.querySelector('.Updbtn')
// Updatebtn.addEventListener('click', () => {
//     window.location.href = '../UpdatePost/Update.html'
// })

let LogOut = document.querySelector('.LogOut')
LogOut.addEventListener('click', () => {
    localStorage.clear()
    setTimeout(() => {
        window.location.href ='../Accueil/Accueil.html'
    }, 1000);
})

let AddEvent = document.querySelector('.AddEvent')
AddEvent.addEventListener('click', () => {
    window.location.href = '../AddPost/AddPost.html'
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
        <button class="delbtn" onclick="DeleteEvent('${Event._id}')">Delete</button>
        <span class="succes"></span>`   
             
})}

async function DeleteEvent(id) {
    let jwt = window.localStorage.getItem('jwt')
    if(!jwt) {
        console.log('Problème')
    }
console.log(id)
    let request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        
    }
    await fetch(`http://localhost:3107/Event/DeleteEvent/${id}`, request)
    window.location.reload()
    }
MyEvent()