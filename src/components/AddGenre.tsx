import { setGenre } from "../redux/features/book/bookSlice";
import { useAppDispatch } from "../redux/hook";

const AddGenre = () => {
  const dispatch = useAppDispatch();
  const handleGenre = (e: any) => {
    console.log(e.target.value);
    dispatch(setGenre(e.target.value));
  };
  return (
    <div className="mt-12">
      <p className="text-start text-md text-">Select Genre</p>
      {/* <label className="text-sm" htmlFor="daySelect">
        Day:
      </label> */}
      <br />

      <div>
        <select
          required
          onChange={handleGenre}
          className="select select-bordered w-[40%]"
          // value={day}
        >
          <option value="">Select Genre</option>
          <option value="Novel">Novel</option>
          <option value="প্রোগ্রামিং">প্রোগ্রামিং</option>
          <option value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</option>
          <option value="কম্পিউটার নেটওয়ার্কিং">কম্পিউটার নেটওয়ার্কিং</option>
          <option value="ওয়েব ডেভেলপমেন্ট">ওয়েব ডেভেলপমেন্ট</option>
          <option value="ডিজিটাল ইউজার ইন্টারফেস">
            ডিজিটাল ইউজার ইন্টারফেস
          </option>
          <option value="মোবাইল অ্যাপ্লিকেশন ডেভেলপমেন্ট">
            মোবাইল অ্যাপ্লিকেশন ডেভেলপমেন্ট
          </option>
          <option value="ক্রিয়েটিভ প্রোগ্রামিং">ক্রিয়েটিভ প্রোগ্রামিং</option>
          <option value="সাইবার সিকিউরিটি">সাইবার সিকিউরিটি</option>
          <option value="সিস্টেম আর্কিটেকচার">সিস্টেম আর্কিটেকচার</option>
        </select>
      </div>
    </div>
  );
};

export default AddGenre;
