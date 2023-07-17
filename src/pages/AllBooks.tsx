import { useDispatch } from "react-redux";
import Card from "../components/Card";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import {
  setCurrentPageForNext,
  setCurrentPageForPrevious,
} from "../redux/features/book/bookSlice";

export default function Home() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  const { currentPage } = useAppSelector((state) => state.book);
  const dispatch = useDispatch();
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPageForPrevious());
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data?.meta?.total / 10);
    console.log(totalPages);
    if (currentPage < totalPages) {
      dispatch(setCurrentPageForNext());
    }
  };
  console.log(data, isLoading, error);
  return (
    <>
      <div className="py-12">
        <p className="pb-12 text-center text-3xl font-bold text-lime-950 ">
          Top Books
        </p>
        <div className="px-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.data.map((book: IBook) => (
            <Card book={book}></Card>
          ))}
          <div className="flex justify-center items-center px-[200px]">
            <button className="bg-red-800" onClick={handlePreviousPage}>
              Previous
            </button>
            <span>{currentPage}</span>
            <button className="bg-red-900" onClick={handleNextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
