const Comment = require('./comment')

class Post {
    #id;
    #area;
    #tittle;
    #author;
    #content;
    #date;
    #comments;
    
    constructor(id, area, tittle, author, content, comments = []){
        this.#id = id;
        this.#area = area;
        this.#tittle = tittle;
        this.#author = author;
        this.#content = content;
        this.#date = new Date();
        this.#comments = comments.map(comment => new Comment(comment.author, comment.content, comment.date));
    }

    // Getters
    get id() {
        return this.#id;
    }

    get area(){
        return this.#area;
    }

    get tittle() {
        return this.#tittle;
    }

    get author() {
        return this.#author;
    }

    get content() {
        return this.#content;
    }

    get date() {
        return this.#date;
    }

    get comments() {
        return this.#comments;
    }

    // Setters
    set area(value){
        this.#area = value;
    }

    set tittle(value) {
        this.#tittle = value;
    }

    set author(value) {
        this.#author = value;
    }

    set content(value) {
        this.#content = value;
    }

    set comments(value) {
        this.#comments = value;
    }


    // Cargar publicaciones desde posts.json
    /* loadPosts() {
        try {
            const data = fs.readFileSync('data/posts.json');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al cargar las publicaciones:', error);
            return [];
        }
    }

    // Guardar publicaciones en posts.json
    savePosts(posts) {
        fs.writeFileSync('data/posts.json', JSON.stringify(posts, null, 2));
    } */
}

module.exports = Post;