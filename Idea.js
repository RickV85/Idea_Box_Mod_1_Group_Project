class Idea {
    constructor(title, body, id, star, image) {
        this.id = id || Date.now();
        this.title = title;
        this.body = body;
        this.star = star || false;
        this.image = image || 'assets/star.svg'
    };

    updateIdea() {

    };

    saveToStorage() {

    };

    deleteFromStorage() {

    };
};

// module.exports = Idea;