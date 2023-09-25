import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import Swal from "sweetalert2";
import UpdateDate from "../components/UpdateDate";
import { useAppSelector } from "../redux/hook";
import UpdateGenre from "../components/UpdateGenre";

interface UpdateBookInputs {
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
}

export default function AddBook() {
  const { handleSubmit, reset } = useForm<UpdateBookInputs>();
  const { id } = useParams();
  const { data } = useSingleBookQuery(id);
  const { date, genre } = useAppSelector((state) => state.book);
  const [updateBook, { error, isLoading, isSuccess }] = useUpdateBookMutation();
  console.log({ error, isLoading, isSuccess });
  const onSubmit = (data1: UpdateBookInputs, event: any) => {
    event.preventDefault();
    console.log(date);
    const options = {
      id: id,
      data: {
        title: data1.title,
        author: data1.author,
        genre: genre,
        publicationDate: date,
      },
    };

    updateBook(options);
    reset();
    if (!error) {
      Swal.fire({
        title: "Book updated successfully!",
        icon: "success",
        confirmButtonText: "Cool!",
        confirmButtonColor: "#72865a",
      });
    } else if (!isLoading && error) {
      Swal.fire({
        title: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Oops!",
        confirmButtonColor: "#72865a",
      });
    }
  };
  return (
    <>
      <h1 className="text-center text-3xl font-bold text-lime-950 pt-24 pb-12">
        Update Book
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="px-56 pb-16">
          <div className="form-control w-full ">
            <input
              defaultValue={data?.data?.title}
              type="text"
              placeholder="Enter Title"
              className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <input
              defaultValue={data?.data?.author}
              type="text"
              placeholder="Enter Author"
              className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
            />
          </div>

          <div className="form-control w-full ">
            <UpdateGenre id={id}></UpdateGenre>
            <UpdateDate id={id}></UpdateDate>
          </div>
          <button
            type="submit"
            className="mt-12 text-white btn btn-md bg-opacity-70 backdrop-blur-2xl bg-lime-900"
          >
            Update Book
          </button>
        </div>
      </form>
    </>
  );
}
