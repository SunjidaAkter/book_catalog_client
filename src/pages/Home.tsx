import Card from "../components/Card";
import { useGetTopBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";

export default function Home() {
  const { data, isLoading, error } = useGetTopBooksQuery(undefined);
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
          {/* const handlePreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

const handleNextPage = () => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

// Update the pagination controls
<button onClick={handlePreviousPage}>Previous</button>
<span>{currentPage}</span>
<button onClick={handleNextPage}>Next</button> */}
        </div>
      </div>
    </>
  );
}
