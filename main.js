/* ~~~ VARIABLES/QUERY SELECTOR ~~~ */ 

var allIdeas = [];
var currentCard;
var showIdeasBtn = document.querySelector('#showIdeasButton');
var userTitle = document.querySelector('#userTitle');
var userBody = document.querySelector('#userBody');
var saveIdeaBtn = document.querySelector('#saveButton');
var searchField = document.querySelector('#searchField');
var ideaCard = document.querySelector('#ideaCard');

/* ~~~ EVENT HANDLERS ~~~ */ 

saveIdeaBtn.addEventListener('click', generateIdeaCard);
userTitle.addEventListener('input', buttonValidity);
userBody.addEventListener('input', buttonValidity);
ideaCard.addEventListener('click', function(event) {
    if (event.target.id === 'deleteicon') {
        deleteIdeaCard(event);
    } else if (event.target.id === 'favoriteicon') {
        favoriteIdeaCard(event);
    }
});
showIdeasBtn.addEventListener('click', displayStarredIdeas);
searchField.addEventListener('input', function() {
    if (showIdeasBtn.textContent === 'Show Starred Ideas') {
        inputChecker(allIdeas);
    } else if (showIdeasBtn.textContent === 'Show All Ideas') {
        var filterIdeaCards = filterFavorites();
        inputChecker(filterIdeaCards);
    }
});
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
    if (showIdeasBtn.textContent === 'Show All Ideas') {
        showIdeasBtn.textContent = 'Show Starred Ideas'
    };
};

function clearInputFields() {
    userTitle.value = '';
    userBody.value = '';
    saveIdeaBtn.classList.remove('save-button-2');
    buttonValidity();
};

function buttonValidity() {
    if (!userTitle.value || !userBody.value ) {
        saveIdeaBtn.classList.remove('save-button-2');
        saveIdeaBtn.disabled = true;
    } else if(userTitle.value && userBody.value) {
        saveIdeaBtn.classList.add('save-button-2');
        saveIdeaBtn.disabled = false;
    };
};

function createIdeaCard(card) {
    ideaCard.innerHTML += `
    <article id='${card.id}' class="idea-card">
        <nav class="idea-nav">
            <img class="card-icon" id="favoriteicon" src="${card.image}" alt="favorite idea star">
            <img class="card-icon" id="deleteicon" src="assets/delete.svg" alt="delete idea icon">
        </nav>
        <div class="idea-content">
            <h2 class="idea-title">${card.title}</h2>
            <p class="idea-body">${card.body}</p>
        </div>
    </article>`
};

function renderIdeaCard(card) {
    ideaCard.innerHTML = "";
    for(var i = 0; i < card.length; i++) {
        createIdeaCard(card[i])
    };
};

function switchIdeaView() {
    if (showIdeasBtn.textContent === 'Show Starred Ideas') {
        renderIdeaCard(allIdeas);
    } else if (showIdeasBtn.textContent === 'Show All Ideas') {
        filterFavorites();
    }; 
};

function deleteIdeaCard(event) {
    var deleteCard = event.target.closest('article').id;
    for (let i = 0; i < allIdeas.length; i++) {
        if (event.target.id === "deleteicon" && allIdeas[i].id === Number(deleteCard)) {
            allIdeas[i].deleteFromStorage();
            allIdeas.splice(i, 1);
        }
    } switchIdeaView();
};

function favoriteIdeaCard(event) {
    var favoriteCard = event.target.closest('article').id;
    for (let i = 0; i < allIdeas.length; i++) {
        if (allIdeas[i].id == favoriteCard && allIdeas[i].star === false) {
            allIdeas[i].updateIdea();
        } else if (allIdeas[i].id == favoriteCard && allIdeas[i].star === true) {
            allIdeas[i].updateIdea();
        }
    } switchIdeaView();
};

function displayStarredIdeas() {
    if (showIdeasBtn.textContent === 'Show Starred Ideas') {
        showIdeasBtn.textContent = 'Show All Ideas'
        filterFavorites();
    } else {
        showIdeasBtn.textContent = 'Show Starred Ideas'
        renderIdeaCard(allIdeas);
    };
};

function checkForFavorites() {
    if (showIdeasBtn.innerText === 'Show All Ideas') {
        filterFavorites();
    };
};

function filterFavorites() {
    var filterIdeaCards = [];
    for (i = 0; i < allIdeas.length; i++) {
        if (allIdeas[i].star) {
            filterIdeaCards.push(allIdeas[i]);
        };
    };
    renderIdeaCard(filterIdeaCards);
    return filterIdeaCards;
};

function inputChecker(ideas) {
    ideaCard.innerHTML = "";
        for (var i = 0; i < ideas.length; i++) {
            if ((ideas[i].title.includes(searchField.value)) || (ideas[i].body.includes(searchField.value))) {
            createIdeaCard(ideas[i])
        };
    };
};

function retrieveStorage() {
    var keys = Object.keys(localStorage)
    for (let i = 0; i < keys.length; i++) {
        var cardDetails = localStorage.getItem(keys[i]);
        var cardInfo = JSON.parse(cardDetails);
        var newCard = new Idea(cardInfo.title, cardInfo.body, cardInfo.id, cardInfo.star, cardInfo.image)
        allIdeas.push(newCard);
    }
    renderIdeaCard(allIdeas);
};