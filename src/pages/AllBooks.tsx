import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import Card from "../components/Card";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import {
  setCurrentPageForNext,
  setCurrentPageForPrevious,
  setGenre,
  setPublicationYear,
  setSearchTerm,
} from "../redux/features/book/bookSlice";
import { Link } from "react-router-dom";

export default function Products() {
  const { searchTerm, genre, currentPage, publicationYear } = useAppSelector(
    (state) => state.book
  );
  const dispatch = useAppDispatch();
  const { data } = useGetBooksQuery({
    currentPage,
    publicationYear,
    genre,
    searchTerm,
  });
  console.log(data);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPageForPrevious());
    }
  };
  const handleNextPage = () => {
    const totalPages = Math.ceil(data?.meta?.total / 4);
    console.log(totalPages);
    if (currentPage < totalPages) {
      dispatch(setCurrentPageForNext());
    }
  };
  const handleSelectChange = (e: any) => {
    console.log(e.target.value);
    dispatch(setGenre(e.target.value));
  };
  const handleSearch = () => {
    const inputElement = document.getElementById(
      "search-input"
    ) as HTMLInputElement;
    const inputValue = inputElement?.value;
    console.log(inputValue);
    dispatch(setSearchTerm(inputValue || ""));
    inputElement.value = "";
  };
  const handleChange = (event: any) => {
    dispatch(setPublicationYear(event));
  };
  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
        </div>
        <div className="form-control">
          <div className="flex justify-center items-center ">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered rounded-e-sm"
              id="search-input"
            />
            <button
              onClick={handleSearch}
              className="btn btn-square rounded-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <input
              type="range"
              value={publicationYear}
              max={2023}
              min={2020}
              step={1}
              className="w-full"
              onChange={(event) => handleChange(event.target.value)}
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>2020</span>
              <span>2021</span>
              <span>2022</span>
              <span>2023</span>
            </div>
          </div>
          <div>From 0$ To p$</div>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Pick the best fantasy franchise</span>
          </label>
          <select
            className="select select-bordered"
            value={genre}
            onChange={handleSelectChange}
          >
            <option selected>প্রোগ্রামিং</option>
            <option>ওয়েব ডেভেলপমেন্ট</option>
            <option>ইলেকট্রনিক্স</option>
          </select>
        </div>
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
      <div className="col-span-9 grid grid-cols-2 gap-10 pb-20">
        {data?.data.map((book: IBook) => (
          <Link to={`/details/${book._id}`}>
            <Card book={book}></Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
