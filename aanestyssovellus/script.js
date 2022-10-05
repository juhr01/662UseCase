const kirjautunut = false;

if (window.localStorage.getItem('votes') == null) {
     var votes = [];
    window.localStorage.setItem('votes', JSON.stringify(votes));
}

function login() {
    if (document.querySelector("#adminword").value == "orava") {
        document.querySelector("#adminword").style.display = "none";
        document.querySelector("#login").style.display = "none";
        document.querySelector("#logout").style.display = "inline-block";
        document.querySelector("#kirjautuneena").style.display = "inline-block";
        document.querySelector("#logginglabel").style.display = "none";
        document.querySelector("#createBtn").style.display = "inline-block";
        kirjautunut = true;
        
    }
}

function logout() {
    document.querySelector("#adminword").style.display = "inline-block";
    document.querySelector("#login").style.display = "inline-block";
    document.querySelector("#logout").style.display = "none";
    document.querySelector("#kirjautuneena").style.display = "none";
    document.querySelector("#logginglabel").style.display = "inline-block";
    document.querySelector("#createBtn").style.display = "none";
    kirjautunut = false;
}

function createVote() {
    document.querySelector("#createVote").style.display = "block";
    document.querySelector("#createBtn").style.display = "none";
    document.querySelector("#votes").style.display = "none";
}

function exitCreate() {
    document.querySelector("#createVote").style.display = "none";
    document.querySelector("#createBtn").style.display = "inline-block";
    document.querySelector("#votes").style.display = "block";
}

function finishCreate() {
    if (document.querySelector("#question").value == "" || document.querySelector("#option1").value == "" || document.querySelector("#option2").value == "") {
        alert("Täytäthän kaikki kentät!");
    } else {
    document.querySelector("#createVote").style.display = "none";
    document.querySelector("#createBtn").style.display = "inline-block";
    document.querySelector("#votes").style.display = "block";

    let question = document.querySelector("question").value;
    let option1 = document.querySelector("option1").value;
    let option2 = document.querySelector("option2").value;

    let vote = {voteQuestion:question, voteOptions: [{"optionName:" : option1, "votes" : 0},{"optionName" : option2, "votes" : 0}]};

    let votes = JSON.parse(window.localStorage.getItem('aanestykset'));
    votes.push(vote);
    window.localStorage.setItem('votes', JSON.stringify(votes));
    }

}
function getVotes() {
    let newVoteDiv = document.createElement('div');
    document.querySelector('#votes').innerHTML = "";
    newVoteDiv.innerHTML = "";
    newVoteDiv.className = "votes";
    newVoteDiv.style.display = "block";
    let votes = JSON.parse(window.localStorage.getItem('votes'));
    var voteNumber = 0;

    votes.forEach(vote =>{
        let delBtn = document.createElement('button');
        let delBtnText = document.createTextNode('Poista');
        delBtn.className = "controlBtn";
        let voteH2 = document.createElement('h2');
        let voteQuestion = document.createTextNode(vote.question);
        voteH2.appendChild(voteQuestion);

        delBtn.addEventListener('click', delClick);
        delBtn.appendChild(delBtnText);
        newVoteDiv.appendChild(delBtn);

        let optionList = document.createElement('ul');
        let optionNumber = 0;

        vote.voteOptions.forEach(option => {
            let optionElement = document.createElement('li');
            let optionText1 = document.createElement('h3');
            let optionText2 = document.createTextNode(option.optionName);
            optionText1.appendChild(optionText2);
            optionElement.appendChild(optionText1);

            let h4 = document.createElement('h4');
            let h4text = document.createTextNode("äänet: ");
            h4.appendChild(h4text)
            optionElement.appendChild(h4)

            let span = document.createElement('span');
            span.appendChild(option.votes);
        })
    })
}

