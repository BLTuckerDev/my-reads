import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'


//TODO The search experience
//TODO Routing
//TODO JSX Formatting
//TODO double check html and javascript style


class BooksApp extends React.Component {
    state = {
        books: [],

        showSearchPage: false
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                console.log(books);

                this.setState(() => ({books}))
            })
    }

    changeBookshelf = (updatedBook, shelf) => {
        const bookIndex = this.state.books.indexOf(updatedBook);
        updatedBook.shelf = shelf

        const updatedBooks = this.state.books.splice(bookIndex, 1, updatedBook);

        this.setState(() => ({updatedBooks}));

        BooksAPI.update(updatedBook, shelf)
    }

    render() {

        const {books} = this.state;

        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
                            <div className="search-books-input-wrapper">
                                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                                <input type="text" placeholder="Search by title or author"/>

                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {books
                                                .filter(book => book.shelf === 'currentlyReading')
                                                .map((book) => (
                                                <li key={book.id}>
                                                    <Book book={book}
                                                          onChangeBookshelf={this.changeBookshelf} />
                                                </li>))}
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {books
                                                .filter(book => book.shelf === 'wantToRead')
                                                .map((book) => (
                                                <li key={book.id}>
                                                    <Book book={book}
                                                          onChangeBookshelf={this.changeBookshelf} />
                                                </li>))}
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {books
                                                .filter(book => book.shelf === 'read')
                                                .map((book) => (
                                                <li key={book.id}>
                                                    <Book book={book}
                                                          onChangeBookshelf={this.changeBookshelf} />
                                                </li>))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp
