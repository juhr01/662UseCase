const kirjautunut = false;

function login() {
    if (document.querySelector("#adminword").value == "orava") {
        document.querySelector("#adminword").style.display = "none";
        document.querySelector("#login").style.display = "none";
        document.querySelector("#logout").style.display = "inline-block";
        document.querySelector("#kirjautuneena").style.display = "inline-block";
        document.querySelector("#logginglabel").style.display = "none";
        document.querySelector("#create").style.display = "inline-block";
        kirjautunut = true;
    }
}

function logout() {
    document.querySelector("#adminword").style.display = "inline-block";
    document.querySelector("#login").style.display = "inline-block";
    document.querySelector("#logout").style.display = "none";
    document.querySelector("#kirjautuneena").style.display = "none";
    document.querySelector("#logginglabel").style.display = "inline-block";
    document.querySelector("#create").style.display = "none";
    kirjautunut = false;
}

function createVote() {
    document.querySelector("#createVote").style.display = "block";
    document.querySelector("#create").style.display = "none";
    document.querySelector("#votes").style.display = "none";
}

function exitCreate() {
    document.querySelector("#createVote").style.display = "none";
    document.querySelector("#create").style.display = "inline-block";
    document.querySelector("#votes").style.display = "block";
}

function finishCreate() {
    document.querySelector("#createVote").style.display = "none";
    document.querySelector("#create").style.display = "inline-block";
    document.querySelector("#votes").style.display = "block";
}
