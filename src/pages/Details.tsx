import { Link, useParams } from "react-router-dom";
import Review from "../components/Review";
import { useSingleBookQuery } from "../redux/features/book/bookApi";
import { FcLikePlaceholder } from "react-icons/fc";

export default function Details() {
  const { id } = useParams();
  const { data } = useSingleBookQuery(id);
  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300 px-40">
        <div className="w-[50%]">
          <img
            className="h-[66vh]"
            src="https://www.bookgeeks.in/wp-content/uploads/2022/11/The-Art-of-War-by-Sun-Tzu-Book.jpg"
            alt=""
          />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{data?.data?.title}</h1>
          <p className="text-xl">Author: {data?.data?.author}</p>
          <p className="text-xl">Genre: {data?.data?.genre}</p>
          <p className="text-xl">
            Publication Date: {data?.data?.publicationDate}
          </p>
          <button>
            <FcLikePlaceholder></FcLikePlaceholder>
          </button>
          <div className="mt-5 flex justify-start items-center">
            <Link to={`/edit-book/${data?.data?._id}`}>
              <button className="btn btn-sm bg-lime-500">Edit</button>
            </Link>
            <button className="btn btn-sm btn-error ml-5">Delete</button>
          </div>
        </div>
      </div>
      <Review />
    </>
  );
}
