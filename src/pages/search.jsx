import { useState } from "react";
import { BookShelf } from "../components/book-shelf";
import { search } from "../services/BooksAPI";

export const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [listBookSearch, setListBookSearch] = useState([]);
  const { showSearchCallBack } = props;

  const getBookSearch = async (event) => {
    if (!event) {
      return;
    }

    const valueInput = event.target.value;
    setSearchValue(valueInput);
    const results = await search(valueInput, 100);
    if (!results || !!results.error) {
      console.log(results);
      return;
    }

    setListBookSearch(results);
  };
  const setShowSearchpage = () => {
    showSearchCallBack?.();
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={setShowSearchpage}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchValue}
            onChange={(event) => getBookSearch(event)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BookShelf title="Search results" listBooks={listBookSearch} />
      </div>
    </div>
  );
};
