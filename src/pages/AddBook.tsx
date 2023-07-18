import { useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";
import { usePostBookMutation } from "../redux/features/book/bookApi";
import Swal from "sweetalert2";

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
  const onSubmit = (data: AddBookInputs) => {
    console.log(data);
    const options = {
      data: {
        title: data.title,
        author: data.author,
        genre: data.genre,
        publicationDate: data.publicationDate,
      },
    };

    postBook(options);
    reset();
    Swal.fire({
      title: "Book added successfully!",
      icon: "success",
    });
  };
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
          <div className="form-control w-full ">
            <input
              type="text"
              placeholder="Enter Genre"
              className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
              {...register("genre", { required: "Genre is required" })}
            />
            {errors.genre && <p>{errors.genre.message}</p>}
          </div>
          <div className="form-control w-full ">
            <input
              type="text"
              placeholder="Enter Publication Date"
              className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
              {...register("publicationDate", {
                required: "Publication Date is required",
              })}
            />
            {errors.publicationDate && <p>{errors.publicationDate.message}</p>}
          </div>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
}
