/* ~~~ VARIABLES/QUERY SELECTOR ~~~ */ 

var allIdeas = [];
var currentCard;
var showIdeasButton = document.querySelector('.show-ideas-button');
var ideaBox = document.querySelector('#containertop')
var userTitle = document.querySelector('#usertitle')
var userBody = document.querySelector('#userbody')
var saveIdeaButton = document.querySelector('#savebutton');
var searchImage = document.querySelector('.search-image');
var searchField = document.querySelector('#search-field');
var ideaCard = document.querySelector('#ideacard');
var ideaContent = document.querySelector('.idea-content');

/* ~~~ EVENT HANDLERS ~~~ */ 

// window.addEventListener('load', buttonValidity)
saveIdeaButton.addEventListener('click', generateIdeaCard)
userTitle.addEventListener('input', buttonValidity)
userBody.addEventListener('input', buttonValidity)

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