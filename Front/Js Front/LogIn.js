let submit = document.querySelector('.submit')
async function handleLogin() {
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".Vérif1").value;
    let error = document.querySelector(".error");
  
    let LogIn = {
      email: email,
      password: password,
    };
    let request = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(LogIn),
    };
    //LogIn
    let apiRequest = await fetch("http://127.0.0.1:3107/user/LogIn", request)
    let response = await apiRequest
    if (response.status === 200) {
     const data = await response.json()
     localStorage.setItem('jwt',data.jwt)
    } else {
      error.innerHTML = "Something is Wrong"
    }
  }

  submit.addEventListener('click', () => {
    handleLogin()
    submit.innerHTML += `<span class="SuccesFull">
    Connexion Réussi <span>`
    // setTimeout(() => {
    //     window.location.href = '../AllPost/AllEvent.html'
    // }, 2000);
})