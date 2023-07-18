import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import Swal from "sweetalert2";

interface UpdateBookInputs {
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
}

export default function AddBook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateBookInputs>();
  const { id } = useParams();
  const { data } = useSingleBookQuery(id);
  const [updateBook, { error, isLoading, isSuccess }] = useUpdateBookMutation();
  console.log({ error, isLoading, isSuccess });
  const onSubmit = (data: UpdateBookInputs, event: any) => {
    event.preventDefault();
    console.log(data);
    const options = {
      id: id,
      data: {
        title: data.title,
        author: data.author,
        genre: data.genre,
        publicationDate: data.publicationDate,
      },
    };

    updateBook(options);
    reset();
    Swal.fire({
      title: "Book updated successfully!",
      icon: "success",
    });
  };
  return (
    <>
      <h1 className="text-center text-3xl font-bold text-lime-950 pt-24 pb-12">
        Add New Book
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="px-56 pb-16">
          <div className="form-control w-full ">
            <input
              defaultValue={data?.data?.title}
              type="text"
              placeholder="Enter Title"
              className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div className="form-control w-full ">
            <input
              defaultValue={data?.data?.author}
              type="text"
              placeholder="Enter Author"
              className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && <p>{errors.author.message}</p>}
          </div>
          <div className="form-control w-full ">
            <input
              defaultValue={data?.data?.genre}
              type="text"
              placeholder="Enter Genre"
              className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
              {...register("genre", { required: "Genre is required" })}
            />
            {errors.genre && <p>{errors.genre.message}</p>}
          </div>
          <div className="form-control w-full ">
            <input
              defaultValue={data?.data?.publicationDate}
              type="text"
              placeholder="Enter Publication Date"
              className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
              {...register("publicationDate", {
                required: "Publication Date is required",
              })}
            />
            {errors.publicationDate && <p>{errors.publicationDate.message}</p>}
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
}
