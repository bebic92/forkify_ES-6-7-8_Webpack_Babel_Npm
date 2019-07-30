export default class Like {

    constructor() {

        this.likes = [];

    }

    addLike(id, title, author, img) {

        const like = {
            id,
            title,
            author,
            img
        }

        this.likes.push(like);
        
        this.saveDataInBrowser();

        return like;
    
    }

    deleteLike(id) {

        const index = this.likes.findIndex(el => el.id === id);

        this.likes.splice(index, 1);

        this.saveDataInBrowser();

    }

    isLiked(id) {

        return this.likes.findIndex(e => e.id === id) !== -1;

    }

    getNumberOfLikes() {

        return this.likes.length;
    
    }

    saveDataInBrowser() {

        localStorage.setItem('likes', JSON.stringify(this.likes));

    }

    displayDataSavedInBrowser() {

        const storage = JSON.parse(localStorage.getItem('likes'));

        if(storage) {

            this.likes = storage;
        
        }

    }
} 