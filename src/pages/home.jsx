import { BookShelf } from "../components/book-shelf";
import { useEffect, useState } from "react";
import { getAll } from "../services/BooksAPI";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../const/page.const";

const shelf = {
  currentlyReading: "currentlyReading",
  wantToRead: "wantToRead",
  read: "read",
};

export const Home = () => {
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState(null);
  const [wantToReadBooks, setWantToReadBooks] = useState(null);
  const [readBooks, setReadBooks] = useState(null);

  const getBooks = async () => {
    const getAllBook = await getAll();
    setCurrentlyReadingBooks(
      getAllBook.filter((book) => book.shelf === shelf.currentlyReading) ?? []
    );
    setWantToReadBooks(
      getAllBook.filter((book) => book.shelf === shelf.wantToRead) ?? []
    );
    setReadBooks(getAllBook.filter((book) => book.shelf === shelf.read) ?? []);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const updateBooks = () => {
    getBooks();
  };

  return (
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
        <Link to={ROUTE_PATH.search}>Add a book</Link>
      </div>
    </div>
  );
};
