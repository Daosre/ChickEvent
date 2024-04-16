let id
let role

async function handLeRegister() {
    let first_name = document.querySelector('.first_name').value
    let last_name = document.querySelector('.last_name').value
    let email = document.querySelector('.email').value
    let password = document.querySelector('.Vérif1').value
    let error = document.querySelector('.error')

    let newUser = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    }

    let request = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newUser),
      };

      let apiRequest = await fetch("http://127.0.0.1:3107/SignUp")
      let response = await apiRequest
      if (response.status === 200) {
        user = await response.json()
        localStorage.setItem('session', user.id)
        localStorage.setItem('session', user.role)
      } else {
        error.innerHTML = "Something Miss"
      }


}