import { ChangeEvent, FormEvent, useState } from "react";
import { FiSend } from "react-icons/fi";

interface IProps {
  id: string;
}

export default function Review() {
  const [inputValue, setInputValue] = useState<string>("");
  //   const { data } = useGetSingleCommentQuery(id, {
  //     refetchOnMountOrArgChange: true,
  //     pollingInterval: 1000,
  //   });
  //   const [postComment, { isError, isLoading, isSuccess }] =
  //     usePostCommentMutation();
  //   console.log({ isError, isLoading, isSuccess });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const options = {
    //   id: id,
    //   data: { comment: inputValue },
    // };
    // postComment(options);
    setInputValue("");
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5 px-40">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <textarea
          className="min-h-[30px] w-full"
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
      <div className="mt-10">
        <div className="flex gap-3 items-center mb-5">
          <div>
            <img
              className="w-16 h-16 rounded-full"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
            {/* <divFallback>CN</divFallback> */}
          </div>
          <p>hello</p>
        </div>
      </div>
    </div>
  );
}
