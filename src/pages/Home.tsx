import Card from "../components/Card";
import { useGetTopBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";

export default function Home() {
  const { data, isLoading, error } = useGetTopBooksQuery(undefined);
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
      <>
        <div className="py-12">
          <p className="pb-12 text-center text-3xl font-bold text-lime-950 ">
            Last Added Ten Books
          </p>
          <div className="px-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data?.data.map((book: IBook) => (
              <Card book={book}></Card>
            ))}
          </div>
        </div>
      </>
    );
  }
}
