/* ~~~ VARIABLES/QUERY SELECTOR ~~~ */ 

var allIdeas = [];
var currentCard;
var showIdeasButton = document.querySelector('.show-ideas-button');
var ideaBox = document.querySelector('.container-top')
var userTitle = document.getElementById('usertitle')
var userBody = document.getElementById('userbody')
var saveIdeaButton = document.querySelector('.save-button');
var searchImage = document.querySelector('.search-image');
var searchField = document.querySelector('.search-field');
var ideaCard = document.querySelector('.idea-card');
var ideaContent = document.querySelector('.idea-content');

/* ~~~ EVENT HANDLERS ~~~ */ 


saveIdeaButton.addEventListener('click', generateIdeaCard)

/* ~~~ FUNCTIONS ~~~ */ 

function generateIdeaCard() {
    currentCard = new Idea(userTitle.value, userBody.value)

    allIdeas.push(currentCard);
    currentCard.saveToStorage();
}