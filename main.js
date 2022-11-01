/* ~~~ VARIABLES/QUERY SELECTOR ~~~ */ 

var allIdeas = [];
var currentCard;
var showIdeasButton = document.querySelector('.show-ideas-button');
var ideaBox = document.querySelector('.container-top')
var userTitle = document.querySelector('#usertitle')
var userBody = document.querySelector('#userbody')
var saveIdeaButton = document.querySelector('.save-button');
var searchImage = document.querySelector('.search-image');
var searchField = document.querySelector('.search-field');
var ideaCard = document.querySelector('.idea-card');
var ideaContent = document.querySelector('.idea-content');

/* ~~~ EVENT HANDLERS ~~~ */ 

saveIdeaButton.addEventListener('click', generateIdeaCard)

/* ~~~ FUNCTIONS ~~~ */ 

function generateIdeaCard() {
    if(userTitle.value && userBody.value) {
    currentCard = new Idea(userTitle.value, userBody.value)

    allIdeas.push(currentCard);
    currentCard.saveToStorage();
    renderIdeaCard()
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