import { Link } from "react-router-dom";
import { update } from "../services/BooksAPI";

export const BookItem = (props) => {
  const { item, updateBooks: updateBooksCallBack } = props;

  const updateBook = async (event) => {
    const valueSelected = event.target.value;
    await update(item, valueSelected);
    updateBooksCallBack?.();
  };

  return (
    <div className="book">
      <div className="book-top">
        <Link
          to={{
            pathname: `/detail/${item.id}`,
          }}
        >
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${item?.imageLinks?.thumbnail})`,
            }}
          ></div>
        </Link>
        <div className="book-shelf-changer">
          <select value={item.shelf} onChange={(event) => updateBook(event)}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>

      <div className="book-title">{item?.title}</div>
      {(item?.authors ?? []).map((author) => (
        <div key={author} className="book-authors">
          {author}
        </div>
      ))}
    </div>
  );
};
