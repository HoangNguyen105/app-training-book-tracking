import { BookItem } from "./book-item";

export const BookShelf = (props) => {
  let { title, listBooks, updateBooks } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {listBooks?.length > 0 ? (
          <ol className="books-grid">
            {listBooks?.map((book) => (
              <li key={book.id}>
                <BookItem item={book} updateBooks={updateBooks} />
              </li>
            ))}
          </ol>
        ) : (
          <div>No Data</div>
        )}
      </div>
    </div>
  );
};
