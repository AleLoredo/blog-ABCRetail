// import fs from 'fs';

class Comment{
    #author;
    #content;
    #date;

    constructor(author, content, date = new Date()){
        this.#author = author;
        this.#content = content;
        this.#date = date;
    }

    // Getters
    get author() {
        return this.#author;
    }

    get content() {
        return this.#content;
    }

    get date() {
        return this.#date;
    }

    // Setters
    set author(value) {
        this.#author = value;
    }

    set content(value) {
        this.#content = value;
    }

    set date(value) {
        this.#date = value;
    }

}

module.exports = Comment;