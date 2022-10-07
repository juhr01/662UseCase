let admin = false;

if (window.localStorage.getItem('votes') == null) {
     let votes = [];
    window.localStorage.setItem('votes', JSON.stringify(votes));
}
function clearStorage() {
    let votes = [];
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

        const delBtns = document.querySelectorAll('#delBtn');
        delBtns.forEach(i => {
            i.style.display = 'block';
        })

        admin = true;
        getVotes();
    } else {
        alert('Salainen sana oli väärä!')
    }
}

function logout() {
    document.querySelector("#adminword").style.display = "inline-block";
    document.querySelector("#login").style.display = "inline-block";
    document.querySelector("#logout").style.display = "none";
    document.querySelector("#kirjautuneena").style.display = "none";
    document.querySelector("#logginglabel").style.display = "inline-block";
    document.querySelector("#createBtn").style.display = "none";

    const delBtns = document.querySelectorAll('#delBtn');
        delBtns.forEach(i => {
            i.style.display = 'none';
        })

        admin = false;
        getVotes();
}

function createVote() {
    document.querySelector("#createVote").style.display = "block";
    document.querySelector("#createBtn").style.display = "none";
    document.querySelector("#votes").style.display = "none";
    document.querySelector("#logging").style.display = "none";
}

function exitCreate() {
    document.querySelector("#createVote").style.display = "none";
    document.querySelector("#createBtn").style.display = "inline-block";
    document.querySelector("#votes").style.display = "block";
    document.querySelector("#logging").style.display = "block";
}

function finishCreate() {
    if (document.querySelector("#question").value == "" || document.querySelector("#option1").value == "" || document.querySelector("#option2").value == "") {
        alert("Täytäthän kaikki kentät!");
    } else {
    document.querySelector("#createVote").style.display = "none";
    document.querySelector("#createBtn").style.display = "inline-block";
    document.querySelector("#votes").style.display = "block";
    document.querySelector("#logging").style.display = "block";

    let question = document.querySelector("#question").value;
    let option1 = document.querySelector("#option1").value;
    let option2 = document.querySelector("#option2").value;

    let vote = {voteName:question, voteOptions: [{"optionName:" : option1, "votes" : 0},{"optionName" : option2, "votes" : 0}]};

    let votes = JSON.parse(window.localStorage.getItem('votes'));
    votes.push(vote);
    window.localStorage.setItem('votes', JSON.stringify(votes));
    }

}
function getVotes() {
    let newVoteDiv = document.createElement('div');
    document.querySelector('#votes').innerHTML = "";
    newVoteDiv.innerHTML = "";
    newVoteDiv.className = "votes";
    newVoteDiv.id = 'newVote';
    newVoteDiv.style.display = "block";
    let votes = JSON.parse(window.localStorage.getItem('votes'));
    var voteNumber = 0;

    votes.forEach(vote =>{
        let delBtn = document.createElement('button');
        let delBtnText = document.createTextNode('Poista');
        delBtn.className = "controlBtn";
        delBtn.id = 'delBtn';


        let voteH2 = document.createElement('h2');
        let voteQuestion = document.createTextNode(vote.voteName);
        voteH2.appendChild(voteQuestion);

        delBtn.addEventListener('click', delClick);
        delBtn.appendChild(delBtnText);

        if (admin == true) {
            newVoteDiv.appendChild(delBtn);
        }
        

        let optionList = document.createElement('ul');
        let optionNumber = 0;

        vote.voteOptions.forEach(option => {
            let optionInList = document.createElement('li');
            let optionTextElement = document.createElement('h3');
            let optionText = document.createTextNode(option.optionName);
            optionTextElement.appendChild(optionText);
            optionInList.appendChild(optionTextElement);

            let h4 = document.createElement('h4');
            let h4text = document.createTextNode("äänet: ");
            h4.appendChild(h4text)
            optionInList.appendChild(h4)

            let span = document.createElement('span');
            span.value = option.votes;
            let spanValue = document.createTextNode(span.value);
            span.appendChild(spanValue);
            optionInList.appendChild(span);

            let p = document.createElement('p');
            optionInList.appendChild(p);
            let voteBtn = document.createElement('button');
            let voteBtnText = document.createTextNode('Äänestä');
            voteBtn.addEventListener('click', voteClick);
            voteBtn.appendChild(voteBtnText);
            voteBtn.dataset.vote = voteNumber;
            voteBtn.dataset.option = optionNumber;
            delBtn.dataset.del1 = voteNumber;
            voteBtn.id = "voteBtn";
            optionInList.appendChild(voteBtn);
            optionList.appendChild(optionInList);
            optionNumber++;
            

        })

        newVoteDiv.appendChild(voteH2);
        newVoteDiv.appendChild(optionList);
        document.querySelector('#votes').appendChild(newVoteDiv);
        voteNumber++;
       
    })
}

function vote(voteId, optionId) {
    let votes = JSON.parse(window.localStorage.getItem('votes'));
    votes[voteId].options[optionId].votes++;
    window.localStorage.setItem('votes', JSON.stringify(votes));
    return votes[voteId].options[optionId].votes;
}

function voteRemove(del1) {
    let votes = JSON.parse(window.localStorage.getItem('votes'));
    votes.splice(del1, 1);
    window.localStorage.setItem('votes', JSON.stringify(votes));
    getVotes();
}

function voteClick(event) {
    if (event.target.dataset.vote) {
        let voteSpan = event.target.previousElementSibling.previousElementSibling;
        voteSpan.innerHTML = vote(event.target.dataset.vote, event.target.dataset.option);
    }
}

function delClick(event) {
    voteRemove(event.target.dataset.del1)
}