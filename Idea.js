class Idea {
    constructor(title, body, id, star, image) {
        this.id = id || Date.now();
        this.title = title;
        this.body = body;
        this.star = star || false;
        this.image = image || 'assets/star.svg'
    };

    updateIdea() {
        if(this.star === false) {
            this.star = true;
            this.image = 'assets/star-active.svg'
        } else if(this.star === true) {
            this.star = false;
            this.image = 'assets/star.svg'
        }
        this.saveToStorage();
    };

    saveToStorage() {
        var cardId = this.id;
        var cardDeets = JSON.stringify(this);
        localStorage.setItem(cardId, cardDeets);
      }
    
    deleteFromStorage() {
        localStorage.removeItem(this.id);
      }
};