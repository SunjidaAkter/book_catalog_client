import {
  setDate,
  setDay,
  setMonth,
  setYear,
} from "../redux/features/book/bookSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

const DateInput = () => {
  const { day, month, year } = useAppSelector((state) => state.book);
  // console.log({ day, month, year });
  const date = `${day}-${month}-${year}`;
  const dispatch = useAppDispatch();
  dispatch(setDate(date));
  const handleDay = (e: any) => {
    console.log(e.target.value);
    dispatch(setDay(e.target.value));
  };
  const handleMonth = (e: any) => {
    console.log(e.target.value);
    dispatch(setMonth(e.target.value));
  };
  const handleYear = (e: any) => {
    console.log(e.target.value);
    dispatch(setYear(e.target.value));
  };

  return (
    <div className="mt-12">
      <p className="text-start text-md text-">Select Publication date</p>
      {/* <label className="text-sm" htmlFor="daySelect">
        Day:
      </label> */}
      <br />

      <div>
        <select
          required
          onChange={handleDay}
          className="select select-bordered mr-5"
          // value={day}
        >
          <option value="">Select Day</option>
          {/* Add options for days (1 to 31) */}
          {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        {/* <label htmlFor="monthSelect">Month:</label> */}
        <select
          onChange={handleMonth}
          required
          className="select select-bordered mr-5"
          // value={month}
        >
          <option value="">Select Month</option>
          {/* Add options for months (January to December) */}
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        {/* <label htmlFor="yearSelect">Year:</label> */}
        <select
          onChange={handleYear}
          required
          className="select select-bordered mr-5"
          // value={year}
        >
          <option value="">Select Year</option>
          {/* Add options for years (e.g., 2000 to 2030) */}
          {Array.from({ length: 5 }, (_, index) => 2019 + index).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Display the selected date if all parts are selected */}
        {/* {selectedDay && selectedMonth && selectedYear && (
          <p className="my-4">
            Selected Date: {selectedDay}/{selectedMonth}/{selectedYear}
          </p>
        )} */}
      </div>
    </div>
  );
};

export default DateInput;
