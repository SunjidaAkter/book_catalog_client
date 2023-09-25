import { Link } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setStatus } from "../redux/features/book/bookSlice";
import { useUpdateStatusMutation } from "../redux/features/book/bookApi";
// import Swal from "sweetalert2";

interface IProps {
  book: IBook;
}
export default function Card({ book }: IProps) {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [updateStatus, { data, isLoading, error, isSuccess }] =
    useUpdateStatusMutation();
  console.log({ data, isLoading, error, isSuccess });

  // const { status } = useAppSelector((state) => state.book);
  const handleReading = () => {
    if (user?.email) {
      dispatch(setStatus());
      const options = {
        id: book?._id,
        data: {
          readStatus: [
            {
              user: user.email,
              status: book?.readStatus.find(
                (status: any) => status.user === user.email
              )?.status,
            },
          ],
        },
      };
      updateStatus(options);
      //   if (data && !isLoading) {
      //     Swal.fire({
      //       title: "Book Marked As Read Successfully!",
      //       icon: "success",
      //       confirmButtonText: "Cool!",
      //       confirmButtonColor: "#72865a",
      //     });
      //   }
      // } else if (!data && !isLoading) {
      //   Swal.fire({
      //     title: "Book Marked As Finished Successfully!",
      //     icon: "error",
      //     confirmButtonText: "Oops!",
      //     confirmButtonColor: "#72865a",
      //   });
    }
  };
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
        <h2 className="card-title">
          {book?.title}
          {user?.email && (
            <>
              <div
                style={{ whiteSpace: "nowrap" }}
                className="badge bg-lime-950 text-xs p-2 text-white"
                onClick={handleReading}
              >
                {isLoading
                  ? "Loading..."
                  : book?.readStatus.find(
                      (status: any) => status.user === user.email
                    )?.status
                  ? "Finished Reading"
                  : "Mark as read"}
              </div>
            </>
          )}
        </h2>
        <p>{book?.author}</p>
        <p>{book?.genre}</p>
        <p>{book?.publicationDate}</p>
        <div className="card-actions justify-end">
          <Link to={`/details/${book?._id}`}>
            <div className="text-white btn btn-sm bg-opacity-70 backdrop-blur-2xl bg-lime-900">
              Book Details
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
