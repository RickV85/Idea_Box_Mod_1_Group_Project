/* ~~~ VARIABLES/QUERY SELECTOR ~~~ */ 

var allIdeas = [];
var currentCard;
var showIdeasButton = document.querySelector('.show-ideas-button');
var ideaBox = document.querySelector('#containertop')
var userTitle = document.querySelector('#usertitle')
var userBody = document.querySelector('#userbody')
var saveIdeaButton = document.querySelector('#savebutton');
var searchImage = document.querySelector('.search-image');
var saveButtonSearchField = document.querySelector('.search-field');
var ideaCard = document.querySelector('#ideacard');
var ideaContent = document.querySelector('.idea-content');
var cardContainer = document.querySelector('.container-bottom')

/* ~~~ EVENT HANDLERS ~~~ */ 

saveIdeaButton.addEventListener('click', generateIdeaCard)
userTitle.addEventListener('input', buttonValidity)
userBody.addEventListener('input', buttonValidity)
cardContainer.addEventListener('click', function(event) {
    if (event.target.id === 'deleteicon' && showIdeasButton.textContent === 'Show Starred Ideas') {
        deleteIdeaCard(event);
        renderIdeaCard();
    } else if (event.target.id === 'deleteicon' && showIdeasButton.textContent === 'Show All Ideas') {
        deleteIdeaCard(event);
        renderStarredIdeas();
    }
})
cardContainer.addEventListener('click', function(event) {
    if (event.target.id === 'favoriteicon' && showIdeasButton.textContent === 'Show Starred Ideas') {
        favoriteIdeaCard(event);
        renderIdeaCard();
    } else if (event.target.id === 'favoriteicon' && showIdeasButton.textContent === 'Show All Ideas') {
        favoriteIdeaCard(event);
        renderStarredIdeas();
    }
})
showIdeasButton.addEventListener('click', displayStarredIdeas);
saveButtonSearchField.addEventListener('input', inputChecker);


/* ~~~ FUNCTIONS ~~~ */ 

function generateIdeaCard() {
    if (userTitle.value === '' || userBody.value === '') {
        return
    } else {
        currentCard = new Idea(userTitle.value, userBody.value)

    allIdeas.push(currentCard);
    currentCard.saveToStorage();
    renderIdeaCard()
    clearInputFields()
    }
}

function clearInputFields() {
    userTitle.value = '';
    userBody.value = '';
    saveIdeaButton.classList.remove('save-button-2');
    buttonValidity();
}

function buttonValidity() {
    if (!userTitle.value || !userBody.value ) {
        saveIdeaButton.classList.remove('save-button-2');
        saveIdeaButton.disabled = true;
    } else if(userTitle.value && userBody.value) {
        saveIdeaButton.classList.add('save-button-2');
        saveIdeaButton.disabled = false;
    }
}


function renderIdeaCard() {
    ideaCard.innerHTML = "";

    for(var i =0; i < allIdeas.length; i++) {
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
            <footer class="idea-comment">
                <img class="card-icon" src="assets/comment.svg" alt="add comment button">
                <label>Comment</label>
            </footer>
         </article>`
    }
}

function deleteIdeaCard(event) {
    var deleteCard = event.target.parentNode.parentNode.id;
    for (let index = 0; index < allIdeas.length; index++) {
        if (allIdeas[index].id == deleteCard) {
            allIdeas.splice(index, 1);
        }
    }
}
function favoriteIdeaCard(event) {
    var favoriteCard = event.target.parentNode.parentNode.id;
    for (let index = 0; index < allIdeas.length; index++) {
        if (allIdeas[index].id == favoriteCard && allIdeas[index].star === false) {
            allIdeas[index].star = true;
            allIdeas[index].image = 'assets/star-active.svg'
        } else if (allIdeas[index].id == favoriteCard && allIdeas[index].star === true) {
            allIdeas[index].star = false;
            allIdeas[index].image = 'assets/star.svg'
        }
    }
}


function displayStarredIdeas() {
    if (showIdeasButton.textContent === 'Show Starred Ideas') {
        showIdeasButton.textContent = 'Show All Ideas'
        renderStarredIdeas();
    } else {
        showIdeasButton.textContent = 'Show Starred Ideas'
        renderIdeaCard();
    }
};

function renderStarredIdeas() {
    ideaCard.innerHTML = "";
    
    for(var i =0; i < allIdeas.length; i++) {
        if(allIdeas[i].star === true) {
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
                <footer class="idea-comment">
                    <img class="card-icon" src="assets/comment.svg" alt="add comment button">
                    <label>Comment</label>
                </footer>
            </article>`
        }
    }
}