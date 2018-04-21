import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {

    bookshelfMap = new Map();

    state = {
        results: []
    };

    componentDidMount() {
        this.props.books
            .forEach((book) =>{
                this.bookshelfMap[book.id] = book;
            })

    }

    search = (query) => {
        query = query.trim();

        if(query){
            BooksAPI.search(query)
                .then((response) => {
                    if (response instanceof Array) {
                        this.setState(() => ({results: response}));
                    } else {
                        this.setState(() => ({results: []}));
                    }
                });
        } else {
            this.setState(() => ({results: []}));
        }
    };

    render() {

        const {onChangeBookshelf} = this.props;
        const {results} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               onChange={(event) => {
                                   this.search(event.target.value)
                               }}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {results
                            .map((book) =>{
                                if(this.bookshelfMap[book.id]){
                                    return this.bookshelfMap[book.id];
                                }

                                return book;
                            })
                            .map((book) => (
                                <li key={book.id}>
                                    <Book book={book}
                                          onChangeBookshelf={onChangeBookshelf}/>
                                </li>))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookSearch;

/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */