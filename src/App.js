import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import BookSearch from './BookSearch'
import {Route, Link} from 'react-router-dom'


//TODO JSX Formatting
//TODO double check html and javascript style

//TODO Sort each shelf alphabetically

class BooksApp extends React.Component {
    state = {
        books: []
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

                <Route path='/search' render={() => (
                    <BookSearch onChangeBookshelf={this.changeBookshelf}/>
                )}/>

                <Route exact path='/' render={() => (
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
                                                              onChangeBookshelf={this.changeBookshelf}/>
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
                                                              onChangeBookshelf={this.changeBookshelf}/>
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
                                                              onChangeBookshelf={this.changeBookshelf}/>
                                                    </li>))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
