import { Slider } from "@radix-ui/react-slider";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";
import Card from "../components/Card";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import {
  setCurrentPageForNext,
  setCurrentPageForPrevious,
} from "../redux/features/book/bookSlice";
import { useState } from "react";

export default function Products() {
  const { currentPage } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGetBooksQuery(currentPage);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPageForPrevious());
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data?.meta?.total / 10);
    console.log(totalPages);
    if (currentPage < totalPages) {
      dispatch(setCurrentPageForNext());
    }
  };
  // const { data, isLoading, error } = useGetProductsQuery(undefined);

  // const { toast } = useToast();

  // const { priceRange, status } = useAppSelector((state) => state.product);

  const handleSlider = (value: number[]) => {
    // dispatch(setPriceRange(value[0]));
  };

  // let productsData;

  // if (status) {
  //   productsData = data?.data?.filter(
  //     (item: { status: boolean; price: number }) =>
  //       item.status === true && item.price < priceRange
  //   );
  // } else if (priceRange > 0) {
  //   productsData = data?.data?.filter(
  //     (item: { price: number }) => item.price < priceRange
  //   );
  // } else {
  //   productsData = data?.data;
  // }
  const [value, setValue] = useState(2022);

  const handleChange = (event: any) => {
    setValue(parseInt(event.target.value));
  };
  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          {/* <div
            onClick={() => dispatch(toggleState())}
            className="flex items-center space-x-2 mt-3"
          >
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div> */}
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <input
              type="range"
              min="2020"
              max="2023"
              className="appearance-non w-full bg-lime-700"
              step="1"
              onChange={handleChange}
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>2020</span>
              <span>2021</span>
              <span>2022</span>
              <span>2023</span>
            </div>
          </div>
          <div>From 0$ To p$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-2 gap-10 pb-20">
        {data?.data.map((book: IBook) => (
          <Card book={book}></Card>
        ))}
        <div className="flex justify-center items-center px-[200px]">
          <button className="bg-red-800" onClick={handlePreviousPage}>
            Previous
          </button>
          <span>{currentPage}</span>
          <button className="bg-red-900" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// import { useDispatch } from "react-redux";
// import Card from "../components/Card";
// import { useAppSelector } from "../redux/hook";
// import { IBook } from "../types/globalTypes";
// import { useGetBooksQuery } from "../redux/features/book/bookApi";
// import {
//   setCurrentPageForNext,
//   setCurrentPageForPrevious,
// } from "../redux/features/book/bookSlice";

// export default function Home() {
//   const { currentPage } = useAppSelector((state) => state.book);
//   const dispatch = useAppDispatch();
//   const { data, isLoading, error } = useGetBooksQuery(currentPage);
//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       dispatch(setCurrentPageForPrevious());
//     }
//   };

//   const handleNextPage = () => {
//     const totalPages = Math.ceil(data?.meta?.total / 10);
//     console.log(totalPages);
//     if (currentPage < totalPages) {
//       dispatch(setCurrentPageForNext());
//     }
//   };
//   // const { data, isLoading, error } = useGetBooksQuery(currentPage);
//   console.log(data, isLoading, error);
//   return (
//     <>
//       <div className="py-12">
//         <p className="pb-12 text-center text-3xl font-bold text-lime-950 ">
//           Top Books
//         </p>
//         <div className="px-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {data?.data.map((book: IBook) => (
//             <Card book={book}></Card>
//           ))}
//           <div className="flex justify-center items-center px-[200px]">
//             <button className="bg-red-800" onClick={handlePreviousPage}>
//               Previous
//             </button>
//             <span>{currentPage}</span>
//             <button className="bg-red-900" onClick={handleNextPage}>
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
