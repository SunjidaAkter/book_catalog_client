import { ChangeEvent, FormEvent, useState } from "react";
import { FiSend } from "react-icons/fi";
import {
  useGetSingleReviewQuery,
  usePostReviewMutation,
} from "../redux/features/book/bookApi";
import { useParams } from "react-router-dom";

interface IProps {
  id: string;
}

export default function Review() {
  const { id } = useParams();
  const [inputValue, setInputValue] = useState<string>("");
  const { data } = useGetSingleReviewQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1000,
  });
  const [postReview, { error, isLoading, isSuccess }] = usePostReviewMutation();
  console.log(data.data.reviews);
  console.log({ error, isLoading, isSuccess });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      id: id,
      data: { reviews: ["inputValue"] },
    };
    postReview(options);
    setInputValue("");
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5 px-40">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <textarea
          className="min-h-[30px] w-full border-[2px] rounded-md border-zinc-500"
          onChange={handleChange}
          value={inputValue}
        />
        <button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </button>
      </form>
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
