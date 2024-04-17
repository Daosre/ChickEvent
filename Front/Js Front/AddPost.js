let addEvent = document.querySelector('.AddEvent')
async function CreateEvent() {
    let title = document.querySelector('.title').value
    let description = document.querySelector('.description').value
    let image = document.querySelector('.image').value
    let category = document.querySelector('.category').value
    let error = document.querySelectorAll('.error')
    let sucess = document.querySelector('.succes')

    let EventCreate = {
        title: title,
        description: description,
        image: image,
        category: category
        } 
    let request = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(EventCreate),
      };
      if(title === '') {
        error[0].innerHTML = 'Missing Field'
      }
      if(description === '') {
        error[1].innerHTML = 'Missing Field'
      }
      if(image === '') {
        error[2].innerHTML = 'Missing Field'
      }
      if(category === '') {
        error[3].innerHTML = 'Missing Field'
      }
      let apiRequest = await fetch("http://127.0.0.1:3107/Event/CreateEvent", request);
      let reponse = await apiRequest;
      if (reponse.status === 200) {
        sucess.innerHTML = 'Sucessfull Create'
        setTimeout(() => {
            window.location.href = '../AllPost/AllEvent.html'
        }, 3000);
      }
    }

    addEvent.addEventListener('click', () => {
        CreateEvent()
    })
