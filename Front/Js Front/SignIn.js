let id
let role
let submit = document.querySelector('.submit')
async function handLeRegister() {
    let firstName = document.querySelector('.first_name').value
    let lastName = document.querySelector('.last_name').value
    let email = document.querySelector('.email').value
    let password = document.querySelector('.Vérif1').value
    let error = document.querySelector('.error')

    let User = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }

    let request = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(User),
      };

      let apiRequest = await fetch("http://127.0.0.1:3107/user/SignUp", request)
      let response = await apiRequest
      if (response.status === 200) {
        user = await response.json()
        localStorage.setItem('session', User.id)
        localStorage.setItem('session', User.role)
      } else {
        error.innerHTML = "Something Miss"
      }
}
//Au clique toute la vérification pour enregistrer la personne ce fait fait apparaitre un message comme quoi inscription est réussi puis envoie sur la page de connexion
submit.addEventListener('click', () => {
    handLeRegister()
    submit.innerHTML += `<span class="SuccesFull">Inscription Réussi<span>`
    setTimeout(() => {
        window.location.href = '../LogIn/LogIn.html'
    }, 2000);
})
