import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get } from "../services/BooksAPI";
import { ROUTE_PATH } from "../const/page.const";

export const DetailPage = () => {
  const { id } = useParams();
  const [bookDetail, setBookDetail] = useState(null);

  useEffect(() => {
    const getDetailBook = async () => {
      const book = await get(id);
      setBookDetail(book);
    };
    getDetailBook();
  });
  return (
    <div>
      <div className="detail-header">
        <div>
          <Link to={ROUTE_PATH.home} className="close-search">
            Close
          </Link>
        </div>
        <div className="detail-title">{bookDetail?.title}</div>
      </div>
      <div className="detail-container">
        <div className="detail-content">
          <div className="detail-image">
            <img
              className="img-width"
              src={bookDetail?.imageLinks?.thumbnail}
              alt=""
            />
          </div>
          <div>
            <div>
              {(bookDetail?.authors ?? []).map((author) => (
                <div key={author} className="book-authors">
                  {author}
                </div>
              ))}
            </div>
            <div>
              <button
                onClick={() => window.open(`${bookDetail?.infoLink}`, "_blank")}
              >
                Information book
              </button>
            </div>
          </div>
        </div>

        <div className="detail-description">{bookDetail?.description}</div>
      </div>
    </div>
  );
};
