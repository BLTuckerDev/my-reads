import React, {Component} from 'react'


class Book extends Component {

    render() {
        const {book, onChangeBookshelf} = this.props;

        const authors = (book.authors === undefined) ? "" : book.authors.join();
        const imageLinks = book.imageLinks || null;
        const thumbnail = (imageLinks != null && imageLinks.smallThumbnail) ? imageLinks.smallThumbnail : "";

        const bookTitle = book.title;
        const shelf = book.shelf || 'none';

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{
                             width: 128,
                             height: 193,
                             backgroundImage: `url(${thumbnail})`
                         }}/>
                    <div className="book-shelf-changer">
                        <select value={shelf}
                                onChange={(event) => {onChangeBookshelf(book, event.target.value)}} >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookTitle}</div>
                <div className="book-authors">{authors}</div>
            </div>
        )
    }
}


export default Book;

