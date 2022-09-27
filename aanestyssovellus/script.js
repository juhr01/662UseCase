function login() {
    if (document.querySelector("#adminword").value == "orava") {
        document.querySelector("#adminword").style.display = "none";
        document.querySelector("#login").style.display = "none";
        document.querySelector("#logout").style.display = "block";
        document.querySelector("#kirjautuneena").style.display = "block";
        document.querySelector("#logginglabel").style.display = "none";
    }
}

function logout() {
    document.querySelector("#adminword").style.display = "block";
    document.querySelector("#login").style.display = "block";
    document.querySelector("#logout").style.display = "none";
    document.querySelector("#kirjautuneena").style.display = "none";
    document.querySelector("#logginglabel").style.display = "block";
}