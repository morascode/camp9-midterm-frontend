import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { MovieDbResponse } from '../utilities/types';
import axios from 'axios';

async function getBookmarkedMovies() {
  const response = await axios.get<MovieDbResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/user/bookmarks/`,
    { withCredentials: true }
  );
  return response.data;
}
async function patchBookmark(movieId: number, createBookmark: boolean) {
  const response = await axios.patch(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/user/bookmarks/${movieId}/`,
    { createBookmark: createBookmark },
    { withCredentials: true }
  );
  return response;
}
export function useGetBookmarks() {
  const query = useQuery({
    queryKey: ['movies', 'bookmarked'],
    queryFn: getBookmarkedMovies,
  });
  return query;
}
export function usePatchBookmark(movieId: number) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (isBookmarked: boolean) =>
      patchBookmark(movieId, !isBookmarked),
    onSuccess: () => {
      queryClient.invalidateQueries(['movies', 'bookmarked']);
      queryClient.invalidateQueries(['movieDetails', movieId]);
    },
  });
  return mutation;
}
