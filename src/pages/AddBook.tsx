export default function AddBook() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold text-lime-950 pt-24 pb-12">
        Add New Book
      </h1>
      <div className="px-56 pb-16">
        <div className="form-control w-full ">
          {/* <label className="label">
            <span className="label-text">What is your name?</span>
          </label> */}
          <input
            type="text"
            placeholder="Enter Title"
            className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          {/* <label className="label">
            <span className="label-text">What is your name?</span>
          </label> */}
          <input
            type="text"
            placeholder="Enter Author"
            className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          {/* <label className="label">
            <span className="label-text">What is your name?</span>
          </label> */}
          <input
            type="text"
            placeholder="Enter Genre"
            className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          {/* <label className="label">
            <span className="label-text">What is your name?</span>
          </label> */}
          <input
            type="text"
            placeholder="Enter Publication Date"
            className="border  focus:border-none rounded-none border-dashed border-b-zinc-800 mb-3 border-b-2 border-x-0 border-t-0 input input-bordered w-full "
          />
        </div>
      </div>
    </>
  );
}
