import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {

    state = {
        results: []
    };

    search = (query) => {
        BooksAPI.search(query)
            .then((response) => {
                if (response instanceof Array) {
                    this.setState(() => ({results: response}));
                } else {
                    this.setState(() => ({results: []}));
                }
            });
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