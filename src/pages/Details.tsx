import { Link, useParams } from "react-router-dom";
import Review from "../components/Review";
import {
  useDeleteBookMutation,
  usePostReadMutation,
  usePostWishMutation,
  useSingleBookQuery,
} from "../redux/features/book/bookApi";
import Swal from "sweetalert2";
import { useAppSelector } from "../redux/hook";

export default function Details() {
  const { id } = useParams();
  const { data, isLoading, error } = useSingleBookQuery(id);
  const [deleteBook] = useDeleteBookMutation();
  // console.log({ error, isLoading, isSuccess });
  const { user } = useAppSelector((state) => state.user);
  const canEdit = data?.data?.addedBy === user?.email;
  const [postWish] = usePostWishMutation();
  const [postRead] = usePostReadMutation();
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#72865a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the deletion
        const options = {
          id: id,
        };
        deleteBook(options);
        // navigate("/all-books");
        Swal.fire({
          title: "Book deleted successfully!",
          icon: "success",
          confirmButtonText: "Cool!",
          confirmButtonColor: "#72865a",
        });
      }
    });
  };
  const handleWish = () => {
    const options = {
      id: id,
      data: {
        wishList: [user.email],
      },
    };
    postWish(options);
    Swal.fire({
      title: "Book added to wish list successfully!",
      icon: "success",
      confirmButtonText: "Cool!",
      confirmButtonColor: "#72865a",
    });
  };
  const handleReadList = () => {
    const options = {
      id: id,
      data: {
        readList: [user.email],
      },
    };
    postRead(options);
    Swal.fire({
      title: "Book added to read list successfully!",
      icon: "success",
      confirmButtonText: "Cool!",
      confirmButtonColor: "#72865a",
    });
  };
  console.log(data?.data);
  // if (books) {
  // }
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
        <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300 px-40">
          <div className="w-[50%]">
            <img
              className="h-[66vh]"
              src="https://www.bookgeeks.in/wp-content/uploads/2022/11/The-Art-of-War-by-Sun-Tzu-Book.jpg"
              alt=""
            />
          </div>
          <div className="w-[50%] space-y-3">
            <h1 className="text-3xl font-semibold">
              {data?.data?.title ? data?.data?.title : "Not Available"}
            </h1>
            <p className="text-xl">
              Author:{" "}
              {data?.data?.author ? data?.data?.author : "Not Available"}
            </p>
            <p className="text-xl">
              Genre: {data?.data?.genre ? data?.data?.genre : "Not Available"}
            </p>
            <p className="text-xl">
              Publication Date:{" "}
              {data?.data?.publicationDate
                ? data?.data?.publicationDate
                : "Not Available"}
            </p>
            {user.email && data?.data?.title && (
              <button className="btn btn-sm bg-lime-500 " onClick={handleWish}>
                Add to wish list
              </button>
            )}
            {user.email && data?.data?.title && (
              <button
                className="btn btn-sm bg-lime-500 "
                onClick={handleReadList}
              >
                Add to read list
              </button>
            )}
            {canEdit && (
              <>
                <div className="mt-5 flex justify-start items-center">
                  <Link to={`/edit-book/${data?.data?._id}`}>
                    <button className="btn btn-sm bg-lime-500">Edit</button>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="btn btn-sm btn-error ml-5"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <Review book={data} />
      </>
    );
  }
}
