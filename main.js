/* ~~~ VARIABLES/QUERY SELECTOR ~~~ */ 

var allIdeas = [];
var currentCard;
var showIdeasBtn = document.querySelector('.show-ideas-button');
var userTitle = document.querySelector('#userTitle')
var userBody = document.querySelector('#userBody')
var saveIdeaBtn = document.querySelector('#saveButton');
var searchField = document.querySelector('.search-field');
var ideaCard = document.querySelector('#ideaCard');
var cardContainer = document.querySelector('.container-bottom');

/* ~~~ EVENT HANDLERS ~~~ */ 

saveIdeaBtn.addEventListener('click', generateIdeaCard);
userTitle.addEventListener('input', buttonValidity);
userBody.addEventListener('input', buttonValidity);
cardContainer.addEventListener('click', function(event) {
    if (event.target.id === 'deleteicon') {
        deleteIdeaCard(event);
    } else if (event.target.id === 'favoriteicon') {
        favoriteIdeaCard(event);
    }
})
showIdeasBtn.addEventListener('click', displayStarredIdeas);
searchField.addEventListener('input', inputChecker);
window.addEventListener('load', retrieveStorage);

/* ~~~ FUNCTIONS ~~~ */ 

function generateIdeaCard() {
    if (userTitle.value === '' || userBody.value === '') {
        return
    } else {
        currentCard = new Idea(userTitle.value, userBody.value)

    allIdeas.push(currentCard);
    currentCard.saveToStorage();
    renderIdeaCard(allIdeas);
    clearInputFields();
    }
}

function clearInputFields() {
    userTitle.value = '';
    userBody.value = '';
    saveIdeaBtn.classList.remove('save-button-2');
    buttonValidity();
}

function buttonValidity() {
    if (!userTitle.value || !userBody.value ) {
        saveIdeaBtn.classList.remove('save-button-2');
        saveIdeaBtn.disabled = true;
    } else if(userTitle.value && userBody.value) {
        saveIdeaBtn.classList.add('save-button-2');
        saveIdeaBtn.disabled = false;
    }
}


function renderIdeaCard(card) {
    ideaCard.innerHTML = "";
    for(var i = 0; i < card.length; i++) {
        ideaCard.innerHTML += `
        <article id='${card[i].id}' class="idea-card">
            <nav class="idea-nav">
                <img class="card-icon" id="favoriteicon" src="${card[i].image}" alt="favorite idea star">
                <img class="card-icon" id="deleteicon" src="assets/delete.svg" alt="delete idea icon">
            </nav>
            <div class="idea-content">
                <h2 class="idea-title">${card[i].title}</h2>
                <p class="idea-body">${card[i].body}</p>
            </div>
         </article>`
    }
}

function deleteIdeaCard(event) {
    var deleteCard = event.target.closest('article');
    if (event.target.id === "deleteicon") {
    for (let i = 0; i < allIdeas.length; i++) {
        if (allIdeas[i].id === Number(deleteCard.id)) {
            allIdeas[i].deleteFromStorage();
            allIdeas.splice(i, 1);
        }
    }
    }
    if (showIdeasBtn.textContent === 'Show Starred Ideas') {
        renderIdeaCard(allIdeas);
    } else if (showIdeasBtn.textContent === 'Show All Ideas') {
        filterFavorites();
    }
}

function favoriteIdeaCard(event) {
    var favoriteCard = event.target.parentNode.parentNode.id;
    for (let i = 0; i < allIdeas.length; i++) {
        if (allIdeas[i].id == favoriteCard && allIdeas[i].star === false) {
            allIdeas[i].updateIdea();
        } else if (allIdeas[i].id == favoriteCard && allIdeas[i].star === true) {
            allIdeas[i].updateIdea();
        }
    }
    if (event.target.id === 'favoriteicon' && showIdeasBtn.textContent === 'Show Starred Ideas') {
        renderIdeaCard(allIdeas);
    } else if (event.target.id === 'favoriteicon' && showIdeasBtn.textContent === 'Show All Ideas') {
        filterFavorites();
    }
}

function displayStarredIdeas() {
    if (showIdeasBtn.textContent === 'Show Starred Ideas') {
        showIdeasBtn.textContent = 'Show All Ideas'
        filterFavorites();
    } else {
        showIdeasBtn.textContent = 'Show Starred Ideas'
        renderIdeaCard(allIdeas);
    }
};

function checkForFavorites() {
    if (showIdeasBtn.innerText === 'Show All Ideas') {
        filterFavorites();
    }
}

function filterFavorites () {
    var filterIdeaCards = [];
    for (i = 0; i < allIdeas.length; i++) {
        if (allIdeas[i].star) {
            filterIdeaCards.push(allIdeas[i]);
        }
    }
    renderIdeaCard(filterIdeaCards);
}

function inputChecker() {
    ideaCard.innerHTML = "";
    if (showIdeasBtn.textContent === 'Show Starred Ideas') {
        for (var i = 0; i < allIdeas.length; i++) {
            if ((allIdeas[i].title.includes(searchField.value)) || (allIdeas[i].body.includes(searchField.value))) {
            ideaCard.innerHTML += `
            <article id='${allIdeas[i].id}' class="idea-card">
                <nav class="idea-nav">
                    <img class="card-icon" id="favoriteicon" src="${allIdeas[i].image}" alt="favorite idea star">
                    <img class="card-icon" id="deleteicon" src="assets/delete.svg" alt="delete idea icon">
                </nav>
                <div class="idea-content">
                    <h2 class="idea-title">${allIdeas[i].title}</h2>
                    <p class="idea-body">${allIdeas[i].body}</p>
                </div>
            </article>`
            }
        }
    } else if (showIdeasBtn.textContent === 'Show All Ideas') {
        for (var i = 0; i < allIdeas.length; i++) {
            if (allIdeas[i].star === true && ((allIdeas[i].title.includes(searchField.value)) || (allIdeas[i].body.includes(searchField.value)))) {
            ideaCard.innerHTML += `
            <article id='${allIdeas[i].id}' class="idea-card">
                <nav class="idea-nav">
                    <img class="card-icon" id="favoriteicon" src="${allIdeas[i].image}" alt="favorite idea star">
                    <img class="card-icon" id="deleteicon" src="assets/delete.svg" alt="delete idea icon">
                </nav>
                <div class="idea-content">
                    <h2 class="idea-title">${allIdeas[i].title}</h2>
                    <p class="idea-body">${allIdeas[i].body}</p>
                </div>
            </article>`
            }
        }
    }
}

function retrieveStorage() {
    var keys = Object.keys(localStorage)
    for (let i = 0; i < keys.length; i++) {
        var cardDetails = localStorage.getItem(keys[i]);
        var cardInfo = JSON.parse(cardDetails);
        var newCard = new Idea(cardInfo.title, cardInfo.body, cardInfo.id, cardInfo.star, cardInfo.image)
        allIdeas.push(newCard);
    }
    renderIdeaCard(allIdeas);
}