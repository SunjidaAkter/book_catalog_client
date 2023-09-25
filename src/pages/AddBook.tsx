import { useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";

import { usePostBookMutation } from "../redux/features/book/bookApi";
import Swal from "sweetalert2";
import DateInput from "../components/Date";
import { useAppSelector } from "../redux/hook";
import AddGenre from "../components/AddGenre";
import { useEffect } from "react";

interface AddBookInputs {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

export default function AddBook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBookInputs>();
  // const { id } = useParams();
  const [postBook, { error, isLoading, isSuccess }] = usePostBookMutation();
  console.log({ error, isLoading, isSuccess });
  const { date, genre } = useAppSelector((state) => state.book);
  const { user } = useAppSelector((state) => state.user);
  const onSubmit = (data1: AddBookInputs) => {
    console.log(data1);
    const options = {
      data: {
        title: data1.title,
        author: data1.author,
        genre: genre,
        publicationDate: date,
        addedBy: user?.email,
      },
    };

    postBook(options);
    // console.log(
    //   "error",
    //   !isLoading && !error,
    //   error,
    //   isLoading,
    //   isSuccess,
    //   data
    // );
    reset();
    // if (!isLoading && isSuccess) {
    //   console.log("object");
    //   Swal.fire({
    //     title: "wrong!",
    //     icon: "success",
    //     confirmButtonText: "Cool!",
    //     confirmButtonColor: "#72865a",
    //   });
    // }
    // } else if (!isLoading && isSuccess) {
    // setTimeout(() => {
    //     Swal.fire({
    //       title: `${error}`,
    //       icon: "error",
    //       confirmButtonText: "Oops!",
    //       confirmButtonColor: "#72865a",
    //     });
    //     Swal.fire({});
    //   }
    // }, 900);
  };
  useEffect(() => {
    if (isSuccess && !isLoading) {
      Swal.fire({
        title: "Book added successfully!",
        text: "Duplicate title or something else!",
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
  }, [isLoading, isSuccess, error]);

  return (
    <>
      <h1 className="text-center text-3xl font-bold text-lime-950 pt-24 pb-12">
        Add New Book
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-56 pb-16">
          <div className="form-control w-full ">
            <input
              type="text"
              placeholder="Enter Title"
              className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div className="form-control w-full ">
            <input
              type="text"
              placeholder="Enter Author"
              className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && <p>{errors.author.message}</p>}
          </div>
          {/* <div className="form-control w-full ">
            <input
              type="text"
              placeholder="Enter Genre"
              className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
              {...register("genre", { required: "Genre is required" })}
            />
            {errors.genre && <p>{errors.genre.message}</p>}
          </div> */}
          <div className="form-control w-full ">
            <AddGenre></AddGenre>
            <DateInput></DateInput>
          </div>
          <button className="mt-12 text-white btn btn-md bg-opacity-70 backdrop-blur-2xl bg-lime-900">
            Add Book
          </button>
        </div>
      </form>
    </>
  );
}
