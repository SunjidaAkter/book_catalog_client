import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTopBooks: builder.query({
      query: () => "/books",
      providesTags: ["status"],
    }),
    getList: builder.query({
      query: () => "/books/list",
    }),
    getBooks: builder.query({
      query: (options) => ({
        url: "/books",
        params: {
          page: options?.currentPage,
          limit: 4,
          publicationYear: options?.publicationYear,
          searchTerm: options?.searchTerm,
          genre: options?.genre,
        },
      }),
      providesTags: ["books"],
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["books"],
    }),
    postBook: builder.mutation({
      query: ({ data }) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: ({ id }) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/reviews/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    postRead: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/read-list/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
    postWish: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/wish-list/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/read-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["status"],
    }),
    postStatus: builder.mutation({
      query: ({ data }) => ({
        url: "/books/read-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
    getSingleReview: builder.query({
      query: (id) => `/books/reviews/${id}`,
      providesTags: ["reviews"],
    }),
  }),
});
export const {
  useUpdateBookMutation,
  useGetTopBooksQuery,
  useGetSingleReviewQuery,
  usePostReviewMutation,
  useSingleBookQuery,
  useGetBooksQuery,
  usePostBookMutation,
  usePostReadMutation,
  usePostStatusMutation,
  useUpdateStatusMutation,
  usePostWishMutation,
  useDeleteBookMutation,
  useGetListQuery,
} = bookApi;
