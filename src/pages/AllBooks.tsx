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

export default function Products() {
  const { searchTerm, genre, currentPage, publicationYear } = useAppSelector(
    (state) => state.book
  );
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGetBooksQuery({
    currentPage,
    publicationYear,
    genre,
    searchTerm,
  });
  console.log(genre);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPageForPrevious());
    }
  };
  const totalPages = Math.ceil(data?.meta?.total / 4);
  const handleNextPage = () => {
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
    console.log(event);
    if (event === "2024") {
      console.log(event);
      dispatch(setPublicationYear(""));
    } else {
      dispatch(setPublicationYear(event));
    }
  };
  if (isLoading && !data) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </>
    );
  } else if (error && data == undefined) {
    console.log(error && data == undefined);
    return (
      <>
        <div className="my-[200px]">
          <p className="text-red-500 text-lg text-center font-extrabold">
            Something Went Wrong!
          </p>
        </div>
      </>
    );
  } else {
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
            <h1 className="text-2xl uppercase">Publication Year</h1>
            <div className="max-w-xl">
              <input
                type="range"
                value={publicationYear == "" ? 2024 : publicationYear}
                max={2024}
                min={2019}
                step={1}
                className="range-medium w-full"
                onChange={(event) => handleChange(event.target.value)}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>2019</span>
                <span>2020</span>
                <span>2021</span>
                <span>2022</span>
                <span>2023</span>
                <span>All</span>
              </div>
            </div>
            <div>From 2019 To 2023</div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Pick Your Favourite Genre!</span>
            </label>
            <select
              className="select select-bordered"
              defaultValue={""}
              value={genre}
              onChange={handleSelectChange}
            >
              <option value="">All Genres</option>
              <option value="Novel">Novel</option>
              <option value="প্রোগ্রামিং">প্রোগ্রামিং</option>
              <option value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</option>
              <option value="কম্পিউটার নেটওয়ার্কিং">
                কম্পিউটার নেটওয়ার্কিং
              </option>
              <option value="ওয়েব ডেভেলপমেন্ট">ওয়েব ডেভেলপমেন্ট</option>
              <option value="ডিজিটাল ইউজার ইন্টারফেস">
                ডিজিটাল ইউজার ইন্টারফেস
              </option>
              <option value="মোবাইল অ্যাপ্লিকেশন ডেভেলপমেন্ট">
                মোবাইল অ্যাপ্লিকেশন ডেভেলপমেন্ট
              </option>
              <option value="ক্রিয়েটিভ প্রোগ্রামিং">
                ক্রিয়েটিভ প্রোগ্রামিং
              </option>
              <option value="সাইবার সিকিউরিটি">সাইবার সিকিউরিটি</option>
              <option value="সিস্টেম আর্কিটেকচার">সিস্টেম আর্কিটেকচার</option>
            </select>
          </div>
          <div className="flex justify-center items-center px-[100px]">
            <button
              className={
                currentPage > 1
                  ? "bg-[#0075ff] text-white btn btn-sm hover:bg-[#0075ff] focus:bg-[#0075ff]"
                  : "btn btn-disabled btn-sm"
              }
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            <span className="px-4 py-2 border-[#0075ff] border-[1px] m-3 text-[#0075ff] bg-base-200 rounded-full">
              {currentPage}
            </span>
            <button
              className={
                currentPage < totalPages
                  ? "bg-[#0075ff] text-white btn btn-sm hover:bg-[#0075ff] focus:bg-[#0075ff]"
                  : "btn btn-disabled btn-sm"
              }
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
          {/* <p className="">Pages</p> */}
        </div>
        <div className="col-span-9 grid grid-cols-2 gap-10 pb-20">
          {data?.data.map((book: IBook) => (
            <Card book={book}></Card>
          ))}
        </div>
      </div>
    );
  }
}
