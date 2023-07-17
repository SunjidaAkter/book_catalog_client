import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTopBooks: builder.query({
      query: () => "/books",
    }),
    getBooks: builder.query({
      query: (currentPage) => ({
        url: "/books",
        params: {
          page: currentPage,
          limit: 6,
        },
      }),
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/reviews/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getSingleReview: builder.query({
      query: (id) => `/books/reviews/${id}`,
      providesTags: ["reviews"],
    }),
  }),
});
export const {
  useGetTopBooksQuery,
  useGetSingleReviewQuery,
  usePostReviewMutation,
  useSingleBookQuery,
  useGetBooksQuery,
} = bookApi;
