// import { useState } from "react";
import { FiSend } from "react-icons/fi";
import {
  useGetSingleReviewQuery,
  usePostReviewMutation,
} from "../redux/features/book/bookApi";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import Swal from "sweetalert2";

// interface IProps {
//   id: string;
// }

export default function Review({ book }: any) {
  const { id } = useParams();
  // const [inputValue, setInputValue] = useState<string>("");
  const { data } = useGetSingleReviewQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1000,
  });
  const [postReview] = usePostReviewMutation();
  // console.log(data?.data?.reviews);
  // console.log({ error, isLoading, isSuccess });
  const { user, isLoading } = useAppSelector((state: any) => state.user);
  const handleSubmit = () => {
    const inputElement = document.getElementById(
      "review-input"
    ) as HTMLInputElement;
    const inputValue = inputElement?.value;
    console.log(inputValue);
    const options = {
      id: id,
      data: { reviews: [inputValue] },
    };
    if (!isLoading && user?.email) {
      postReview(options);
      inputElement.value = "";
      Swal.fire({
        title: "Review Added Successfully!",
        icon: "success",
        confirmButtonText: "Cool!",
        confirmButtonColor: "#72865a",
      });
    } else if (!isLoading && !user.email) {
      Swal.fire({
        title: "You are not registered!",
        icon: "error",
        confirmButtonText: "Oops!",
        confirmButtonColor: "#72865a",
      });
    }
  };
  console.log(book);
  if (book?.data?.title) {
    return (
      <div className="max-w-7xl mx-auto mt-5 px-40">
        <div className="flex gap-5 items-center" onSubmit={handleSubmit}>
          <textarea
            className="min-h-[30px] w-full border-[2px] rounded-md border-zinc-500"
            id="review-input"
          />
          <button
            onClick={handleSubmit}
            className="rounded-full h-10 w-10 p-2 text-[25px]"
          >
            <FiSend />
          </button>
        </div>
        {data?.data?.reviews?.map((review: string) => (
          <div className="mt-10">
            <div className="flex gap-3 items-center mb-5">
              <div>
                <img
                  className="w-16 h-16 rounded-full"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
              <p>{review}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
