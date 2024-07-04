import { BookShelf } from "../components/book-shelf";
import { useEffect, useState } from "react";
import { getAll } from "../services/BooksAPI";
import { Search } from "./search";
import { SHELF } from "../const/page.const";

export const Home = () => {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState(null);
  const [wantToReadBooks, setWantToReadBooks] = useState(null);
  const [readBooks, setReadBooks] = useState(null);

  const getBooks = async () => {
    const getAllBook = await getAll();
    setCurrentlyReadingBooks(
      getAllBook.filter((book) => book.shelf === SHELF.currentlyReading) ?? []
    );
    setWantToReadBooks(
      getAllBook.filter((book) => book.shelf === SHELF.wantToRead) ?? []
    );
    setReadBooks(getAllBook.filter((book) => book.shelf === SHELF.read) ?? []);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const updateBooks = () => {
    getBooks();
  };

  const showSearchCallBack = (event) => {
    setShowSearchpage(event);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <Search showSearchCallBack={() => showSearchCallBack(false)} />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                title="Currently Reading Books"
                listBooks={currentlyReadingBooks}
                updateBooks={updateBooks}
              />
              <BookShelf
                title="Want to Read"
                listBooks={wantToReadBooks}
                updateBooks={updateBooks}
              />
              <BookShelf
                title="Read"
                listBooks={readBooks}
                updateBooks={updateBooks}
              />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
};
