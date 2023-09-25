import ListCard from "../components/ListCard";
import { useGetListQuery } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";

export default function ReadList() {
  const { data, isLoading, error } = useGetListQuery(undefined);
  const { user } = useAppSelector((state) => state.user);
  const books = data?.data?.filter((da: any) =>
    da.readList?.includes(user?.email)
  );
  console.log(books?.length);
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
  } else if (!isLoading && books?.length == 0) {
    return (
      <>
        <div className="my-[200px]">
          <p className="text-red-500 text-lg text-center font-extrabold">
            No books added in read list!
          </p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="py-12">
          <p className="pb-12 text-center text-3xl font-bold text-lime-950 ">
            Read List
          </p>
          <div className="px-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {books?.map((book: IBook) => (
              <ListCard book={book}></ListCard>
            ))}
          </div>
        </div>
      </>
    );
  }
}
