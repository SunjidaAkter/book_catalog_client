import { IBook } from "../types/globalTypes";

interface IProps {
  book: IBook;
}
export default function ListCard({ book }: IProps) {
  return (
    <div className="my-6 card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          className="h-48"
          src="https://www.bookgeeks.in/wp-content/uploads/2022/11/The-Art-of-War-by-Sun-Tzu-Book.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{book?.title}</h2>
        <p>{book?.author}</p>
        <p>{book?.genre}</p>
        <p>{book?.publicationDate}</p>
      </div>
    </div>
  );
}
