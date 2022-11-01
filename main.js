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
    }
}